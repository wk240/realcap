self.__MIDDLEWARE_MATCHERS = [
  {
    "regexp": "^\\/realcap(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/(\\/?index|\\/?index\\\\.json))?[\\/#\\?]?$",
    "originalSource": "/"
  },
  {
    "regexp": "^\\/realcap(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/(zh))(?:\\/((?:[^\\/#\\?]+?)(?:\\/(?:[^\\/#\\?]+?))*))?(\\\\.json)?[\\/#\\?]?$",
    "originalSource": "/(zh)/:path*"
  },
  {
    "regexp": "^\\/realcap(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/((?!api|_next|_vercel|.*\\..*).*))(\\\\.json)?[\\/#\\?]?$",
    "originalSource": "/((?!api|_next|_vercel|.*\\..*).*)"
  }
];self.__MIDDLEWARE_MATCHERS_CB && self.__MIDDLEWARE_MATCHERS_CB()