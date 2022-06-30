import React from "react";
import { 
  defaultTodoData,
  TodoDataInterface 
} from "../interfaces/TodoDataInterface";
import {
  defaultPaginationData,
  PaginationDataInterface
} from "../interfaces/PaginationDataInterface";
import {
  defaultShipmentOverview,
  ShipmentsOverviewInterface
} from "../interfaces/ShipmentsOverviewInterface";
import { defaultShipmentQuery } from "../interfaces/ShipmentQueryInterface";
import { useApiError } from "./ApiErrorProvider";
import { error } from "../constants/bindings";
import SignRequest from "../helpers/SignRequest";
import axios from "axios";

const TodosContext = React.createContext({
  loadingTodos: true,
  todosData: [defaultTodoData],
  paginationData: defaultPaginationData,
  getTodosData: (email) => {}
});

export const TodosProvider = props => {
  const [todosData, setTodosData] = React.useState<TodoDataInterface[]>([]);
  const [loadingTodos, setLoadingTodos] = React.useState(true);
  const { setErrorCode } = useApiError();

  const [paginationData, setPaginationData] = React.useState(defaultPaginationData);
  
  const getTodosData = async (email: string) => {
    let response = {};
    setTodosData([]);
    setLoadingTodos(true);

    const headers = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    await axios.post(process.env.REACT_APP_HOST + "/graphql", 
    {
      query:
        `
         {
          fetchStudentTodosByEmail(email:"` +
          email +
          `") {
            assignments {
              todo {
                todoAiid
                description
              }
            }
          }
         }
        `
    }, headers
    )
    .then(res => {
      if (res.data.errors) {
        setLoadingTodos(false);
        console.debug("FAIL: ", res.data.errors);
        response = {
          error: res.data.errors,
          status: "FAIL"
        };
        setErrorCode(error.TIME_OUT);
      } else {
        setLoadingTodos(false);
        console.log("TodosProvider: ", res.data.data.fetchStudentTodosByEmail);
        setTodosData(res.data.data.fetchStudentTodosByEmail.assignments)
        response = {
          data: res.data.data,
          status: "SUCCESS"
        };
        setPaginationData(defaultPaginationData);
      }
    })
    .catch ((err: any) => {
      setLoadingTodos(false);
      console.debug("ERROR: occured while fetching Todos: ", err);
      response = {
        error: err,
        status: "FAIL"
      };
      setLoadingTodos(false);
      return response;
    })
  };

  return (
    <TodosContext.Provider
      value={{
        loadingTodos,
        todosData,
        paginationData,
        getTodosData
      }}
    >
      {props.children}
    </TodosContext.Provider>
  );
};

export const useTodos = () => {
  const context = React.useContext(TodosContext);
  return context;
};
