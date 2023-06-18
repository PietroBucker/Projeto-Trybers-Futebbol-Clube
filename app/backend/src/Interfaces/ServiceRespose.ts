//     INVALID_DATA: 400,
//     UNAUTHORIZED: 401,
//     NOT_FOUND: 404,
//     UNPROCESSABLE_CONTENT: 422,
//     SUCCESS: 200,
//     CREATED: 201,
//     DELETED: 204,
export type ServiceMessage = { message: string };

type ServiceResponseErrorType = 400 | 401 | 404 | 417;

export type ServiceResponseError = {
  status: ServiceResponseErrorType,
  data: ServiceMessage
};

export type ServiceResponseSuccess<T> = {
  status: 200 | 201,
  data: T
};

export type ServiceResponse<T> = ServiceResponseError | ServiceResponseSuccess<T>;
