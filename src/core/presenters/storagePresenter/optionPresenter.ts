import { debugMode } from '@/core/infrastructures/repositories/optionRepository.js'

export const isDebugMode = () => debugMode.getValue()
