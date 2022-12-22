import { User, userModel } from '../model/user.model';

function findUserById(userId: string) {
  return userModel.findById(userId);
}

function findUserByEmail(email: User['email']) {
  return userModel.findOne({ email });
}

export async function updateUserParams(userDetails: object, value: object) {
  return userModel.updateOne(userDetails, value, {
    new: true,
  });
}

export function getAllUsers() {
  return userModel.find().lean();
}

export const getUser = async (filter: object, option?: string) => {
  const user = await userModel.findOne(filter).select('-password').populate('roleId', option).lean<User>().exec();
  return user;
};

export default {
  findUserByEmail,
  findUserById,
  updateUserParams,
  getAllUsers,
  getUser,
};
