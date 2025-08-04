import { Module } from '@nestjs/common';
import { EnvConfigModule } from './env-config/env-config.module';
import { SupabaseModule } from './supabase/supabase.module';
import { FirebaseModule } from './firebase/firebase.module';

@Module({
  imports: [
    EnvConfigModule.forRoot(),
    FirebaseModule,
    SupabaseModule.forRoot(),
  ],
  exports: [FirebaseModule, SupabaseModule],
})
export class SharedModule {}
