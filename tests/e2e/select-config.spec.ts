import { selectConfig } from '../../lib';
import { AppModule } from '../src/app.module';
import { Config, DatabaseConfig, TableConfig } from '../src/config.model';

describe('Local toml', () => {
  it(`should be able to select config`, async () => {
    const module = AppModule.withRawModule();

    const config = selectConfig(module, Config);
    expect(config.isAuthEnabled).toBe(true);

    const databaseConfig = selectConfig(module, DatabaseConfig);
    expect(databaseConfig.port).toBe(3000);

    const tableConfig = selectConfig(module, TableConfig);
    expect(tableConfig.name).toBe('test');
  });

  it(`can only select existing config`, async () => {
    const module = AppModule.withRawModule();

    try {
      selectConfig(module, class {});
    } catch (err) {
      expect(err.message).toMatch(
        /You can only select config which exists in providers/,
      );
    }

    try {
      selectConfig({ module: class {} }, class {});
    } catch (err) {
      expect(err.message).toMatch(
        /You can only select config which exists in providers/,
      );
    }
  });
});
