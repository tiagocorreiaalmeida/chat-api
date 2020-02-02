import { MutationResolvers } from '#Base/generated/typed-schema';
import { AuthProvider } from '../providers/auth';

export const Mutation: MutationResolvers = {
  login: (root, { data }, { injector }) => injector.get(AuthProvider).login(data),
  register: (root, { data }, { injector }) => injector.get(AuthProvider).register(data),
  confirm: (root, { data }, { injector }) => injector.get(AuthProvider).confirm(data),
};
