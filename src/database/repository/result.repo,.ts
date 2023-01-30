import { Result, ResultModel } from '../model/result.model';

const createResult = (new_result: Result) => {
  return ResultModel.create(new_result);
};

const findResult = (filter: object) => {
  return ResultModel.find(filter).lean<Result>().exec();
};

export { createResult, findResult };
