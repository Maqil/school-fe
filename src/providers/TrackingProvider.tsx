import React from "react";
//import { useAuth } from './Auth';
import { useApiError } from "./ApiErrorProvider";
import { error } from "../constants/bindings";
import SignRequest from "../helpers/SignRequest";

const TrackingContext = React.createContext({
  loading: false,
  getTrackingData: trackingId => {},
  resetTrackingData: () => {},
  trackingData: new Map()
});

export const TrackingProvider = props => {
  const [trackingData, setTrackingData] = React.useState(new Map()) as any;
  const [loading, setLoading] = React.useState(false);
  const { setErrorCode } = useApiError();

  const getTrackingData = async trackingId => {
    if (!trackingId) {
      return;
    }
    setLoading(true);
    try {
      const body = {
        AirWaybillReference: trackingId
      };

      const data = await SignRequest(
        "POST",
        process.env.REACT_APP_API_BASE,
        process.env.REACT_APP_AKAMAI_DBAAS_API_URL,
        "/track/api/operations/status",
        body
      )
        .then(signedRequest => {
          return fetch(signedRequest.api, {
            method: "POST",
            headers: signedRequest.headers,
            body: signedRequest.data
          });
        })
        .then(response => response.json())
        .then(response => {
          return response;
        });

      if (data?.Content.length === 0){
        setLoading(false);
        const error = {
          status: "ERROR",
        };
        setTrackingData(trackingData.set(trackingId, error));
        return error;
      }
      setTrackingData(trackingData.set(trackingId, data));
      setLoading(false);
      return data;
    } catch (e: any) {
      if (e.response?.status) {
        setErrorCode(e.response?.status);
      } else {
        setErrorCode(error.DEFAULT);
      }
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const resetTrackingData = () => {
    setTrackingData(new Map());
  };

  return (
    <TrackingContext.Provider
      value={{ loading, getTrackingData, trackingData, resetTrackingData }}
    >
      {props.children}
    </TrackingContext.Provider>
  );
};

export const useTracking = () => {
  const context = React.useContext(TrackingContext);
  return context;
};
