import type { IncomingMessage, ServerResponse } from 'http';
import httpProxy from 'http-proxy';
import type { NextApiRequest, NextApiResponse } from 'next';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { Api_Error } from '~types/common';

const proxy = httpProxy.createProxyServer();

// You can export a config variable from any API route in Next.js.
// We'll use this to disable the bodyParser, otherwise Next.js
// would read and parse the entire request body before we
// can forward the request to the API. By skipping the bodyParser,
// we can just stream all requests through to the actual API.
export const config = {
  api: {
    bodyParser: false,
  },
};

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.on('error', (err) => {
    console.log('handle api response error', err.message);
    return err;
  });
  /* Return a Promise to let Next.js know when we're done
   ** processing the request:
   */
  return new Promise<void>((resolve, reject) => {
    // we'll need these to intercept the API response
    const publicRoutes = ['/api/auth/login', '/api/auth/register'];
    const isPublicRoute = publicRoutes.includes(req.url || '');
    const isLogout = req.url === '/api/auth/logout';

    // Get the `auth-token` cookie
    const authToken = parseCookies({ req })['auth-token'];

    // Rewrite the URL: strip out the leading '/api'.
    // For example, '/api/login' would become '/login'.
    // ️You might want to adjust this depending
    // on the base path of your API.
    // req.url = req.url?.replace(/^\/api/, '');

    // Don't forward cookies to the API:
    req.headers.cookie = '';

    if (authToken) {
      req.headers['Authorization'] = `Bearer ${authToken}`;
    }

    // In case the request is for login, we need to
    // intercept the API's response. It contains the
    // auth token that we want to strip out and set
    // as an HTTP-only cookie.
    proxy
      .on(
        'proxyRes',
        (
          proxyRes: IncomingMessage,
          request: IncomingMessage,
          response: ServerResponse
        ) => {
          // in case of logout, clear the cookies and return
          if (isLogout) {
            destroyCookie({ res }, 'auth-token', {
              path: '/',
            });
            response.statusCode = 200;
            response.write(
              JSON.stringify({
                message: 'Logged out successfully',
                status: 'OK',
              })
            );
            resolve();
            res.end();
            return;
          } else if (isPublicRoute) {
            // Read the API's response body from
            // the stream:
            let apiResponseBody = '';
            proxyRes.on('data', (chunk) => {
              apiResponseBody = chunk.toString('utf8');
            });

            // Once we've read the entire API
            // response body, we're ready to
            // handle it:
            proxyRes.on('end', () => {
              if (proxyRes.statusCode !== 200) {
                const parsedAPI: Api_Error = JSON.parse(apiResponseBody);
                res.status(Number(parsedAPI.statusCode) || 500);
                res.json({
                  statusCode: Number(parsedAPI.statusCode) || 500, // set to 500 code if status is NaN
                  error: parsedAPI.error,
                  message: parsedAPI.message,
                });
                reject();
                res.end();
                return;
              }

              try {
                // Extract the authToken from API's response:
                const { accessToken } = JSON.parse(apiResponseBody);

                res.statusCode = 200;
                if (accessToken) {
                  // Set the authToken as an HTTP-only cookie.
                  // We'll also set the SameSite attribute to
                  // 'lax' for some additional CSRF protection.
                  setCookie({ res }, 'auth-token', accessToken, {
                    maxAge: 60 * 60,
                    path: '/',
                    sameSite: true,
                    secure: true,
                  });
                  // Our response to the client won't contain
                  // the actual authToken. This way the auth token
                  // never gets exposed to the client.
                  res.json({ accessToken });
                }
                res.end();
                resolve();
                return;
              } catch (err) {
                reject(err);
                return;
              }
            });
          } else {
            console.log('else');
            resolve();
            res.end();
            return;
          }
        }
      )
      .on('error', (err) => {
        console.log('proxy once error', err);
        reject(err);
      })
      .web(req, res, {
        target: process.env.API_URL,
        autoRewrite: false,
        selfHandleResponse: isPublicRoute,
      });
  });
};
