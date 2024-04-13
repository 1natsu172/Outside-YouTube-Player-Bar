import * as usecases from '@/core/usecases/options.usecase.js'

export const switchDebugMode = async (changeTo: boolean) => {
  await usecases.changeDebugMode(changeTo)
}
