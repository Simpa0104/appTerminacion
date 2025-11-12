// src/types/expo-file-system.d.ts
declare module 'expo-file-system' {
    export const cacheDirectory: string | null;
    export const documentDirectory: string | null;
    
    export enum EncodingType {
      UTF8 = 'utf8',
      Base64 = 'base64',
    }
  
    export interface WriteAsStringAsyncOptions {
      encoding?: EncodingType | 'utf8' | 'base64';
    }
  
    export function writeAsStringAsync(
      fileUri: string,
      contents: string,
      options?: WriteAsStringAsyncOptions
    ): Promise<void>;
  
    export function deleteAsync(
      fileUri: string,
      options?: { idempotent?: boolean }
    ): Promise<void>;
  
    export function getInfoAsync(
      fileUri: string,
      options?: { md5?: boolean; size?: boolean }
    ): Promise<any>;
  }