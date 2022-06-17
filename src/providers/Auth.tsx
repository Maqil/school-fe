import React, { useEffect, useState, createContext, useContext } from "react";
import { Auth } from "aws-amplify";
import { CognitoUserInterface } from "@aws-amplify/ui-components";
import jwt_decode from "jwt-decode";
import { getI18n } from "react-i18next";
import axios from "axios";
import { SchoolUserInterface } from "../interfaces/LoginInterface";

const AuthContext = createContext({
  user: {} as SchoolUserInterface | null,
  loading: true as boolean | null,

  signIn: (username, password) => {},
  signOut: () => {},
  // getUserSession: () => {},
  // changePassword: (user, oldPassword, newPassword) => {},
  // completeNewPassword: (user, newPassword) => {},
  // forgotPassword: username => {},
  // confirmSignIn: (user, mfaCode) => {},
  // verifyTOTP: (user, totpCode) => {},
  // updateUserAttributes: (user, attributes) => {},
  clearUserData: () => {},
  // forgotPasswordSubmit: (username, code, newPassword) => {},
  // userAttributeVerification: attribute => {},
  // userAttributeVerificationSubmit: (attribute, code) => {},
  refreshSession: () => {},
  checkSessionExpired: () => {},
  // getSubId: () => {}
});

export const AuthProvider = props => {
  const [user, setUser] = useState<SchoolUserInterface | null>(null);
  const [loading, setLoading] = useState(true);

  /**
      Sign in and authenticate user.
      First time users must enter a new password.
      User's info is stored to avoid recalling the API
      @return - Authenticated User's information - For TOTP returns code
  */
  const signIn = async (username: string, password: string) => {
    let response = {};
    setLoading(true);
    const headers = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    await axios.post(process.env.REACT_APP_HOST + "/graphql", 
      {
        query:
          `
          mutation {
            signin(email:"` +
            username +
            `", password:"` +
            password +
            `")
           }
          `
      }, headers
      ) 
      .then(res => {
        if (res.data.errors) {
          console.debug("FAIL: ", res.data.errors);
          response = {
            error: res.data.errors,
            status: "FAIL"
          };
        } else {
          localStorage.setItem("user_token", res.data.data.signin);
          localStorage.setItem("user_user", res.data.data);
          const decodeUser: SchoolUserInterface = jwt_decode(res.data.data.signin);
          console.debug("decodeUser: ", decodeUser);
          setUser(decodeUser);
          response = {
            data: decodeUser,
            status: "SUCCESS"
          };
        }
      })
      .catch(err => {
        console.debug("ERROR: occured while signin user: ", err);
        response = {
          error: err,
          status: "FAIL"
        };
      });
    setLoading(false);
    return response;
  };

  useEffect(() => {
    /**
        Get the current user's information.
        Should be used after the user is logged in. Returns an error if not signed in
        @return response - the result of the API call. returns data: the authenticated user object
    */
    const getCurrentUser = async () => {
      setLoading(true);
      if (user) {
        // currentUser already exisiting
        setUser(user);
        setLoading(false);
      } else {
        try {
          setUser(JSON.parse(sessionStorage.getItem("user_user") || "{}"));
          // currentUser checking aws
        } catch (error: any) {
          console.debug("ERROR: getCurrentUser ", error);
        }
        setLoading(false);
      }
    };

    getCurrentUser();

  }, [user]);

  /*    COGNITO USER FUNCTIONS    */

  /**
        Get user's current session. Refreshes accessToken and idToken if expired and a valid
        refresh token is presented
        @return response - the result of the API call.
        returns a CognitoUserSession object which contains JWT, idToken, and refreshToken
    */
  // const getUserSession = async () => {
  //   let response = {};
  //   Auth.currentSession()
  //     .then(data => {
  //       response = {
  //         data: data,
  //         status: "SUCCESS"
  //       };
  //     })
  //     .catch(error => {
  //       console.debug("ERROR: occured while getting user session ", error);
  //       response = {
  //         error: error,
  //         status: "FAIL"
  //       };
  //     });
  //   return response;
  // };

  /**
        Update the user's attributes
        @param attributes - object of user's attributes to be updated
        @return response - the result from updating the attributes
    */
  // const updateUserAttributes = async (user, attributes: object) => {
  //   let response = {};
  //   await Auth.updateUserAttributes(user, attributes)
  //     .then(result => {
  //       response = {
  //         data: result,
  //         status: "SUCCESS"
  //       };
  //     })
  //     .catch(error => {
  //       console.debug("ERROR: occured updating the user's attributes ", error);
  //       response = {
  //         error: error,
  //         status: "FAIL"
  //       };
  //     });
  //   return response;
  // };

  /**
   * Clear all the current user's cognito data
   */
  const clearUserData = () => {
    setUser(null);
  };

  /*  **********  COGNITO SIGN IN/OUT  **********  */

  /**
   * Complete login for user after submitting MFA code
   * @param user
   * @param mfaCode
   * @returns response - successful verification returns user object
   */
  // const confirmSignIn = async (user: any, mfaCode: string) => {
  //   let response;
  //   let loggedUser;
  //   setLoading(true);
  //   try {
  //     if (user.challengeName === "CUSTOM_CHALLENGE") {
  //       loggedUser = await Auth.sendCustomChallengeAnswer(
  //         user, // Return object from Auth.signIn()
  //         mfaCode // Confirmation code
  //       );
  //       // the answer was sent successfully, but it doesnt mean it is the right one
  //       // so we should test if the user is authenticated now
  //       // this will throw an error if the user is not yet authenticated:
  //       await Auth.currentSession();
  //     } else {
  //       loggedUser = await Auth.confirmSignIn(
  //         user, // Return object from Auth.signIn()
  //         mfaCode // Confirmation code
  //       );
  //     }

  //     setUser(loggedUser);
  //     response = {
  //       data: loggedUser,
  //       status: "SUCCESS"
  //     };
  //   } catch (error: any) {
  //     response = {
  //       error: error,
  //       status: "FAIL"
  //     };
  //   }
  //   setLoading(false);
  //   return response;
  // };


  /**
   * Verify One-time password from cognito
   * @param user
   * @param totpCode
   * @return response - successful verification returns user object
   */
  // const verifyTOTP = async (user, totpCode: string) => {
  //   let response;
  //   Auth.verifyTotpToken(user, totpCode)
  //     .then(user => {
  //       // don't forget to set TOTP as the preferred MFA method
  //       Auth.setPreferredMFA(user, "TOTP");
  //       // ...
  //       response = {
  //         data: user,
  //         status: "SUCCESS"
  //       };
  //     })
  //     .catch(error => {
  //       console.debug("ERROR: occured during verification", error);
  //       response = {
  //         error: error,
  //         status: "FAIL"
  //       };
  //     });
  //   return response;
  // };

  /**
   * Sign user out of cognito
   * @return response - a successful sign-out returns a "SUCCESS" status
   */
  const signOut = async () => {
    let response;
    setLoading(true);
    try {
      // let data = await Auth.signOut();
      // User successfully signed out
      clearUserData();
      response = {
        data: "signout",
        status: "SUCCESS"
      };
      setLoading(false);
    } catch (error: any) {
      console.debug("ERROR: occured during sign out", error);
      response = {
        error: error,
        status: "FAIL"
      };
    }
    return response;
  };

  /*  **********  COGNITO PASSWORD FUNCTIONS  **********  */

  /**
   * Change user's password
   * @param user
   * @param oldPassword
   * @param newPassword
   * @return response - A successful request returns a promise
   */
  // const changePassword = async (
  //   user: any,
  //   oldPassword: string,
  //   newPassword: string
  // ) => {
  //   let response;
  //   try {
  //     let data = await Auth.changePassword(user, oldPassword, newPassword);
  //     response = {
  //       data: data,
  //       status: "SUCCESS"
  //     };
  //   } catch (error: any) {
  //     response = {
  //       error: error,
  //       status: "FAIL"
  //     };
  //   }
  //   return response;
  // };

  /**
   * Change a new user's password
   * @param user
   * @param newPassword
   * @return response - A successful request returns a promise
   */
  // const completeNewPassword = async (user: any, newPassword: string) => {
  //   let response;
  //   setLoading(true);
  //   try {
  //     let data = await Auth.completeNewPassword(
  //       user, // the Cognito User Object
  //       newPassword // the new password
  //     );

  //     if (data.authenticationFlowType === "CUSTOM_AUTH") {
  //       // custom auth complete password
  //       setUser(data);
  //     }

  //     response = {
  //       data: data,
  //       status: "SUCCESS"
  //     };
  //   } catch (error: any) {
  //     response = {
  //       error: error,
  //       status: "FAIL"
  //     };
  //   }
  //   setLoading(false);
  //   return response;
  // };

  /**
   * Send user a link to reset the password
   * @param username
   * @return response - A successful request returns a promise
   */
  // const forgotPassword = async (username: string) => {
  //   let response;
  //   setLoading(true);
  //   try {
  //     let data = await Auth.forgotPassword(username, {
  //       language: getI18n().resolvedLanguage
  //     });
  //     response = {
  //       data: data,
  //       status: "SUCCESS"
  //     };
  //   } catch (error: any) {
  //     console.debug("ERROR: unexpected error occured ", error);
  //     response = {
  //       error: error,
  //       status: "FAIL"
  //     };
  //   }
  //   setLoading(false);
  //   return response;
  // };

  /**
   * Sumbit the verification code along with the user's new password
   * @param username
   * @param code - MFA code from cognito
   * @param new_password
   * @return response - A promise on success
   */
  // const forgotPasswordSubmit = async (
  //   username: string,
  //   code: string,
  //   newPassword: string
  // ) => {
  //   let response;
  //   setLoading(true);
  //   try {
  //     let data = await Auth.forgotPasswordSubmit(username, code, newPassword);
  //     response = {
  //       data: data,
  //       status: "SUCCESS"
  //     };
  //   } catch (error: any) {
  //     console.debug("ERROR: occured submiting the verification code ", error);
  //     response = {
  //       error: error,
  //       status: "FAIL"
  //     };
  //   }
  //   setLoading(false);
  //   return response;
  // };

  /**
   * Send verification code to user's preffered method of communication
   * @param attribute - user attribute to verify (email/sms)
   * @return response - a promise data object on success
   */
  // const userAttributeVerification = async (attribute: string) => {
  //   let response = {};
  //   Auth.verifyCurrentUserAttribute(attribute)
  //     .then(data => {
  //       // verification code was sent to 'attribute'
  //       response = {
  //         data: data,
  //         status: "SUCCESS"
  //       };
  //     })
  //     .catch(error => {
  //       console.debug("ERROR: occured verifying: " + attribute + " : " + error);
  //       response = {
  //         error: error,
  //         status: "FAIL"
  //       };
  //     });
  //   return response;
  // };

  /**
   * Submit verification code for attribute
   * @param attribute
   * @param code
   * @returns response - a promise data object on success
   */
  // const userAttributeVerificationSubmit = async (
  //   attribute: string,
  //   code: string
  // ) => {
  //   let response;
  //   Auth.verifyCurrentUserAttributeSubmit(attribute, code)
  //     .then(data => {
  //       // 'attribute' verified
  //       response = {
  //         data: data,
  //         status: "SUCCESS"
  //       };
  //     })
  //     .catch(error => {
  //       response = {
  //         error: error,
  //         status: "FAIL"
  //       };
  //     });
  //   return response;
  // };

  /**
   * Submit verification code for attribute
   * @returns response - a promise data object on success
   */
  const refreshSession = async () => {
    try {
      // const cognitoUser = await Auth.currentAuthenticatedUser();
      // const { refreshToken } = cognitoUser.getSignInUserSession();
      // cognitoUser.refreshSession(refreshToken, (err, session) => {
      //   if (session) {
          // const { accessToken } = session;
          // let jwt = accessToken.getJwtToken();
          // let jwtObject = jwt_decode(jwt) as any;
          // let expireTime = jwtObject.exp as number;
          sessionStorage.removeItem("alertMessage");
          sessionStorage.setItem("expiry", String("expiry"));
          // NEW EXPIRY TIME
      //   }
      // });
    } catch (e) {
      console.debug("ERROR: unable to refresh Token", e);
    }
  };

  const checkSessionExpired = async () => {
    let response = {};
    try {
      let currentTime = Math.floor(Date.now() / 1000);
      let expiryTime = Number(sessionStorage.getItem("expiry")) || null;
      if (expiryTime && currentTime > expiryTime) {
        // logout expired session
        sessionStorage.removeItem("expiry");

        response = {
          showAlert: true,
          severity: "error",
          message: "all.alert.session-expired"
        };
        sessionStorage.setItem("alertMessage", JSON.stringify(response));
        await signOut();
      } else {
        await refreshSession();
      }
    } catch (e) {
      console.debug("ERROR: checkSessionExpired failed ", e);
    }
    return response;
  };

  /**
   * Submit verification code for attribute
   * @returns response - a promise data object on success
   */
  // const getSubId = async () => {
  //   try {
  //     const cognitoUser = await Auth.currentAuthenticatedUser();
  //     const { idToken } = cognitoUser.getSignInUserSession();
  //     return idToken.payload.sub;
  //   } catch (e) {
  //     console.debug("ERROR: unable to refresh Token", e);
  //   }
  // };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signOut,
        // getUserSession,
        // changePassword,
        // completeNewPassword,
        // forgotPassword,
        // confirmSignIn,
        // verifyTOTP,
        // updateUserAttributes,
        clearUserData,
        // forgotPasswordSubmit,
        // userAttributeVerification,
        // userAttributeVerificationSubmit,
        refreshSession,
        checkSessionExpired,
        // getSubId
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
