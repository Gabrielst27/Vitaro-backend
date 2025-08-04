export interface IEnvConfigService {
  getPort(): number;
  getEnv(): string;
  getFirebaseCredentialPath(): string;
  getFirebaseApiKey(): string;
  getJwTSecret(): string;
  getJwtExpiresInSecond(): number;
  getSupabaseUrl(): string;
  getSupabaseApiKey(): string;
}
