import SecureLS from 'secure-ls';
import Router from '../router';

const valisSession = (redirect?: boolean) => {
  const path = Router.currentRoute.value.path;
  const ls = new SecureLS({ encodingType: "aes" });
  const session = ls.get("session");
  if (session) {
    if (path !== "profile") {
      Router.push({ name: "profile" });
    }
  } else {
    if (path !== "sign-in" && redirect) {
      Router.push({ name: "sign-in" });
    }
  }
}

export {
  valisSession,
};