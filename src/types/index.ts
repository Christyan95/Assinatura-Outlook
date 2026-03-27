/**
 * Centralized Type Definitions
 * Ensures consistency and type safety across the application
 */

/**
 * Signature form data structure
 */
export interface SignatureFormData {
  saudacao: string;
  nome: string;
  cargo: string;
  unidade: string;
  celular: string;
}

/**
 * Copy operation result
 */
export interface CopyResult {
  success: boolean;
  message: string;
  timestamp: number;
}

/**
 * Toast notification state
 */
export interface ToastState {
  visible: boolean;
  message: string;
  type: 'success' | 'error' | 'info';
}

/**
 * Error context for components
 */
export interface ErrorContext {
  code: string;
  message: string;
  recoverable: boolean;
}

export default {};
