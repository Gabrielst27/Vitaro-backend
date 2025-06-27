import { Injectable, OnModuleInit } from '@nestjs/common';
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { EnvConfigService } from '../../env-config/env-config.service';

@Injectable()
export class FirebaseService implements OnModuleInit {
  constructor(private configService: EnvConfigService) {}
  async onModuleInit() {
    const credentialsPath = this.configService.getFirebaseCredentialPath();
    if (getApps().length === 0) {
      await initializeApp({
        credential: cert(credentialsPath),
      });
    }
  }

  async getFirestoreDb(): Promise<FirebaseFirestore.Firestore> {
    return await getFirestore(getApps()[0]);
  }
}
