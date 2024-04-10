import { debugMode } from '@/core/repositories/optionRepository.js'

export const isDebugMode = () => debugMode.getValue()
