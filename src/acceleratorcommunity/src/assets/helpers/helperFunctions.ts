export const modifyHtml = (convertedContent: string) => {
  let modified = '';
  let flag = false;
  let hashtag = '';
  for (var i = 0; i < convertedContent.length; i++) {
    if (flag) {
      if (
        convertedContent.charAt(i) == ' ' ||
        convertedContent.substring(i, i + 6) == '&nbsp;' ||
        convertedContent.substring(i, i + 4) == '</p>'
      ) {
        modified =
          modified +
          `<a href='${hashtag}' class="wysiwyg-mention" data-mention data-value="${hashtag}">` +
          hashtag +
          '<a>';
        flag = false;
        hashtag = '';
      } else {
        hashtag = hashtag + convertedContent.charAt(i);
        continue;
      }
    }
    if (convertedContent.charAt(i) != '#') modified = modified + convertedContent.charAt(i);
    else {
      hashtag = '#';
      flag = true;
    }
  }
  return modified;
};


export const getValueFromCookie = (key: string) => {
  if (typeof document !== 'undefined') {
    const cookieString = document.cookie;
    const cookies = cookieString.split(';').reduce((acc: any, cookie: string) => {
      const [name, value] = cookie.split('=').map((c) => c.trim());
      acc[name] = value;
      return acc;
    }, {});

    return cookies[key] || null;
  }
  return null;
}
