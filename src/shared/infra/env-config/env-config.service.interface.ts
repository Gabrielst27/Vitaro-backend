export interface IEnvConfigService {
  getPort(): number;
  getEnv(): string;
  getFirebaseCredentialPath(): string;
}
