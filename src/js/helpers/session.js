import Cookies from "js-cookie";

export const session = {
  setSessionCookie,
  getSessionCookie,
  removeSessionCookie
}

function setSessionCookie (session) {
    removeSessionCookie();
    Cookies.set("session", session, { expires: 1 });  // store  session as json text.
  };
function getSessionCookie() {
    const sessionCookie = Cookies.get("session");  // in json form.
    if (!sessionCookie) {
      return null;
    } else {
      return JSON.parse(sessionCookie);
    }
};


function removeSessionCookie(){
    Cookies.remove('session');
}

