# 🧩 Project code (file ammessi in .)

_Generato: Mon, Oct 27, 2025 12:54:02 AM_

### ./angular.json
```
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "newProjectRoot": "projects",
  "projects": {
    "admin-pwa": {
      "projectType": "application",
      "schematics": {
        "@schematics/angular:component": { "style": "scss", "standalone": true }
      },
      "root": "",
      "sourceRoot": "src",
      "prefix": "app",
      "architect": {
        "build": {
          "builder": "@angular/build:application",
          "options": {
            "outputPath": "dist/admin-pwa",
            "index": "src/index.html",
            "browser": "src/main.ts",
            "polyfills": ["zone.js"],
            "tsConfig": "tsconfig.app.json",
            "inlineStyleLanguage": "scss",
            "assets": [
              { "glob": "**/*", "input": "public", "output": "/" }
            ],
            "styles": ["src/styles.scss"]
          },
          "configurations": {
            "production": {
              "budgets": [
                { "type": "initial", "maximumWarning": "1.5MB", "maximumError": "2MB" },
                { "type": "anyComponentStyle", "maximumWarning": "6kB", "maximumError": "10kB" }
              ],
              "outputHashing": "all",
              "optimization": true,
              "sourceMap": false,
              "extractLicenses": true,
              "fileReplacements": [
                {
                  "replace": "src/app/environments/environment.ts",
                  "with": "src/app/environments/environment.prod.ts"
                }
              ],
              "serviceWorker": "ngsw-config.json"
            },
            "development": {
              "optimization": false,
              "extractLicenses": false,
              "sourceMap": true
            }
          },
          "defaultConfiguration": "production"
        },
        "serve": {
          "builder": "@angular/build:dev-server",
          "options": { "proxyConfig": "proxy.conf.json", "open": true },
          "configurations": {
            "production": { "buildTarget": "admin-pwa:build:production" },
            "development": { "buildTarget": "admin-pwa:build:development" }
          },
          "defaultConfiguration": "development"
        },
        "extract-i18n": { "builder": "@angular/build:extract-i18n" },
        "test": {
          "builder": "@angular/build:karma",
          "options": {
            "polyfills": ["zone.js", "zone.js/testing"],
            "tsConfig": "tsconfig.spec.json",
            "inlineStyleLanguage": "scss",
            "assets": [
              { "glob": "**/*", "input": "public", "output": "/" }
            ],
            "styles": ["src/styles.scss"]
          }
        }
      }
    }
  }
}
```

### ./package-lock.json
```
{
  "name": "admin-pwa",
  "version": "0.0.0",
  "lockfileVersion": 3,
  "requires": true,
  "packages": {
    "": {
      "name": "admin-pwa",
      "version": "0.0.0",
      "dependencies": {
        "@angular/common": "^20.3.0",
        "@angular/compiler": "^20.3.0",
        "@angular/core": "^20.3.0",
        "@angular/forms": "^20.3.0",
        "@angular/platform-browser": "^20.3.0",
        "@angular/router": "^20.3.0",
        "@angular/service-worker": "20.3.4",
        "@ionic/angular": "8.7.7",
        "ionicons": "8.0.13",
        "rxjs": "~7.8.0",
        "tslib": "2.8.1",
        "zone.js": "0.14.10"
      },
      "devDependencies": {
        "@angular-devkit/build-angular": "20.3.5",
        "@angular/build": "^20.3.5",
        "@angular/cli": "20.3.5",
        "@angular/compiler-cli": "^20.3.0",
        "@types/jasmine": "~5.1.0",
        "connect-history-api-fallback": "2.0.0",
        "express": "4.21.2",
        "http-proxy-middleware": "3.0.5",
        "jasmine-core": "~5.9.0",
        "karma": "~6.4.0",
        "karma-chrome-launcher": "~3.2.0",
        "karma-coverage": "~2.2.0",
        "karma-jasmine": "~5.1.0",
        "karma-jasmine-html-reporter": "~2.1.0",
        "typescript": "^5.8.2"
      }
    },
    "node_modules/@algolia/abtesting": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@algolia/abtesting/-/abtesting-1.1.0.tgz",
      "integrity": "sha512-sEyWjw28a/9iluA37KLGu8vjxEIlb60uxznfTUmXImy7H5NvbpSO6yYgmgH5KiD7j+zTUUihiST0jEP12IoXow==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@algolia/client-common": "5.35.0",
        "@algolia/requester-browser-xhr": "5.35.0",
        "@algolia/requester-fetch": "5.35.0",
        "@algolia/requester-node-http": "5.35.0"
      },
      "engines": {
        "node": ">= 14.0.0"
      }
    },
    "node_modules/@algolia/client-abtesting": {
      "version": "5.35.0",
      "resolved": "https://registry.npmjs.org/@algolia/client-abtesting/-/client-abtesting-5.35.0.tgz",
      "integrity": "sha512-uUdHxbfHdoppDVflCHMxRlj49/IllPwwQ2cQ8DLC4LXr3kY96AHBpW0dMyi6ygkn2MtFCc6BxXCzr668ZRhLBQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@algolia/client-common": "5.35.0",
        "@algolia/requester-browser-xhr": "5.35.0",
        "@algolia/requester-fetch": "5.35.0",
        "@algolia/requester-node-http": "5.35.0"
      },
      "engines": {
        "node": ">= 14.0.0"
      }
    },
    "node_modules/@algolia/client-analytics": {
      "version": "5.35.0",
      "resolved": "https://registry.npmjs.org/@algolia/client-analytics/-/client-analytics-5.35.0.tgz",
      "integrity": "sha512-SunAgwa9CamLcRCPnPHx1V2uxdQwJGqb1crYrRWktWUdld0+B2KyakNEeVn5lln4VyeNtW17Ia7V7qBWyM/Skw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@algolia/client-common": "5.35.0",
        "@algolia/requester-browser-xhr": "5.35.0",
        "@algolia/requester-fetch": "5.35.0",
        "@algolia/requester-node-http": "5.35.0"
      },
      "engines": {
        "node": ">= 14.0.0"
      }
    },
    "node_modules/@algolia/client-common": {
      "version": "5.35.0",
      "resolved": "https://registry.npmjs.org/@algolia/client-common/-/client-common-5.35.0.tgz",
      "integrity": "sha512-ipE0IuvHu/bg7TjT2s+187kz/E3h5ssfTtjpg1LbWMgxlgiaZIgTTbyynM7NfpSJSKsgQvCQxWjGUO51WSCu7w==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 14.0.0"
      }
    },
    "node_modules/@algolia/client-insights": {
      "version": "5.35.0",
      "resolved": "https://registry.npmjs.org/@algolia/client-insights/-/client-insights-5.35.0.tgz",
      "integrity": "sha512-UNbCXcBpqtzUucxExwTSfAe8gknAJ485NfPN6o1ziHm6nnxx97piIbcBQ3edw823Tej2Wxu1C0xBY06KgeZ7gA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@algolia/client-common": "5.35.0",
        "@algolia/requester-browser-xhr": "5.35.0",
        "@algolia/requester-fetch": "5.35.0",
        "@algolia/requester-node-http": "5.35.0"
      },
      "engines": {
        "node": ">= 14.0.0"
      }
    },
    "node_modules/@algolia/client-personalization": {
      "version": "5.35.0",
      "resolved": "https://registry.npmjs.org/@algolia/client-personalization/-/client-personalization-5.35.0.tgz",
      "integrity": "sha512-/KWjttZ6UCStt4QnWoDAJ12cKlQ+fkpMtyPmBgSS2WThJQdSV/4UWcqCUqGH7YLbwlj3JjNirCu3Y7uRTClxvA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@algolia/client-common": "5.35.0",
        "@algolia/requester-browser-xhr": "5.35.0",
        "@algolia/requester-fetch": "5.35.0",
        "@algolia/requester-node-http": "5.35.0"
      },
      "engines": {
        "node": ">= 14.0.0"
      }
    },
    "node_modules/@algolia/client-query-suggestions": {
      "version": "5.35.0",
      "resolved": "https://registry.npmjs.org/@algolia/client-query-suggestions/-/client-query-suggestions-5.35.0.tgz",
      "integrity": "sha512-8oCuJCFf/71IYyvQQC+iu4kgViTODbXDk3m7yMctEncRSRV+u2RtDVlpGGfPlJQOrAY7OONwJlSHkmbbm2Kp/w==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@algolia/client-common": "5.35.0",
        "@algolia/requester-browser-xhr": "5.35.0",
        "@algolia/requester-fetch": "5.35.0",
        "@algolia/requester-node-http": "5.35.0"
      },
      "engines": {
        "node": ">= 14.0.0"
      }
    },
    "node_modules/@algolia/client-search": {
      "version": "5.35.0",
      "resolved": "https://registry.npmjs.org/@algolia/client-search/-/client-search-5.35.0.tgz",
      "integrity": "sha512-FfmdHTrXhIduWyyuko1YTcGLuicVbhUyRjO3HbXE4aP655yKZgdTIfMhZ/V5VY9bHuxv/fGEh3Od1Lvv2ODNTg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@algolia/client-common": "5.35.0",
        "@algolia/requester-browser-xhr": "5.35.0",
        "@algolia/requester-fetch": "5.35.0",
        "@algolia/requester-node-http": "5.35.0"
      },
      "engines": {
        "node": ">= 14.0.0"
      }
    },
    "node_modules/@algolia/ingestion": {
      "version": "1.35.0",
      "resolved": "https://registry.npmjs.org/@algolia/ingestion/-/ingestion-1.35.0.tgz",
      "integrity": "sha512-gPzACem9IL1Co8mM1LKMhzn1aSJmp+Vp434An4C0OBY4uEJRcqsLN3uLBlY+bYvFg8C8ImwM9YRiKczJXRk0XA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@algolia/client-common": "5.35.0",
        "@algolia/requester-browser-xhr": "5.35.0",
        "@algolia/requester-fetch": "5.35.0",
        "@algolia/requester-node-http": "5.35.0"
      },
      "engines": {
        "node": ">= 14.0.0"
      }
    },
    "node_modules/@algolia/monitoring": {
      "version": "1.35.0",
      "resolved": "https://registry.npmjs.org/@algolia/monitoring/-/monitoring-1.35.0.tgz",
      "integrity": "sha512-w9MGFLB6ashI8BGcQoVt7iLgDIJNCn4OIu0Q0giE3M2ItNrssvb8C0xuwJQyTy1OFZnemG0EB1OvXhIHOvQwWw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@algolia/client-common": "5.35.0",
        "@algolia/requester-browser-xhr": "5.35.0",
        "@algolia/requester-fetch": "5.35.0",
        "@algolia/requester-node-http": "5.35.0"
      },
      "engines": {
        "node": ">= 14.0.0"
      }
    },
    "node_modules/@algolia/recommend": {
      "version": "5.35.0",
      "resolved": "https://registry.npmjs.org/@algolia/recommend/-/recommend-5.35.0.tgz",
      "integrity": "sha512-AhrVgaaXAb8Ue0u2nuRWwugt0dL5UmRgS9LXe0Hhz493a8KFeZVUE56RGIV3hAa6tHzmAV7eIoqcWTQvxzlJeQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@algolia/client-common": "5.35.0",
        "@algolia/requester-browser-xhr": "5.35.0",
        "@algolia/requester-fetch": "5.35.0",
        "@algolia/requester-node-http": "5.35.0"
      },
      "engines": {
        "node": ">= 14.0.0"
      }
    },
    "node_modules/@algolia/requester-browser-xhr": {
      "version": "5.35.0",
      "resolved": "https://registry.npmjs.org/@algolia/requester-browser-xhr/-/requester-browser-xhr-5.35.0.tgz",
      "integrity": "sha512-diY415KLJZ6x1Kbwl9u96Jsz0OstE3asjXtJ9pmk1d+5gPuQ5jQyEsgC+WmEXzlec3iuVszm8AzNYYaqw6B+Zw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@algolia/client-common": "5.35.0"
      },
      "engines": {
        "node": ">= 14.0.0"
      }
    },
    "node_modules/@algolia/requester-fetch": {
      "version": "5.35.0",
      "resolved": "https://registry.npmjs.org/@algolia/requester-fetch/-/requester-fetch-5.35.0.tgz",
      "integrity": "sha512-uydqnSmpAjrgo8bqhE9N1wgcB98psTRRQXcjc4izwMB7yRl9C8uuAQ/5YqRj04U0mMQ+fdu2fcNF6m9+Z1BzDQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@algolia/client-common": "5.35.0"
      },
      "engines": {
        "node": ">= 14.0.0"
      }
    },
    "node_modules/@algolia/requester-node-http": {
      "version": "5.35.0",
      "resolved": "https://registry.npmjs.org/@algolia/requester-node-http/-/requester-node-http-5.35.0.tgz",
      "integrity": "sha512-RgLX78ojYOrThJHrIiPzT4HW3yfQa0D7K+MQ81rhxqaNyNBu4F1r+72LNHYH/Z+y9I1Mrjrd/c/Ue5zfDgAEjQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@algolia/client-common": "5.35.0"
      },
      "engines": {
        "node": ">= 14.0.0"
      }
    },
    "node_modules/@ampproject/remapping": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/@ampproject/remapping/-/remapping-2.3.0.tgz",
      "integrity": "sha512-30iZtAPgz+LTIYoeivqYo853f02jBYSd5uGnGpkFV0M3xOt9aN73erkgYAmZU43x4VfqcnLxW9Kpg3R5LC4YYw==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@jridgewell/gen-mapping": "^0.3.5",
        "@jridgewell/trace-mapping": "^0.3.24"
      },
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/@angular-devkit/architect": {
      "version": "0.2003.5",
      "resolved": "https://registry.npmjs.org/@angular-devkit/architect/-/architect-0.2003.5.tgz",
      "integrity": "sha512-KtA//ucTIdnKp1+vTYnqBallEbiZHLx3Gs7XgYm+p4VJfVjbMZHWY2vrbJoyCUp05goiv2XnDy0bKQ9VYHePWg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@angular-devkit/core": "20.3.5",
        "rxjs": "7.8.2"
      },
      "engines": {
        "node": "^20.19.0 || ^22.12.0 || >=24.0.0",
        "npm": "^6.11.0 || ^7.5.6 || >=8.0.0",
        "yarn": ">= 1.13.0"
      }
    },
    "node_modules/@angular-devkit/build-angular": {
      "version": "20.3.5",
      "resolved": "https://registry.npmjs.org/@angular-devkit/build-angular/-/build-angular-20.3.5.tgz",
      "integrity": "sha512-33bG6ic/GC9OrqPiR6ynTpnw9vKfebZtWQzFO9ovjkUoZt4lUFWUgo/F0zeoaJgj0N35Ihn3Dvtxz/x2rwr9lw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@ampproject/remapping": "2.3.0",
        "@angular-devkit/architect": "0.2003.5",
        "@angular-devkit/build-webpack": "0.2003.5",
        "@angular-devkit/core": "20.3.5",
        "@angular/build": "20.3.5",
        "@babel/core": "7.28.3",
        "@babel/generator": "7.28.3",
        "@babel/helper-annotate-as-pure": "7.27.3",
        "@babel/helper-split-export-declaration": "7.24.7",
        "@babel/plugin-transform-async-generator-functions": "7.28.0",
        "@babel/plugin-transform-async-to-generator": "7.27.1",
        "@babel/plugin-transform-runtime": "7.28.3",
        "@babel/preset-env": "7.28.3",
        "@babel/runtime": "7.28.3",
        "@discoveryjs/json-ext": "0.6.3",
        "@ngtools/webpack": "20.3.5",
        "ansi-colors": "4.1.3",
        "autoprefixer": "10.4.21",
        "babel-loader": "10.0.0",
        "browserslist": "^4.21.5",
        "copy-webpack-plugin": "13.0.1",
        "css-loader": "7.1.2",
        "esbuild-wasm": "0.25.9",
        "fast-glob": "3.3.3",
        "http-proxy-middleware": "3.0.5",
        "istanbul-lib-instrument": "6.0.3",
        "jsonc-parser": "3.3.1",
        "karma-source-map-support": "1.4.0",
        "less": "4.4.0",
        "less-loader": "12.3.0",
        "license-webpack-plugin": "4.0.2",
        "loader-utils": "3.3.1",
        "mini-css-extract-plugin": "2.9.4",
        "open": "10.2.0",
        "ora": "8.2.0",
        "picomatch": "4.0.3",
        "piscina": "5.1.3",
        "postcss": "8.5.6",
        "postcss-loader": "8.1.1",
        "resolve-url-loader": "5.0.0",
        "rxjs": "7.8.2",
        "sass": "1.90.0",
        "sass-loader": "16.0.5",
        "semver": "7.7.2",
        "source-map-loader": "5.0.0",
        "source-map-support": "0.5.21",
        "terser": "5.43.1",
        "tree-kill": "1.2.2",
        "tslib": "2.8.1",
        "webpack": "5.101.2",
        "webpack-dev-middleware": "7.4.2",
        "webpack-dev-server": "5.2.2",
        "webpack-merge": "6.0.1",
        "webpack-subresource-integrity": "5.1.0"
      },
      "engines": {
        "node": "^20.19.0 || ^22.12.0 || >=24.0.0",
        "npm": "^6.11.0 || ^7.5.6 || >=8.0.0",
        "yarn": ">= 1.13.0"
      },
      "optionalDependencies": {
        "esbuild": "0.25.9"
      },
      "peerDependencies": {
        "@angular/compiler-cli": "^20.0.0",
        "@angular/core": "^20.0.0",
        "@angular/localize": "^20.0.0",
        "@angular/platform-browser": "^20.0.0",
        "@angular/platform-server": "^20.0.0",
        "@angular/service-worker": "^20.0.0",
        "@angular/ssr": "^20.3.5",
        "@web/test-runner": "^0.20.0",
        "browser-sync": "^3.0.2",
        "jest": "^29.5.0",
        "jest-environment-jsdom": "^29.5.0",
        "karma": "^6.3.0",
        "ng-packagr": "^20.0.0",
        "protractor": "^7.0.0",
        "tailwindcss": "^2.0.0 || ^3.0.0 || ^4.0.0",
        "typescript": ">=5.8 <6.0"
      },
      "peerDependenciesMeta": {
        "@angular/core": {
          "optional": true
        },
        "@angular/localize": {
          "optional": true
        },
        "@angular/platform-browser": {
          "optional": true
        },
        "@angular/platform-server": {
          "optional": true
        },
        "@angular/service-worker": {
          "optional": true
        },
        "@angular/ssr": {
          "optional": true
        },
        "@web/test-runner": {
          "optional": true
        },
        "browser-sync": {
          "optional": true
        },
        "jest": {
          "optional": true
        },
        "jest-environment-jsdom": {
          "optional": true
        },
        "karma": {
          "optional": true
        },
        "ng-packagr": {
          "optional": true
        },
        "protractor": {
          "optional": true
        },
        "tailwindcss": {
          "optional": true
        }
      }
    },
    "node_modules/@angular-devkit/build-angular/node_modules/@angular/build": {
      "version": "20.3.5",
      "resolved": "https://registry.npmjs.org/@angular/build/-/build-20.3.5.tgz",
      "integrity": "sha512-Nwwwm8U7lolkdHt75PiPkW93689SBFUN9qEQeu02sPfq2Tqyn20PZGifXkV8A/6mlWbQUjfUnGpRTVk/WhW9Eg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@ampproject/remapping": "2.3.0",
        "@angular-devkit/architect": "0.2003.5",
        "@babel/core": "7.28.3",
        "@babel/helper-annotate-as-pure": "7.27.3",
        "@babel/helper-split-export-declaration": "7.24.7",
        "@inquirer/confirm": "5.1.14",
        "@vitejs/plugin-basic-ssl": "2.1.0",
        "beasties": "0.3.5",
        "browserslist": "^4.23.0",
        "esbuild": "0.25.9",
        "https-proxy-agent": "7.0.6",
        "istanbul-lib-instrument": "6.0.3",
        "jsonc-parser": "3.3.1",
        "listr2": "9.0.1",
        "magic-string": "0.30.17",
        "mrmime": "2.0.1",
        "parse5-html-rewriting-stream": "8.0.0",
        "picomatch": "4.0.3",
        "piscina": "5.1.3",
        "rollup": "4.52.3",
        "sass": "1.90.0",
        "semver": "7.7.2",
        "source-map-support": "0.5.21",
        "tinyglobby": "0.2.14",
        "vite": "7.1.5",
        "watchpack": "2.4.4"
      },
      "engines": {
        "node": "^20.19.0 || ^22.12.0 || >=24.0.0",
        "npm": "^6.11.0 || ^7.5.6 || >=8.0.0",
        "yarn": ">= 1.13.0"
      },
      "optionalDependencies": {
        "lmdb": "3.4.2"
      },
      "peerDependencies": {
        "@angular/compiler": "^20.0.0",
        "@angular/compiler-cli": "^20.0.0",
        "@angular/core": "^20.0.0",
        "@angular/localize": "^20.0.0",
        "@angular/platform-browser": "^20.0.0",
        "@angular/platform-server": "^20.0.0",
        "@angular/service-worker": "^20.0.0",
        "@angular/ssr": "^20.3.5",
        "karma": "^6.4.0",
        "less": "^4.2.0",
        "ng-packagr": "^20.0.0",
        "postcss": "^8.4.0",
        "tailwindcss": "^2.0.0 || ^3.0.0 || ^4.0.0",
        "tslib": "^2.3.0",
        "typescript": ">=5.8 <6.0",
        "vitest": "^3.1.1"
      },
      "peerDependenciesMeta": {
        "@angular/core": {
          "optional": true
        },
        "@angular/localize": {
          "optional": true
        },
        "@angular/platform-browser": {
          "optional": true
        },
        "@angular/platform-server": {
          "optional": true
        },
        "@angular/service-worker": {
          "optional": true
        },
        "@angular/ssr": {
          "optional": true
        },
        "karma": {
          "optional": true
        },
        "less": {
          "optional": true
        },
        "ng-packagr": {
          "optional": true
        },
        "postcss": {
          "optional": true
        },
        "tailwindcss": {
          "optional": true
        },
        "vitest": {
          "optional": true
        }
      }
    },
    "node_modules/@angular-devkit/build-webpack": {
      "version": "0.2003.5",
      "resolved": "https://registry.npmjs.org/@angular-devkit/build-webpack/-/build-webpack-0.2003.5.tgz",
      "integrity": "sha512-BdcaJ5c/a+SD8ZaUo1Qq0a03zeTvGX4ydIaM4li5JYuA8bPCibU9tnb/1FcOWgIZVL1RdV6oIIqbAW6ufq7e1g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@angular-devkit/architect": "0.2003.5",
        "rxjs": "7.8.2"
      },
      "engines": {
        "node": "^20.19.0 || ^22.12.0 || >=24.0.0",
        "npm": "^6.11.0 || ^7.5.6 || >=8.0.0",
        "yarn": ">= 1.13.0"
      },
      "peerDependencies": {
        "webpack": "^5.30.0",
        "webpack-dev-server": "^5.0.2"
      }
    },
    "node_modules/@angular-devkit/core": {
      "version": "20.3.5",
      "resolved": "https://registry.npmjs.org/@angular-devkit/core/-/core-20.3.5.tgz",
      "integrity": "sha512-NpAP5j3q/n+SC1s0yAWKDAbc7Y8xUxlmJ5iDRJBGu6qDKM7lMnYA1tn2UEy/JnXluJ2XZqqiymrtucw7yux2xQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ajv": "8.17.1",
        "ajv-formats": "3.0.1",
        "jsonc-parser": "3.3.1",
        "picomatch": "4.0.3",
        "rxjs": "7.8.2",
        "source-map": "0.7.6"
      },
      "engines": {
        "node": "^20.19.0 || ^22.12.0 || >=24.0.0",
        "npm": "^6.11.0 || ^7.5.6 || >=8.0.0",
        "yarn": ">= 1.13.0"
      },
      "peerDependencies": {
        "chokidar": "^4.0.0"
      },
      "peerDependenciesMeta": {
        "chokidar": {
          "optional": true
        }
      }
    },
    "node_modules/@angular-devkit/schematics": {
      "version": "20.3.5",
      "resolved": "https://registry.npmjs.org/@angular-devkit/schematics/-/schematics-20.3.5.tgz",
      "integrity": "sha512-BDizJp7QIoCyMZmuGKoryNUH3QgFPnkEIv0gRdpLhZum4+ZN/DYWaf/jSSGnSVGK88oMrgq7420VEjYPlgJ5MA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@angular-devkit/core": "20.3.5",
        "jsonc-parser": "3.3.1",
        "magic-string": "0.30.17",
        "ora": "8.2.0",
        "rxjs": "7.8.2"
      },
      "engines": {
        "node": "^20.19.0 || ^22.12.0 || >=24.0.0",
        "npm": "^6.11.0 || ^7.5.6 || >=8.0.0",
        "yarn": ">= 1.13.0"
      }
    },
    "node_modules/@angular/build": {
      "version": "20.3.6",
      "resolved": "https://registry.npmjs.org/@angular/build/-/build-20.3.6.tgz",
      "integrity": "sha512-O5qyxCCe77tu1zy9XudKxqFqi5zih0ZI8J8Anra/ZZdtTKbLMprXMGFzMYzwCqvcIzzbmOumkSJKoXbFazHaaw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@ampproject/remapping": "2.3.0",
        "@angular-devkit/architect": "0.2003.6",
        "@babel/core": "7.28.3",
        "@babel/helper-annotate-as-pure": "7.27.3",
        "@babel/helper-split-export-declaration": "7.24.7",
        "@inquirer/confirm": "5.1.14",
        "@vitejs/plugin-basic-ssl": "2.1.0",
        "beasties": "0.3.5",
        "browserslist": "^4.23.0",
        "esbuild": "0.25.9",
        "https-proxy-agent": "7.0.6",
        "istanbul-lib-instrument": "6.0.3",
        "jsonc-parser": "3.3.1",
        "listr2": "9.0.1",
        "magic-string": "0.30.17",
        "mrmime": "2.0.1",
        "parse5-html-rewriting-stream": "8.0.0",
        "picomatch": "4.0.3",
        "piscina": "5.1.3",
        "rollup": "4.52.3",
        "sass": "1.90.0",
        "semver": "7.7.2",
        "source-map-support": "0.5.21",
        "tinyglobby": "0.2.14",
        "vite": "7.1.5",
        "watchpack": "2.4.4"
      },
      "engines": {
        "node": "^20.19.0 || ^22.12.0 || >=24.0.0",
        "npm": "^6.11.0 || ^7.5.6 || >=8.0.0",
        "yarn": ">= 1.13.0"
      },
      "optionalDependencies": {
        "lmdb": "3.4.2"
      },
      "peerDependencies": {
        "@angular/compiler": "^20.0.0",
        "@angular/compiler-cli": "^20.0.0",
        "@angular/core": "^20.0.0",
        "@angular/localize": "^20.0.0",
        "@angular/platform-browser": "^20.0.0",
        "@angular/platform-server": "^20.0.0",
        "@angular/service-worker": "^20.0.0",
        "@angular/ssr": "^20.3.6",
        "karma": "^6.4.0",
        "less": "^4.2.0",
        "ng-packagr": "^20.0.0",
        "postcss": "^8.4.0",
        "tailwindcss": "^2.0.0 || ^3.0.0 || ^4.0.0",
        "tslib": "^2.3.0",
        "typescript": ">=5.8 <6.0",
        "vitest": "^3.1.1"
      },
      "peerDependenciesMeta": {
        "@angular/core": {
          "optional": true
        },
        "@angular/localize": {
          "optional": true
        },
        "@angular/platform-browser": {
          "optional": true
        },
        "@angular/platform-server": {
          "optional": true
        },
        "@angular/service-worker": {
          "optional": true
        },
        "@angular/ssr": {
          "optional": true
        },
        "karma": {
          "optional": true
        },
        "less": {
          "optional": true
        },
        "ng-packagr": {
          "optional": true
        },
        "postcss": {
          "optional": true
        },
        "tailwindcss": {
          "optional": true
        },
        "vitest": {
          "optional": true
        }
      }
    },
    "node_modules/@angular/build/node_modules/@angular-devkit/architect": {
      "version": "0.2003.6",
      "resolved": "https://registry.npmjs.org/@angular-devkit/architect/-/architect-0.2003.6.tgz",
      "integrity": "sha512-VtXxfJzrBZ8MQN83shXNaTUaLSOIwa+4/3LD5drxSnHuYJrz+d3FIApWAxcA9QzucsTDZwXyFxaWZN/e5XVm6g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@angular-devkit/core": "20.3.6",
        "rxjs": "7.8.2"
      },
      "engines": {
        "node": "^20.19.0 || ^22.12.0 || >=24.0.0",
        "npm": "^6.11.0 || ^7.5.6 || >=8.0.0",
        "yarn": ">= 1.13.0"
      }
    },
    "node_modules/@angular/build/node_modules/@angular-devkit/core": {
      "version": "20.3.6",
      "resolved": "https://registry.npmjs.org/@angular-devkit/core/-/core-20.3.6.tgz",
      "integrity": "sha512-uLRk3865Iz/EO9Zm/mrFfdyoZinJBihXE6HVDYRYjAqsgW14LsD8pkpWy9+LYlOwcH96Ndnev+msxaTJaNXtPg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ajv": "8.17.1",
        "ajv-formats": "3.0.1",
        "jsonc-parser": "3.3.1",
        "picomatch": "4.0.3",
        "rxjs": "7.8.2",
        "source-map": "0.7.6"
      },
      "engines": {
        "node": "^20.19.0 || ^22.12.0 || >=24.0.0",
        "npm": "^6.11.0 || ^7.5.6 || >=8.0.0",
        "yarn": ">= 1.13.0"
      },
      "peerDependencies": {
        "chokidar": "^4.0.0"
      },
      "peerDependenciesMeta": {
        "chokidar": {
          "optional": true
        }
      }
    },
    "node_modules/@angular/cli": {
      "version": "20.3.5",
      "resolved": "https://registry.npmjs.org/@angular/cli/-/cli-20.3.5.tgz",
      "integrity": "sha512-UA843Mh5uHIWnrzKUotGmhJmvefyEizFS7X8xJEUJsX5pa1EKUB/145rKHoLHxRRpHGxFcXtvciJCksFz1lSBA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@angular-devkit/architect": "0.2003.5",
        "@angular-devkit/core": "20.3.5",
        "@angular-devkit/schematics": "20.3.5",
        "@inquirer/prompts": "7.8.2",
        "@listr2/prompt-adapter-inquirer": "3.0.1",
        "@modelcontextprotocol/sdk": "1.17.3",
        "@schematics/angular": "20.3.5",
        "@yarnpkg/lockfile": "1.1.0",
        "algoliasearch": "5.35.0",
        "ini": "5.0.0",
        "jsonc-parser": "3.3.1",
        "listr2": "9.0.1",
        "npm-package-arg": "13.0.0",
        "pacote": "21.0.0",
        "resolve": "1.22.10",
        "semver": "7.7.2",
        "yargs": "18.0.0",
        "zod": "3.25.76"
      },
      "bin": {
        "ng": "bin/ng.js"
      },
      "engines": {
        "node": "^20.19.0 || ^22.12.0 || >=24.0.0",
        "npm": "^6.11.0 || ^7.5.6 || >=8.0.0",
        "yarn": ">= 1.13.0"
      }
    },
    "node_modules/@angular/common": {
      "version": "20.3.6",
      "resolved": "https://registry.npmjs.org/@angular/common/-/common-20.3.6.tgz",
      "integrity": "sha512-+gHMuFe0wz4f+vfGZ2q+fSQSYaY7KlN7QdDrFqLnA7H2sythzhXvRbXEtp4DkPjihh9gupXg2MeLh1ROy5AfSw==",
      "license": "MIT",
      "dependencies": {
        "tslib": "^2.3.0"
      },
      "engines": {
        "node": "^20.19.0 || ^22.12.0 || >=24.0.0"
      },
      "peerDependencies": {
        "@angular/core": "20.3.6",
        "rxjs": "^6.5.3 || ^7.4.0"
      }
    },
    "node_modules/@angular/compiler": {
      "version": "20.3.6",
      "resolved": "https://registry.npmjs.org/@angular/compiler/-/compiler-20.3.6.tgz",
      "integrity": "sha512-OdjXBsAsnn7qiW6fSHClwn9XwjVxhtO9+RbDc6Mf+YPCnJq0s8T78H2fc8VdJFp/Rs+tMZcwwjd9VZPm8+2XWA==",
      "license": "MIT",
      "dependencies": {
        "tslib": "^2.3.0"
      },
      "engines": {
        "node": "^20.19.0 || ^22.12.0 || >=24.0.0"
      }
    },
    "node_modules/@angular/compiler-cli": {
      "version": "20.3.6",
      "resolved": "https://registry.npmjs.org/@angular/compiler-cli/-/compiler-cli-20.3.6.tgz",
      "integrity": "sha512-VOFRBx9fBt2jW9I8qD23fwGeKxBI8JssJBAMqnFPl3k59VJWHQi6LlXZCLCBNdfwflTJdKeRvdgT51Q0k6tnFQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/core": "7.28.3",
        "@jridgewell/sourcemap-codec": "^1.4.14",
        "chokidar": "^4.0.0",
        "convert-source-map": "^1.5.1",
        "reflect-metadata": "^0.2.0",
        "semver": "^7.0.0",
        "tslib": "^2.3.0",
        "yargs": "^18.0.0"
      },
      "bin": {
        "ng-xi18n": "bundles/src/bin/ng_xi18n.js",
        "ngc": "bundles/src/bin/ngc.js"
      },
      "engines": {
        "node": "^20.19.0 || ^22.12.0 || >=24.0.0"
      },
      "peerDependencies": {
        "@angular/compiler": "20.3.6",
        "typescript": ">=5.8 <6.0"
      },
      "peerDependenciesMeta": {
        "typescript": {
          "optional": true
        }
      }
    },
    "node_modules/@angular/core": {
      "version": "20.3.6",
      "resolved": "https://registry.npmjs.org/@angular/core/-/core-20.3.6.tgz",
      "integrity": "sha512-sDURQWnjwE4Y750u/5qwkZEYMoI4CrKghnx4aKulxCnohR3//C78wvz6p8MtCuqYfzGkdQZDYFg8tgAz17qgPw==",
      "license": "MIT",
      "dependencies": {
        "tslib": "^2.3.0"
      },
      "engines": {
        "node": "^20.19.0 || ^22.12.0 || >=24.0.0"
      },
      "peerDependencies": {
        "@angular/compiler": "20.3.6",
        "rxjs": "^6.5.3 || ^7.4.0",
        "zone.js": "~0.15.0"
      },
      "peerDependenciesMeta": {
        "@angular/compiler": {
          "optional": true
        },
        "zone.js": {
          "optional": true
        }
      }
    },
    "node_modules/@angular/forms": {
      "version": "20.3.6",
      "resolved": "https://registry.npmjs.org/@angular/forms/-/forms-20.3.6.tgz",
      "integrity": "sha512-tBGo/LBtCtSrClMY4DTm/3UiSjqLLMEYXS/4E0nW1mFDv7ulKnaAQB+KbfBmmTHYxlKLs+SxjKv6GoydMPSurA==",
      "license": "MIT",
      "dependencies": {
        "tslib": "^2.3.0"
      },
      "engines": {
        "node": "^20.19.0 || ^22.12.0 || >=24.0.0"
      },
      "peerDependencies": {
        "@angular/common": "20.3.6",
        "@angular/core": "20.3.6",
        "@angular/platform-browser": "20.3.6",
        "rxjs": "^6.5.3 || ^7.4.0"
      }
    },
    "node_modules/@angular/platform-browser": {
      "version": "20.3.6",
      "resolved": "https://registry.npmjs.org/@angular/platform-browser/-/platform-browser-20.3.6.tgz",
      "integrity": "sha512-gFp1yd+HtRN8XdpMatRLO5w6FLIzsnF31lD2Duo4BUTCoMAMdfaNT6FtcvNdKu7ANo27Ke26fxEEE2bh6FU98A==",
      "license": "MIT",
      "dependencies": {
        "tslib": "^2.3.0"
      },
      "engines": {
        "node": "^20.19.0 || ^22.12.0 || >=24.0.0"
      },
      "peerDependencies": {
        "@angular/animations": "20.3.6",
        "@angular/common": "20.3.6",
        "@angular/core": "20.3.6"
      },
      "peerDependenciesMeta": {
        "@angular/animations": {
          "optional": true
        }
      }
    },
    "node_modules/@angular/router": {
      "version": "20.3.6",
      "resolved": "https://registry.npmjs.org/@angular/router/-/router-20.3.6.tgz",
      "integrity": "sha512-fSAYOR9nKpH5PoBYFNdII3nAFl2maUrYiISU33CnGwb7J7Q0s09k231c/P5tVN4URi+jdADVwiBI8cIYk8SVrg==",
      "license": "MIT",
      "dependencies": {
        "tslib": "^2.3.0"
      },
      "engines": {
        "node": "^20.19.0 || ^22.12.0 || >=24.0.0"
      },
      "peerDependencies": {
        "@angular/common": "20.3.6",
        "@angular/core": "20.3.6",
        "@angular/platform-browser": "20.3.6",
        "rxjs": "^6.5.3 || ^7.4.0"
      }
    },
    "node_modules/@angular/service-worker": {
      "version": "20.3.4",
      "resolved": "https://registry.npmjs.org/@angular/service-worker/-/service-worker-20.3.4.tgz",
      "integrity": "sha512-+hdQkDMoqQhmmS1hhLeUsn9na7gOS4NxvCg7y7ROEquoS24FhnVFOp9GS2K6PaNHhGVzbrBwBopew9QVRKyMyQ==",
      "license": "MIT",
      "dependencies": {
        "tslib": "^2.3.0"
      },
      "bin": {
        "ngsw-config": "ngsw-config.js"
      },
      "engines": {
        "node": "^20.19.0 || ^22.12.0 || >=24.0.0"
      },
      "peerDependencies": {
        "@angular/core": "20.3.4",
        "rxjs": "^6.5.3 || ^7.4.0"
      }
    },
    "node_modules/@babel/code-frame": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/code-frame/-/code-frame-7.27.1.tgz",
      "integrity": "sha512-cjQ7ZlQ0Mv3b47hABuTevyTuYN4i+loJKGeV9flcCgIK37cCXRh+L1bd3iBHlynerhQ7BhCkn2BPbQUL+rGqFg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-validator-identifier": "^7.27.1",
        "js-tokens": "^4.0.0",
        "picocolors": "^1.1.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/compat-data": {
      "version": "7.28.4",
      "resolved": "https://registry.npmjs.org/@babel/compat-data/-/compat-data-7.28.4.tgz",
      "integrity": "sha512-YsmSKC29MJwf0gF8Rjjrg5LQCmyh+j/nD8/eP7f+BeoQTKYqs9RoWbjGOdy0+1Ekr68RJZMUOPVQaQisnIo4Rw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/core": {
      "version": "7.28.3",
      "resolved": "https://registry.npmjs.org/@babel/core/-/core-7.28.3.tgz",
      "integrity": "sha512-yDBHV9kQNcr2/sUr9jghVyz9C3Y5G2zUM2H2lo+9mKv4sFgbA8s8Z9t8D1jiTkGoO/NoIfKMyKWr4s6CN23ZwQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@ampproject/remapping": "^2.2.0",
        "@babel/code-frame": "^7.27.1",
        "@babel/generator": "^7.28.3",
        "@babel/helper-compilation-targets": "^7.27.2",
        "@babel/helper-module-transforms": "^7.28.3",
        "@babel/helpers": "^7.28.3",
        "@babel/parser": "^7.28.3",
        "@babel/template": "^7.27.2",
        "@babel/traverse": "^7.28.3",
        "@babel/types": "^7.28.2",
        "convert-source-map": "^2.0.0",
        "debug": "^4.1.0",
        "gensync": "^1.0.0-beta.2",
        "json5": "^2.2.3",
        "semver": "^6.3.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/babel"
      }
    },
    "node_modules/@babel/core/node_modules/convert-source-map": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/convert-source-map/-/convert-source-map-2.0.0.tgz",
      "integrity": "sha512-Kvp459HrV2FEJ1CAsi1Ku+MY3kasH19TFykTz2xWmMeq6bk2NU3XXvfJ+Q61m0xktWwt+1HSYf3JZsTms3aRJg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@babel/core/node_modules/semver": {
      "version": "6.3.1",
      "resolved": "https://registry.npmjs.org/semver/-/semver-6.3.1.tgz",
      "integrity": "sha512-BR7VvDCVHO+q2xBEWskxS6DJE1qRnb7DxzUrogb71CWoSficBxYsiAGd+Kl0mmq/MprG9yArRkyrQxTO6XjMzA==",
      "dev": true,
      "license": "ISC",
      "bin": {
        "semver": "bin/semver.js"
      }
    },
    "node_modules/@babel/generator": {
      "version": "7.28.3",
      "resolved": "https://registry.npmjs.org/@babel/generator/-/generator-7.28.3.tgz",
      "integrity": "sha512-3lSpxGgvnmZznmBkCRnVREPUFJv2wrv9iAoFDvADJc0ypmdOxdUtcLeBgBJ6zE0PMeTKnxeQzyk0xTBq4Ep7zw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/parser": "^7.28.3",
        "@babel/types": "^7.28.2",
        "@jridgewell/gen-mapping": "^0.3.12",
        "@jridgewell/trace-mapping": "^0.3.28",
        "jsesc": "^3.0.2"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-annotate-as-pure": {
      "version": "7.27.3",
      "resolved": "https://registry.npmjs.org/@babel/helper-annotate-as-pure/-/helper-annotate-as-pure-7.27.3.tgz",
      "integrity": "sha512-fXSwMQqitTGeHLBC08Eq5yXz2m37E4pJX1qAU1+2cNedz/ifv/bVXft90VeSav5nFO61EcNgwr0aJxbyPaWBPg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/types": "^7.27.3"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-compilation-targets": {
      "version": "7.27.2",
      "resolved": "https://registry.npmjs.org/@babel/helper-compilation-targets/-/helper-compilation-targets-7.27.2.tgz",
      "integrity": "sha512-2+1thGUUWWjLTYTHZWK1n8Yga0ijBz1XAhUXcKy81rd5g6yh7hGqMp45v7cadSbEHc9G3OTv45SyneRN3ps4DQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/compat-data": "^7.27.2",
        "@babel/helper-validator-option": "^7.27.1",
        "browserslist": "^4.24.0",
        "lru-cache": "^5.1.1",
        "semver": "^6.3.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-compilation-targets/node_modules/semver": {
      "version": "6.3.1",
      "resolved": "https://registry.npmjs.org/semver/-/semver-6.3.1.tgz",
      "integrity": "sha512-BR7VvDCVHO+q2xBEWskxS6DJE1qRnb7DxzUrogb71CWoSficBxYsiAGd+Kl0mmq/MprG9yArRkyrQxTO6XjMzA==",
      "dev": true,
      "license": "ISC",
      "bin": {
        "semver": "bin/semver.js"
      }
    },
    "node_modules/@babel/helper-create-class-features-plugin": {
      "version": "7.28.3",
      "resolved": "https://registry.npmjs.org/@babel/helper-create-class-features-plugin/-/helper-create-class-features-plugin-7.28.3.tgz",
      "integrity": "sha512-V9f6ZFIYSLNEbuGA/92uOvYsGCJNsuA8ESZ4ldc09bWk/j8H8TKiPw8Mk1eG6olpnO0ALHJmYfZvF4MEE4gajg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-annotate-as-pure": "^7.27.3",
        "@babel/helper-member-expression-to-functions": "^7.27.1",
        "@babel/helper-optimise-call-expression": "^7.27.1",
        "@babel/helper-replace-supers": "^7.27.1",
        "@babel/helper-skip-transparent-expression-wrappers": "^7.27.1",
        "@babel/traverse": "^7.28.3",
        "semver": "^6.3.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0"
      }
    },
    "node_modules/@babel/helper-create-class-features-plugin/node_modules/semver": {
      "version": "6.3.1",
      "resolved": "https://registry.npmjs.org/semver/-/semver-6.3.1.tgz",
      "integrity": "sha512-BR7VvDCVHO+q2xBEWskxS6DJE1qRnb7DxzUrogb71CWoSficBxYsiAGd+Kl0mmq/MprG9yArRkyrQxTO6XjMzA==",
      "dev": true,
      "license": "ISC",
      "bin": {
        "semver": "bin/semver.js"
      }
    },
    "node_modules/@babel/helper-create-regexp-features-plugin": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/helper-create-regexp-features-plugin/-/helper-create-regexp-features-plugin-7.27.1.tgz",
      "integrity": "sha512-uVDC72XVf8UbrH5qQTc18Agb8emwjTiZrQE11Nv3CuBEZmVvTwwE9CBUEvHku06gQCAyYf8Nv6ja1IN+6LMbxQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-annotate-as-pure": "^7.27.1",
        "regexpu-core": "^6.2.0",
        "semver": "^6.3.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0"
      }
    },
    "node_modules/@babel/helper-create-regexp-features-plugin/node_modules/semver": {
      "version": "6.3.1",
      "resolved": "https://registry.npmjs.org/semver/-/semver-6.3.1.tgz",
      "integrity": "sha512-BR7VvDCVHO+q2xBEWskxS6DJE1qRnb7DxzUrogb71CWoSficBxYsiAGd+Kl0mmq/MprG9yArRkyrQxTO6XjMzA==",
      "dev": true,
      "license": "ISC",
      "bin": {
        "semver": "bin/semver.js"
      }
    },
    "node_modules/@babel/helper-define-polyfill-provider": {
      "version": "0.6.5",
      "resolved": "https://registry.npmjs.org/@babel/helper-define-polyfill-provider/-/helper-define-polyfill-provider-0.6.5.tgz",
      "integrity": "sha512-uJnGFcPsWQK8fvjgGP5LZUZZsYGIoPeRjSF5PGwrelYgq7Q15/Ft9NGFp1zglwgIv//W0uG4BevRuSJRyylZPg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-compilation-targets": "^7.27.2",
        "@babel/helper-plugin-utils": "^7.27.1",
        "debug": "^4.4.1",
        "lodash.debounce": "^4.0.8",
        "resolve": "^1.22.10"
      },
      "peerDependencies": {
        "@babel/core": "^7.4.0 || ^8.0.0-0 <8.0.0"
      }
    },
    "node_modules/@babel/helper-globals": {
      "version": "7.28.0",
      "resolved": "https://registry.npmjs.org/@babel/helper-globals/-/helper-globals-7.28.0.tgz",
      "integrity": "sha512-+W6cISkXFa1jXsDEdYA8HeevQT/FULhxzR99pxphltZcVaugps53THCeiWA8SguxxpSp3gKPiuYfSWopkLQ4hw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-member-expression-to-functions": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/helper-member-expression-to-functions/-/helper-member-expression-to-functions-7.27.1.tgz",
      "integrity": "sha512-E5chM8eWjTp/aNoVpcbfM7mLxu9XGLWYise2eBKGQomAk/Mb4XoxyqXTZbuTohbsl8EKqdlMhnDI2CCLfcs9wA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/traverse": "^7.27.1",
        "@babel/types": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-module-imports": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/helper-module-imports/-/helper-module-imports-7.27.1.tgz",
      "integrity": "sha512-0gSFWUPNXNopqtIPQvlD5WgXYI5GY2kP2cCvoT8kczjbfcfuIljTbcWrulD1CIPIX2gt1wghbDy08yE1p+/r3w==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/traverse": "^7.27.1",
        "@babel/types": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-module-transforms": {
      "version": "7.28.3",
      "resolved": "https://registry.npmjs.org/@babel/helper-module-transforms/-/helper-module-transforms-7.28.3.tgz",
      "integrity": "sha512-gytXUbs8k2sXS9PnQptz5o0QnpLL51SwASIORY6XaBKF88nsOT0Zw9szLqlSGQDP/4TljBAD5y98p2U1fqkdsw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-module-imports": "^7.27.1",
        "@babel/helper-validator-identifier": "^7.27.1",
        "@babel/traverse": "^7.28.3"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0"
      }
    },
    "node_modules/@babel/helper-optimise-call-expression": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/helper-optimise-call-expression/-/helper-optimise-call-expression-7.27.1.tgz",
      "integrity": "sha512-URMGH08NzYFhubNSGJrpUEphGKQwMQYBySzat5cAByY1/YgIRkULnIy3tAMeszlL/so2HbeilYloUmSpd7GdVw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/types": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-plugin-utils": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/helper-plugin-utils/-/helper-plugin-utils-7.27.1.tgz",
      "integrity": "sha512-1gn1Up5YXka3YYAHGKpbideQ5Yjf1tDa9qYcgysz+cNCXukyLl6DjPXhD3VRwSb8c0J9tA4b2+rHEZtc6R0tlw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-remap-async-to-generator": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/helper-remap-async-to-generator/-/helper-remap-async-to-generator-7.27.1.tgz",
      "integrity": "sha512-7fiA521aVw8lSPeI4ZOD3vRFkoqkJcS+z4hFo82bFSH/2tNd6eJ5qCVMS5OzDmZh/kaHQeBaeyxK6wljcPtveA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-annotate-as-pure": "^7.27.1",
        "@babel/helper-wrap-function": "^7.27.1",
        "@babel/traverse": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0"
      }
    },
    "node_modules/@babel/helper-replace-supers": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/helper-replace-supers/-/helper-replace-supers-7.27.1.tgz",
      "integrity": "sha512-7EHz6qDZc8RYS5ElPoShMheWvEgERonFCs7IAonWLLUTXW59DP14bCZt89/GKyreYn8g3S83m21FelHKbeDCKA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-member-expression-to-functions": "^7.27.1",
        "@babel/helper-optimise-call-expression": "^7.27.1",
        "@babel/traverse": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0"
      }
    },
    "node_modules/@babel/helper-skip-transparent-expression-wrappers": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/helper-skip-transparent-expression-wrappers/-/helper-skip-transparent-expression-wrappers-7.27.1.tgz",
      "integrity": "sha512-Tub4ZKEXqbPjXgWLl2+3JpQAYBJ8+ikpQ2Ocj/q/r0LwE3UhENh7EUabyHjz2kCEsrRY83ew2DQdHluuiDQFzg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/traverse": "^7.27.1",
        "@babel/types": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-split-export-declaration": {
      "version": "7.24.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-split-export-declaration/-/helper-split-export-declaration-7.24.7.tgz",
      "integrity": "sha512-oy5V7pD+UvfkEATUKvIjvIAH/xCzfsFVw7ygW2SI6NClZzquT+mwdTfgfdbUiceh6iQO0CHtCPsyze/MZ2YbAA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/types": "^7.24.7"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-string-parser": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/helper-string-parser/-/helper-string-parser-7.27.1.tgz",
      "integrity": "sha512-qMlSxKbpRlAridDExk92nSobyDdpPijUq2DW6oDnUqd0iOGxmQjyqhMIihI9+zv4LPyZdRje2cavWPbCbWm3eA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-validator-identifier": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/helper-validator-identifier/-/helper-validator-identifier-7.27.1.tgz",
      "integrity": "sha512-D2hP9eA+Sqx1kBZgzxZh0y1trbuU+JoDkiEwqhQ36nodYqJwyEIhPSdMNd7lOm/4io72luTPWH20Yda0xOuUow==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-validator-option": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/helper-validator-option/-/helper-validator-option-7.27.1.tgz",
      "integrity": "sha512-YvjJow9FxbhFFKDSuFnVCe2WxXk1zWc22fFePVNEaWJEu8IrZVlda6N0uHwzZrUM1il7NC9Mlp4MaJYbYd9JSg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-wrap-function": {
      "version": "7.28.3",
      "resolved": "https://registry.npmjs.org/@babel/helper-wrap-function/-/helper-wrap-function-7.28.3.tgz",
      "integrity": "sha512-zdf983tNfLZFletc0RRXYrHrucBEg95NIFMkn6K9dbeMYnsgHaSBGcQqdsCSStG2PYwRre0Qc2NNSCXbG+xc6g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/template": "^7.27.2",
        "@babel/traverse": "^7.28.3",
        "@babel/types": "^7.28.2"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helpers": {
      "version": "7.28.4",
      "resolved": "https://registry.npmjs.org/@babel/helpers/-/helpers-7.28.4.tgz",
      "integrity": "sha512-HFN59MmQXGHVyYadKLVumYsA9dBFun/ldYxipEjzA4196jpLZd8UjEEBLkbEkvfYreDqJhZxYAWFPtrfhNpj4w==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/template": "^7.27.2",
        "@babel/types": "^7.28.4"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/parser": {
      "version": "7.28.4",
      "resolved": "https://registry.npmjs.org/@babel/parser/-/parser-7.28.4.tgz",
      "integrity": "sha512-yZbBqeM6TkpP9du/I2pUZnJsRMGGvOuIrhjzC1AwHwW+6he4mni6Bp/m8ijn0iOuZuPI2BfkCoSRunpyjnrQKg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/types": "^7.28.4"
      },
      "bin": {
        "parser": "bin/babel-parser.js"
      },
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/@babel/plugin-bugfix-firefox-class-in-computed-class-key": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/plugin-bugfix-firefox-class-in-computed-class-key/-/plugin-bugfix-firefox-class-in-computed-class-key-7.27.1.tgz",
      "integrity": "sha512-QPG3C9cCVRQLxAVwmefEmwdTanECuUBMQZ/ym5kiw3XKCGA7qkuQLcjWWHcrD/GKbn/WmJwaezfuuAOcyKlRPA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.27.1",
        "@babel/traverse": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0"
      }
    },
    "node_modules/@babel/plugin-bugfix-safari-class-field-initializer-scope": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/plugin-bugfix-safari-class-field-initializer-scope/-/plugin-bugfix-safari-class-field-initializer-scope-7.27.1.tgz",
      "integrity": "sha512-qNeq3bCKnGgLkEXUuFry6dPlGfCdQNZbn7yUAPCInwAJHMU7THJfrBSozkcWq5sNM6RcF3S8XyQL2A52KNR9IA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0"
      }
    },
    "node_modules/@babel/plugin-bugfix-safari-id-destructuring-collision-in-function-expression": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/plugin-bugfix-safari-id-destructuring-collision-in-function-expression/-/plugin-bugfix-safari-id-destructuring-collision-in-function-expression-7.27.1.tgz",
      "integrity": "sha512-g4L7OYun04N1WyqMNjldFwlfPCLVkgB54A/YCXICZYBsvJJE3kByKv9c9+R/nAfmIfjl2rKYLNyMHboYbZaWaA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0"
      }
    },
    "node_modules/@babel/plugin-bugfix-v8-spread-parameters-in-optional-chaining": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/plugin-bugfix-v8-spread-parameters-in-optional-chaining/-/plugin-bugfix-v8-spread-parameters-in-optional-chaining-7.27.1.tgz",
      "integrity": "sha512-oO02gcONcD5O1iTLi/6frMJBIwWEHceWGSGqrpCmEL8nogiS6J9PBlE48CaK20/Jx1LuRml9aDftLgdjXT8+Cw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.27.1",
        "@babel/helper-skip-transparent-expression-wrappers": "^7.27.1",
        "@babel/plugin-transform-optional-chaining": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.13.0"
      }
    },
    "node_modules/@babel/plugin-bugfix-v8-static-class-fields-redefine-readonly": {
      "version": "7.28.3",
      "resolved": "https://registry.npmjs.org/@babel/plugin-bugfix-v8-static-class-fields-redefine-readonly/-/plugin-bugfix-v8-static-class-fields-redefine-readonly-7.28.3.tgz",
      "integrity": "sha512-b6YTX108evsvE4YgWyQ921ZAFFQm3Bn+CA3+ZXlNVnPhx+UfsVURoPjfGAPCjBgrqo30yX/C2nZGX96DxvR9Iw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.27.1",
        "@babel/traverse": "^7.28.3"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0"
      }
    },
    "node_modules/@babel/plugin-proposal-private-property-in-object": {
      "version": "7.21.0-placeholder-for-preset-env.2",
      "resolved": "https://registry.npmjs.org/@babel/plugin-proposal-private-property-in-object/-/plugin-proposal-private-property-in-object-7.21.0-placeholder-for-preset-env.2.tgz",
      "integrity": "sha512-SOSkfJDddaM7mak6cPEpswyTRnuRltl429hMraQEglW+OkovnCzsiszTmsrlY//qLFjCpQDFRvjdm2wA5pPm9w==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/plugin-syntax-import-assertions": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/plugin-syntax-import-assertions/-/plugin-syntax-import-assertions-7.27.1.tgz",
      "integrity": "sha512-UT/Jrhw57xg4ILHLFnzFpPDlMbcdEicaAtjPQpbj9wa8T4r5KVWCimHcL/460g8Ht0DMxDyjsLgiWSkVjnwPFg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/plugin-syntax-import-attributes": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/plugin-syntax-import-attributes/-/plugin-syntax-import-attributes-7.27.1.tgz",
      "integrity": "sha512-oFT0FrKHgF53f4vOsZGi2Hh3I35PfSmVs4IBFLFj4dnafP+hIWDLg3VyKmUHfLoLHlyxY4C7DGtmHuJgn+IGww==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/plugin-syntax-unicode-sets-regex": {
      "version": "7.18.6",
      "resolved": "https://registry.npmjs.org/@babel/plugin-syntax-unicode-sets-regex/-/plugin-syntax-unicode-sets-regex-7.18.6.tgz",
      "integrity": "sha512-727YkEAPwSIQTv5im8QHz3upqp92JTWhidIC81Tdx4VJYIte/VndKf1qKrfnnhPLiPghStWfvC/iFaMCQu7Nqg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-create-regexp-features-plugin": "^7.18.6",
        "@babel/helper-plugin-utils": "^7.18.6"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0"
      }
    },
    "node_modules/@babel/plugin-transform-arrow-functions": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-arrow-functions/-/plugin-transform-arrow-functions-7.27.1.tgz",
      "integrity": "sha512-8Z4TGic6xW70FKThA5HYEKKyBpOOsucTOD1DjU3fZxDg+K3zBJcXMFnt/4yQiZnf5+MiOMSXQ9PaEK/Ilh1DeA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/plugin-transform-async-generator-functions": {
      "version": "7.28.0",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-async-generator-functions/-/plugin-transform-async-generator-functions-7.28.0.tgz",
      "integrity": "sha512-BEOdvX4+M765icNPZeidyADIvQ1m1gmunXufXxvRESy/jNNyfovIqUyE7MVgGBjWktCoJlzvFA1To2O4ymIO3Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.27.1",
        "@babel/helper-remap-async-to-generator": "^7.27.1",
        "@babel/traverse": "^7.28.0"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/plugin-transform-async-to-generator": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-async-to-generator/-/plugin-transform-async-to-generator-7.27.1.tgz",
      "integrity": "sha512-NREkZsZVJS4xmTr8qzE5y8AfIPqsdQfRuUiLRTEzb7Qii8iFWCyDKaUV2c0rCuh4ljDZ98ALHP/PetiBV2nddA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-module-imports": "^7.27.1",
        "@babel/helper-plugin-utils": "^7.27.1",
        "@babel/helper-remap-async-to-generator": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/plugin-transform-block-scoped-functions": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-block-scoped-functions/-/plugin-transform-block-scoped-functions-7.27.1.tgz",
      "integrity": "sha512-cnqkuOtZLapWYZUYM5rVIdv1nXYuFVIltZ6ZJ7nIj585QsjKM5dhL2Fu/lICXZ1OyIAFc7Qy+bvDAtTXqGrlhg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/plugin-transform-block-scoping": {
      "version": "7.28.4",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-block-scoping/-/plugin-transform-block-scoping-7.28.4.tgz",
      "integrity": "sha512-1yxmvN0MJHOhPVmAsmoW5liWwoILobu/d/ShymZmj867bAdxGbehIrew1DuLpw2Ukv+qDSSPQdYW1dLNE7t11A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/plugin-transform-class-properties": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-class-properties/-/plugin-transform-class-properties-7.27.1.tgz",
      "integrity": "sha512-D0VcalChDMtuRvJIu3U/fwWjf8ZMykz5iZsg77Nuj821vCKI3zCyRLwRdWbsuJ/uRwZhZ002QtCqIkwC/ZkvbA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-create-class-features-plugin": "^7.27.1",
        "@babel/helper-plugin-utils": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/plugin-transform-class-static-block": {
      "version": "7.28.3",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-class-static-block/-/plugin-transform-class-static-block-7.28.3.tgz",
      "integrity": "sha512-LtPXlBbRoc4Njl/oh1CeD/3jC+atytbnf/UqLoqTDcEYGUPj022+rvfkbDYieUrSj3CaV4yHDByPE+T2HwfsJg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-create-class-features-plugin": "^7.28.3",
        "@babel/helper-plugin-utils": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.12.0"
      }
    },
    "node_modules/@babel/plugin-transform-classes": {
      "version": "7.28.4",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-classes/-/plugin-transform-classes-7.28.4.tgz",
      "integrity": "sha512-cFOlhIYPBv/iBoc+KS3M6et2XPtbT2HiCRfBXWtfpc9OAyostldxIf9YAYB6ypURBBbx+Qv6nyrLzASfJe+hBA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-annotate-as-pure": "^7.27.3",
        "@babel/helper-compilation-targets": "^7.27.2",
        "@babel/helper-globals": "^7.28.0",
        "@babel/helper-plugin-utils": "^7.27.1",
        "@babel/helper-replace-supers": "^7.27.1",
        "@babel/traverse": "^7.28.4"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/plugin-transform-computed-properties": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-computed-properties/-/plugin-transform-computed-properties-7.27.1.tgz",
      "integrity": "sha512-lj9PGWvMTVksbWiDT2tW68zGS/cyo4AkZ/QTp0sQT0mjPopCmrSkzxeXkznjqBxzDI6TclZhOJbBmbBLjuOZUw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.27.1",
        "@babel/template": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/plugin-transform-destructuring": {
      "version": "7.28.0",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-destructuring/-/plugin-transform-destructuring-7.28.0.tgz",
      "integrity": "sha512-v1nrSMBiKcodhsyJ4Gf+Z0U/yawmJDBOTpEB3mcQY52r9RIyPneGyAS/yM6seP/8I+mWI3elOMtT5dB8GJVs+A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.27.1",
        "@babel/traverse": "^7.28.0"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/plugin-transform-dotall-regex": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-dotall-regex/-/plugin-transform-dotall-regex-7.27.1.tgz",
      "integrity": "sha512-gEbkDVGRvjj7+T1ivxrfgygpT7GUd4vmODtYpbs0gZATdkX8/iSnOtZSxiZnsgm1YjTgjI6VKBGSJJevkrclzw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-create-regexp-features-plugin": "^7.27.1",
        "@babel/helper-plugin-utils": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/plugin-transform-duplicate-keys": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-duplicate-keys/-/plugin-transform-duplicate-keys-7.27.1.tgz",
      "integrity": "sha512-MTyJk98sHvSs+cvZ4nOauwTTG1JeonDjSGvGGUNHreGQns+Mpt6WX/dVzWBHgg+dYZhkC4X+zTDfkTU+Vy9y7Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/plugin-transform-duplicate-named-capturing-groups-regex": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-duplicate-named-capturing-groups-regex/-/plugin-transform-duplicate-named-capturing-groups-regex-7.27.1.tgz",
      "integrity": "sha512-hkGcueTEzuhB30B3eJCbCYeCaaEQOmQR0AdvzpD4LoN0GXMWzzGSuRrxR2xTnCrvNbVwK9N6/jQ92GSLfiZWoQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-create-regexp-features-plugin": "^7.27.1",
        "@babel/helper-plugin-utils": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0"
      }
    },
    "node_modules/@babel/plugin-transform-dynamic-import": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-dynamic-import/-/plugin-transform-dynamic-import-7.27.1.tgz",
      "integrity": "sha512-MHzkWQcEmjzzVW9j2q8LGjwGWpG2mjwaaB0BNQwst3FIjqsg8Ct/mIZlvSPJvfi9y2AC8mi/ktxbFVL9pZ1I4A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/plugin-transform-explicit-resource-management": {
      "version": "7.28.0",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-explicit-resource-management/-/plugin-transform-explicit-resource-management-7.28.0.tgz",
      "integrity": "sha512-K8nhUcn3f6iB+P3gwCv/no7OdzOZQcKchW6N389V6PD8NUWKZHzndOd9sPDVbMoBsbmjMqlB4L9fm+fEFNVlwQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.27.1",
        "@babel/plugin-transform-destructuring": "^7.28.0"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/plugin-transform-exponentiation-operator": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-exponentiation-operator/-/plugin-transform-exponentiation-operator-7.27.1.tgz",
      "integrity": "sha512-uspvXnhHvGKf2r4VVtBpeFnuDWsJLQ6MF6lGJLC89jBR1uoVeqM416AZtTuhTezOfgHicpJQmoD5YUakO/YmXQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/plugin-transform-export-namespace-from": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-export-namespace-from/-/plugin-transform-export-namespace-from-7.27.1.tgz",
      "integrity": "sha512-tQvHWSZ3/jH2xuq/vZDy0jNn+ZdXJeM8gHvX4lnJmsc3+50yPlWdZXIc5ay+umX+2/tJIqHqiEqcJvxlmIvRvQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/plugin-transform-for-of": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-for-of/-/plugin-transform-for-of-7.27.1.tgz",
      "integrity": "sha512-BfbWFFEJFQzLCQ5N8VocnCtA8J1CLkNTe2Ms2wocj75dd6VpiqS5Z5quTYcUoo4Yq+DN0rtikODccuv7RU81sw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.27.1",
        "@babel/helper-skip-transparent-expression-wrappers": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/plugin-transform-function-name": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-function-name/-/plugin-transform-function-name-7.27.1.tgz",
      "integrity": "sha512-1bQeydJF9Nr1eBCMMbC+hdwmRlsv5XYOMu03YSWFwNs0HsAmtSxxF1fyuYPqemVldVyFmlCU7w8UE14LupUSZQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-compilation-targets": "^7.27.1",
        "@babel/helper-plugin-utils": "^7.27.1",
        "@babel/traverse": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/plugin-transform-json-strings": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-json-strings/-/plugin-transform-json-strings-7.27.1.tgz",
      "integrity": "sha512-6WVLVJiTjqcQauBhn1LkICsR2H+zm62I3h9faTDKt1qP4jn2o72tSvqMwtGFKGTpojce0gJs+76eZ2uCHRZh0Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/plugin-transform-literals": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-literals/-/plugin-transform-literals-7.27.1.tgz",
      "integrity": "sha512-0HCFSepIpLTkLcsi86GG3mTUzxV5jpmbv97hTETW3yzrAij8aqlD36toB1D0daVFJM8NK6GvKO0gslVQmm+zZA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/plugin-transform-logical-assignment-operators": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-logical-assignment-operators/-/plugin-transform-logical-assignment-operators-7.27.1.tgz",
      "integrity": "sha512-SJvDs5dXxiae4FbSL1aBJlG4wvl594N6YEVVn9e3JGulwioy6z3oPjx/sQBO3Y4NwUu5HNix6KJ3wBZoewcdbw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/plugin-transform-member-expression-literals": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-member-expression-literals/-/plugin-transform-member-expression-literals-7.27.1.tgz",
      "integrity": "sha512-hqoBX4dcZ1I33jCSWcXrP+1Ku7kdqXf1oeah7ooKOIiAdKQ+uqftgCFNOSzA5AMS2XIHEYeGFg4cKRCdpxzVOQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/plugin-transform-modules-amd": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-modules-amd/-/plugin-transform-modules-amd-7.27.1.tgz",
      "integrity": "sha512-iCsytMg/N9/oFq6n+gFTvUYDZQOMK5kEdeYxmxt91fcJGycfxVP9CnrxoliM0oumFERba2i8ZtwRUCMhvP1LnA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-module-transforms": "^7.27.1",
        "@babel/helper-plugin-utils": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/plugin-transform-modules-commonjs": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-modules-commonjs/-/plugin-transform-modules-commonjs-7.27.1.tgz",
      "integrity": "sha512-OJguuwlTYlN0gBZFRPqwOGNWssZjfIUdS7HMYtN8c1KmwpwHFBwTeFZrg9XZa+DFTitWOW5iTAG7tyCUPsCCyw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-module-transforms": "^7.27.1",
        "@babel/helper-plugin-utils": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/plugin-transform-modules-systemjs": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-modules-systemjs/-/plugin-transform-modules-systemjs-7.27.1.tgz",
      "integrity": "sha512-w5N1XzsRbc0PQStASMksmUeqECuzKuTJer7kFagK8AXgpCMkeDMO5S+aaFb7A51ZYDF7XI34qsTX+fkHiIm5yA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-module-transforms": "^7.27.1",
        "@babel/helper-plugin-utils": "^7.27.1",
        "@babel/helper-validator-identifier": "^7.27.1",
        "@babel/traverse": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/plugin-transform-modules-umd": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-modules-umd/-/plugin-transform-modules-umd-7.27.1.tgz",
      "integrity": "sha512-iQBE/xC5BV1OxJbp6WG7jq9IWiD+xxlZhLrdwpPkTX3ydmXdvoCpyfJN7acaIBZaOqTfr76pgzqBJflNbeRK+w==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-module-transforms": "^7.27.1",
        "@babel/helper-plugin-utils": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/plugin-transform-named-capturing-groups-regex": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-named-capturing-groups-regex/-/plugin-transform-named-capturing-groups-regex-7.27.1.tgz",
      "integrity": "sha512-SstR5JYy8ddZvD6MhV0tM/j16Qds4mIpJTOd1Yu9J9pJjH93bxHECF7pgtc28XvkzTD6Pxcm/0Z73Hvk7kb3Ng==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-create-regexp-features-plugin": "^7.27.1",
        "@babel/helper-plugin-utils": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0"
      }
    },
    "node_modules/@babel/plugin-transform-new-target": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-new-target/-/plugin-transform-new-target-7.27.1.tgz",
      "integrity": "sha512-f6PiYeqXQ05lYq3TIfIDu/MtliKUbNwkGApPUvyo6+tc7uaR4cPjPe7DFPr15Uyycg2lZU6btZ575CuQoYh7MQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/plugin-transform-nullish-coalescing-operator": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-nullish-coalescing-operator/-/plugin-transform-nullish-coalescing-operator-7.27.1.tgz",
      "integrity": "sha512-aGZh6xMo6q9vq1JGcw58lZ1Z0+i0xB2x0XaauNIUXd6O1xXc3RwoWEBlsTQrY4KQ9Jf0s5rgD6SiNkaUdJegTA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/plugin-transform-numeric-separator": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-numeric-separator/-/plugin-transform-numeric-separator-7.27.1.tgz",
      "integrity": "sha512-fdPKAcujuvEChxDBJ5c+0BTaS6revLV7CJL08e4m3de8qJfNIuCc2nc7XJYOjBoTMJeqSmwXJ0ypE14RCjLwaw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/plugin-transform-object-rest-spread": {
      "version": "7.28.4",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-object-rest-spread/-/plugin-transform-object-rest-spread-7.28.4.tgz",
      "integrity": "sha512-373KA2HQzKhQCYiRVIRr+3MjpCObqzDlyrM6u4I201wL8Mp2wHf7uB8GhDwis03k2ti8Zr65Zyyqs1xOxUF/Ew==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-compilation-targets": "^7.27.2",
        "@babel/helper-plugin-utils": "^7.27.1",
        "@babel/plugin-transform-destructuring": "^7.28.0",
        "@babel/plugin-transform-parameters": "^7.27.7",
        "@babel/traverse": "^7.28.4"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/plugin-transform-object-super": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-object-super/-/plugin-transform-object-super-7.27.1.tgz",
      "integrity": "sha512-SFy8S9plRPbIcxlJ8A6mT/CxFdJx/c04JEctz4jf8YZaVS2px34j7NXRrlGlHkN/M2gnpL37ZpGRGVFLd3l8Ng==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.27.1",
        "@babel/helper-replace-supers": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/plugin-transform-optional-catch-binding": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-optional-catch-binding/-/plugin-transform-optional-catch-binding-7.27.1.tgz",
      "integrity": "sha512-txEAEKzYrHEX4xSZN4kJ+OfKXFVSWKB2ZxM9dpcE3wT7smwkNmXo5ORRlVzMVdJbD+Q8ILTgSD7959uj+3Dm3Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/plugin-transform-optional-chaining": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-optional-chaining/-/plugin-transform-optional-chaining-7.27.1.tgz",
      "integrity": "sha512-BQmKPPIuc8EkZgNKsv0X4bPmOoayeu4F1YCwx2/CfmDSXDbp7GnzlUH+/ul5VGfRg1AoFPsrIThlEBj2xb4CAg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.27.1",
        "@babel/helper-skip-transparent-expression-wrappers": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/plugin-transform-parameters": {
      "version": "7.27.7",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-parameters/-/plugin-transform-parameters-7.27.7.tgz",
      "integrity": "sha512-qBkYTYCb76RRxUM6CcZA5KRu8K4SM8ajzVeUgVdMVO9NN9uI/GaVmBg/WKJJGnNokV9SY8FxNOVWGXzqzUidBg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/plugin-transform-private-methods": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-private-methods/-/plugin-transform-private-methods-7.27.1.tgz",
      "integrity": "sha512-10FVt+X55AjRAYI9BrdISN9/AQWHqldOeZDUoLyif1Kn05a56xVBXb8ZouL8pZ9jem8QpXaOt8TS7RHUIS+GPA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-create-class-features-plugin": "^7.27.1",
        "@babel/helper-plugin-utils": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/plugin-transform-private-property-in-object": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-private-property-in-object/-/plugin-transform-private-property-in-object-7.27.1.tgz",
      "integrity": "sha512-5J+IhqTi1XPa0DXF83jYOaARrX+41gOewWbkPyjMNRDqgOCqdffGh8L3f/Ek5utaEBZExjSAzcyjmV9SSAWObQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-annotate-as-pure": "^7.27.1",
        "@babel/helper-create-class-features-plugin": "^7.27.1",
        "@babel/helper-plugin-utils": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/plugin-transform-property-literals": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-property-literals/-/plugin-transform-property-literals-7.27.1.tgz",
      "integrity": "sha512-oThy3BCuCha8kDZ8ZkgOg2exvPYUlprMukKQXI1r1pJ47NCvxfkEy8vK+r/hT9nF0Aa4H1WUPZZjHTFtAhGfmQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/plugin-transform-regenerator": {
      "version": "7.28.4",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-regenerator/-/plugin-transform-regenerator-7.28.4.tgz",
      "integrity": "sha512-+ZEdQlBoRg9m2NnzvEeLgtvBMO4tkFBw5SQIUgLICgTrumLoU7lr+Oghi6km2PFj+dbUt2u1oby2w3BDO9YQnA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/plugin-transform-regexp-modifiers": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-regexp-modifiers/-/plugin-transform-regexp-modifiers-7.27.1.tgz",
      "integrity": "sha512-TtEciroaiODtXvLZv4rmfMhkCv8jx3wgKpL68PuiPh2M4fvz5jhsA7697N1gMvkvr/JTF13DrFYyEbY9U7cVPA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-create-regexp-features-plugin": "^7.27.1",
        "@babel/helper-plugin-utils": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0"
      }
    },
    "node_modules/@babel/plugin-transform-reserved-words": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-reserved-words/-/plugin-transform-reserved-words-7.27.1.tgz",
      "integrity": "sha512-V2ABPHIJX4kC7HegLkYoDpfg9PVmuWy/i6vUM5eGK22bx4YVFD3M5F0QQnWQoDs6AGsUWTVOopBiMFQgHaSkVw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/plugin-transform-runtime": {
      "version": "7.28.3",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-runtime/-/plugin-transform-runtime-7.28.3.tgz",
      "integrity": "sha512-Y6ab1kGqZ0u42Zv/4a7l0l72n9DKP/MKoKWaUSBylrhNZO2prYuqFOLbn5aW5SIFXwSH93yfjbgllL8lxuGKLg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-module-imports": "^7.27.1",
        "@babel/helper-plugin-utils": "^7.27.1",
        "babel-plugin-polyfill-corejs2": "^0.4.14",
        "babel-plugin-polyfill-corejs3": "^0.13.0",
        "babel-plugin-polyfill-regenerator": "^0.6.5",
        "semver": "^6.3.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/plugin-transform-runtime/node_modules/semver": {
      "version": "6.3.1",
      "resolved": "https://registry.npmjs.org/semver/-/semver-6.3.1.tgz",
      "integrity": "sha512-BR7VvDCVHO+q2xBEWskxS6DJE1qRnb7DxzUrogb71CWoSficBxYsiAGd+Kl0mmq/MprG9yArRkyrQxTO6XjMzA==",
      "dev": true,
      "license": "ISC",
      "bin": {
        "semver": "bin/semver.js"
      }
    },
    "node_modules/@babel/plugin-transform-shorthand-properties": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-shorthand-properties/-/plugin-transform-shorthand-properties-7.27.1.tgz",
      "integrity": "sha512-N/wH1vcn4oYawbJ13Y/FxcQrWk63jhfNa7jef0ih7PHSIHX2LB7GWE1rkPrOnka9kwMxb6hMl19p7lidA+EHmQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/plugin-transform-spread": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-spread/-/plugin-transform-spread-7.27.1.tgz",
      "integrity": "sha512-kpb3HUqaILBJcRFVhFUs6Trdd4mkrzcGXss+6/mxUd273PfbWqSDHRzMT2234gIg2QYfAjvXLSquP1xECSg09Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.27.1",
        "@babel/helper-skip-transparent-expression-wrappers": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/plugin-transform-sticky-regex": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-sticky-regex/-/plugin-transform-sticky-regex-7.27.1.tgz",
      "integrity": "sha512-lhInBO5bi/Kowe2/aLdBAawijx+q1pQzicSgnkB6dUPc1+RC8QmJHKf2OjvU+NZWitguJHEaEmbV6VWEouT58g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/plugin-transform-template-literals": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-template-literals/-/plugin-transform-template-literals-7.27.1.tgz",
      "integrity": "sha512-fBJKiV7F2DxZUkg5EtHKXQdbsbURW3DZKQUWphDum0uRP6eHGGa/He9mc0mypL680pb+e/lDIthRohlv8NCHkg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/plugin-transform-typeof-symbol": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-typeof-symbol/-/plugin-transform-typeof-symbol-7.27.1.tgz",
      "integrity": "sha512-RiSILC+nRJM7FY5srIyc4/fGIwUhyDuuBSdWn4y6yT6gm652DpCHZjIipgn6B7MQ1ITOUnAKWixEUjQRIBIcLw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/plugin-transform-unicode-escapes": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-unicode-escapes/-/plugin-transform-unicode-escapes-7.27.1.tgz",
      "integrity": "sha512-Ysg4v6AmF26k9vpfFuTZg8HRfVWzsh1kVfowA23y9j/Gu6dOuahdUVhkLqpObp3JIv27MLSii6noRnuKN8H0Mg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/plugin-transform-unicode-property-regex": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-unicode-property-regex/-/plugin-transform-unicode-property-regex-7.27.1.tgz",
      "integrity": "sha512-uW20S39PnaTImxp39O5qFlHLS9LJEmANjMG7SxIhap8rCHqu0Ik+tLEPX5DKmHn6CsWQ7j3lix2tFOa5YtL12Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-create-regexp-features-plugin": "^7.27.1",
        "@babel/helper-plugin-utils": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/plugin-transform-unicode-regex": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-unicode-regex/-/plugin-transform-unicode-regex-7.27.1.tgz",
      "integrity": "sha512-xvINq24TRojDuyt6JGtHmkVkrfVV3FPT16uytxImLeBZqW3/H52yN+kM1MGuyPkIQxrzKwPHs5U/MP3qKyzkGw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-create-regexp-features-plugin": "^7.27.1",
        "@babel/helper-plugin-utils": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/plugin-transform-unicode-sets-regex": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-unicode-sets-regex/-/plugin-transform-unicode-sets-regex-7.27.1.tgz",
      "integrity": "sha512-EtkOujbc4cgvb0mlpQefi4NTPBzhSIevblFevACNLUspmrALgmEBdL/XfnyyITfd8fKBZrZys92zOWcik7j9Tw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-create-regexp-features-plugin": "^7.27.1",
        "@babel/helper-plugin-utils": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0"
      }
    },
    "node_modules/@babel/preset-env": {
      "version": "7.28.3",
      "resolved": "https://registry.npmjs.org/@babel/preset-env/-/preset-env-7.28.3.tgz",
      "integrity": "sha512-ROiDcM+GbYVPYBOeCR6uBXKkQpBExLl8k9HO1ygXEyds39j+vCCsjmj7S8GOniZQlEs81QlkdJZe76IpLSiqpg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/compat-data": "^7.28.0",
        "@babel/helper-compilation-targets": "^7.27.2",
        "@babel/helper-plugin-utils": "^7.27.1",
        "@babel/helper-validator-option": "^7.27.1",
        "@babel/plugin-bugfix-firefox-class-in-computed-class-key": "^7.27.1",
        "@babel/plugin-bugfix-safari-class-field-initializer-scope": "^7.27.1",
        "@babel/plugin-bugfix-safari-id-destructuring-collision-in-function-expression": "^7.27.1",
        "@babel/plugin-bugfix-v8-spread-parameters-in-optional-chaining": "^7.27.1",
        "@babel/plugin-bugfix-v8-static-class-fields-redefine-readonly": "^7.28.3",
        "@babel/plugin-proposal-private-property-in-object": "7.21.0-placeholder-for-preset-env.2",
        "@babel/plugin-syntax-import-assertions": "^7.27.1",
        "@babel/plugin-syntax-import-attributes": "^7.27.1",
        "@babel/plugin-syntax-unicode-sets-regex": "^7.18.6",
        "@babel/plugin-transform-arrow-functions": "^7.27.1",
        "@babel/plugin-transform-async-generator-functions": "^7.28.0",
        "@babel/plugin-transform-async-to-generator": "^7.27.1",
        "@babel/plugin-transform-block-scoped-functions": "^7.27.1",
        "@babel/plugin-transform-block-scoping": "^7.28.0",
        "@babel/plugin-transform-class-properties": "^7.27.1",
        "@babel/plugin-transform-class-static-block": "^7.28.3",
        "@babel/plugin-transform-classes": "^7.28.3",
        "@babel/plugin-transform-computed-properties": "^7.27.1",
        "@babel/plugin-transform-destructuring": "^7.28.0",
        "@babel/plugin-transform-dotall-regex": "^7.27.1",
        "@babel/plugin-transform-duplicate-keys": "^7.27.1",
        "@babel/plugin-transform-duplicate-named-capturing-groups-regex": "^7.27.1",
        "@babel/plugin-transform-dynamic-import": "^7.27.1",
        "@babel/plugin-transform-explicit-resource-management": "^7.28.0",
        "@babel/plugin-transform-exponentiation-operator": "^7.27.1",
        "@babel/plugin-transform-export-namespace-from": "^7.27.1",
        "@babel/plugin-transform-for-of": "^7.27.1",
        "@babel/plugin-transform-function-name": "^7.27.1",
        "@babel/plugin-transform-json-strings": "^7.27.1",
        "@babel/plugin-transform-literals": "^7.27.1",
        "@babel/plugin-transform-logical-assignment-operators": "^7.27.1",
        "@babel/plugin-transform-member-expression-literals": "^7.27.1",
        "@babel/plugin-transform-modules-amd": "^7.27.1",
        "@babel/plugin-transform-modules-commonjs": "^7.27.1",
        "@babel/plugin-transform-modules-systemjs": "^7.27.1",
        "@babel/plugin-transform-modules-umd": "^7.27.1",
        "@babel/plugin-transform-named-capturing-groups-regex": "^7.27.1",
        "@babel/plugin-transform-new-target": "^7.27.1",
        "@babel/plugin-transform-nullish-coalescing-operator": "^7.27.1",
        "@babel/plugin-transform-numeric-separator": "^7.27.1",
        "@babel/plugin-transform-object-rest-spread": "^7.28.0",
        "@babel/plugin-transform-object-super": "^7.27.1",
        "@babel/plugin-transform-optional-catch-binding": "^7.27.1",
        "@babel/plugin-transform-optional-chaining": "^7.27.1",
        "@babel/plugin-transform-parameters": "^7.27.7",
        "@babel/plugin-transform-private-methods": "^7.27.1",
        "@babel/plugin-transform-private-property-in-object": "^7.27.1",
        "@babel/plugin-transform-property-literals": "^7.27.1",
        "@babel/plugin-transform-regenerator": "^7.28.3",
        "@babel/plugin-transform-regexp-modifiers": "^7.27.1",
        "@babel/plugin-transform-reserved-words": "^7.27.1",
        "@babel/plugin-transform-shorthand-properties": "^7.27.1",
        "@babel/plugin-transform-spread": "^7.27.1",
        "@babel/plugin-transform-sticky-regex": "^7.27.1",
        "@babel/plugin-transform-template-literals": "^7.27.1",
        "@babel/plugin-transform-typeof-symbol": "^7.27.1",
        "@babel/plugin-transform-unicode-escapes": "^7.27.1",
        "@babel/plugin-transform-unicode-property-regex": "^7.27.1",
        "@babel/plugin-transform-unicode-regex": "^7.27.1",
        "@babel/plugin-transform-unicode-sets-regex": "^7.27.1",
        "@babel/preset-modules": "0.1.6-no-external-plugins",
        "babel-plugin-polyfill-corejs2": "^0.4.14",
        "babel-plugin-polyfill-corejs3": "^0.13.0",
        "babel-plugin-polyfill-regenerator": "^0.6.5",
        "core-js-compat": "^3.43.0",
        "semver": "^6.3.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/preset-env/node_modules/semver": {
      "version": "6.3.1",
      "resolved": "https://registry.npmjs.org/semver/-/semver-6.3.1.tgz",
      "integrity": "sha512-BR7VvDCVHO+q2xBEWskxS6DJE1qRnb7DxzUrogb71CWoSficBxYsiAGd+Kl0mmq/MprG9yArRkyrQxTO6XjMzA==",
      "dev": true,
      "license": "ISC",
      "bin": {
        "semver": "bin/semver.js"
      }
    },
    "node_modules/@babel/preset-modules": {
      "version": "0.1.6-no-external-plugins",
      "resolved": "https://registry.npmjs.org/@babel/preset-modules/-/preset-modules-0.1.6-no-external-plugins.tgz",
      "integrity": "sha512-HrcgcIESLm9aIR842yhJ5RWan/gebQUJ6E/E5+rf0y9o6oj7w0Br+sWuL6kEQ/o/AdfvR1Je9jG18/gnpwjEyA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.0.0",
        "@babel/types": "^7.4.4",
        "esutils": "^2.0.2"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0 || ^8.0.0-0 <8.0.0"
      }
    },
    "node_modules/@babel/runtime": {
      "version": "7.28.3",
      "resolved": "https://registry.npmjs.org/@babel/runtime/-/runtime-7.28.3.tgz",
      "integrity": "sha512-9uIQ10o0WGdpP6GDhXcdOJPJuDgFtIDtN/9+ArJQ2NAfAmiuhTQdzkaTGR33v43GYS2UrSA0eX2pPPHoFVvpxA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/template": {
      "version": "7.27.2",
      "resolved": "https://registry.npmjs.org/@babel/template/-/template-7.27.2.tgz",
      "integrity": "sha512-LPDZ85aEJyYSd18/DkjNh4/y1ntkE5KwUHWTiqgRxruuZL2F1yuHligVHLvcHY2vMHXttKFpJn6LwfI7cw7ODw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/code-frame": "^7.27.1",
        "@babel/parser": "^7.27.2",
        "@babel/types": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/traverse": {
      "version": "7.28.4",
      "resolved": "https://registry.npmjs.org/@babel/traverse/-/traverse-7.28.4.tgz",
      "integrity": "sha512-YEzuboP2qvQavAcjgQNVgsvHIDv6ZpwXvcvjmyySP2DIMuByS/6ioU5G9pYrWHM6T2YDfc7xga9iNzYOs12CFQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/code-frame": "^7.27.1",
        "@babel/generator": "^7.28.3",
        "@babel/helper-globals": "^7.28.0",
        "@babel/parser": "^7.28.4",
        "@babel/template": "^7.27.2",
        "@babel/types": "^7.28.4",
        "debug": "^4.3.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/types": {
      "version": "7.28.4",
      "resolved": "https://registry.npmjs.org/@babel/types/-/types-7.28.4.tgz",
      "integrity": "sha512-bkFqkLhh3pMBUQQkpVgWDWq/lqzc2678eUyDlTBhRqhCHFguYYGM0Efga7tYk4TogG/3x0EEl66/OQ+WGbWB/Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-string-parser": "^7.27.1",
        "@babel/helper-validator-identifier": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@colors/colors": {
      "version": "1.5.0",
      "resolved": "https://registry.npmjs.org/@colors/colors/-/colors-1.5.0.tgz",
      "integrity": "sha512-ooWCrlZP11i8GImSjTHYHLkvFDP48nS4+204nGb1RiX/WXYHmJA2III9/e2DWVabCESdW7hBAEzHRqUn9OUVvQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.1.90"
      }
    },
    "node_modules/@discoveryjs/json-ext": {
      "version": "0.6.3",
      "resolved": "https://registry.npmjs.org/@discoveryjs/json-ext/-/json-ext-0.6.3.tgz",
      "integrity": "sha512-4B4OijXeVNOPZlYA2oEwWOTkzyltLao+xbotHQeqN++Rv27Y6s818+n2Qkp8q+Fxhn0t/5lA5X1Mxktud8eayQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=14.17.0"
      }
    },
    "node_modules/@esbuild/aix-ppc64": {
      "version": "0.25.9",
      "resolved": "https://registry.npmjs.org/@esbuild/aix-ppc64/-/aix-ppc64-0.25.9.tgz",
      "integrity": "sha512-OaGtL73Jck6pBKjNIe24BnFE6agGl+6KxDtTfHhy1HmhthfKouEcOhqpSL64K4/0WCtbKFLOdzD/44cJ4k9opA==",
      "cpu": [
        "ppc64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "aix"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/android-arm": {
      "version": "0.25.9",
      "resolved": "https://registry.npmjs.org/@esbuild/android-arm/-/android-arm-0.25.9.tgz",
      "integrity": "sha512-5WNI1DaMtxQ7t7B6xa572XMXpHAaI/9Hnhk8lcxF4zVN4xstUgTlvuGDorBguKEnZO70qwEcLpfifMLoxiPqHQ==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/android-arm64": {
      "version": "0.25.9",
      "resolved": "https://registry.npmjs.org/@esbuild/android-arm64/-/android-arm64-0.25.9.tgz",
      "integrity": "sha512-IDrddSmpSv51ftWslJMvl3Q2ZT98fUSL2/rlUXuVqRXHCs5EUF1/f+jbjF5+NG9UffUDMCiTyh8iec7u8RlTLg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/android-x64": {
      "version": "0.25.9",
      "resolved": "https://registry.npmjs.org/@esbuild/android-x64/-/android-x64-0.25.9.tgz",
      "integrity": "sha512-I853iMZ1hWZdNllhVZKm34f4wErd4lMyeV7BLzEExGEIZYsOzqDWDf+y082izYUE8gtJnYHdeDpN/6tUdwvfiw==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/darwin-arm64": {
      "version": "0.25.9",
      "resolved": "https://registry.npmjs.org/@esbuild/darwin-arm64/-/darwin-arm64-0.25.9.tgz",
      "integrity": "sha512-XIpIDMAjOELi/9PB30vEbVMs3GV1v2zkkPnuyRRURbhqjyzIINwj+nbQATh4H9GxUgH1kFsEyQMxwiLFKUS6Rg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/darwin-x64": {
      "version": "0.25.9",
      "resolved": "https://registry.npmjs.org/@esbuild/darwin-x64/-/darwin-x64-0.25.9.tgz",
      "integrity": "sha512-jhHfBzjYTA1IQu8VyrjCX4ApJDnH+ez+IYVEoJHeqJm9VhG9Dh2BYaJritkYK3vMaXrf7Ogr/0MQ8/MeIefsPQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/freebsd-arm64": {
      "version": "0.25.9",
      "resolved": "https://registry.npmjs.org/@esbuild/freebsd-arm64/-/freebsd-arm64-0.25.9.tgz",
      "integrity": "sha512-z93DmbnY6fX9+KdD4Ue/H6sYs+bhFQJNCPZsi4XWJoYblUqT06MQUdBCpcSfuiN72AbqeBFu5LVQTjfXDE2A6Q==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/freebsd-x64": {
      "version": "0.25.9",
      "resolved": "https://registry.npmjs.org/@esbuild/freebsd-x64/-/freebsd-x64-0.25.9.tgz",
      "integrity": "sha512-mrKX6H/vOyo5v71YfXWJxLVxgy1kyt1MQaD8wZJgJfG4gq4DpQGpgTB74e5yBeQdyMTbgxp0YtNj7NuHN0PoZg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-arm": {
      "version": "0.25.9",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-arm/-/linux-arm-0.25.9.tgz",
      "integrity": "sha512-HBU2Xv78SMgaydBmdor38lg8YDnFKSARg1Q6AT0/y2ezUAKiZvc211RDFHlEZRFNRVhcMamiToo7bDx3VEOYQw==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-arm64": {
      "version": "0.25.9",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-arm64/-/linux-arm64-0.25.9.tgz",
      "integrity": "sha512-BlB7bIcLT3G26urh5Dmse7fiLmLXnRlopw4s8DalgZ8ef79Jj4aUcYbk90g8iCa2467HX8SAIidbL7gsqXHdRw==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-ia32": {
      "version": "0.25.9",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-ia32/-/linux-ia32-0.25.9.tgz",
      "integrity": "sha512-e7S3MOJPZGp2QW6AK6+Ly81rC7oOSerQ+P8L0ta4FhVi+/j/v2yZzx5CqqDaWjtPFfYz21Vi1S0auHrap3Ma3A==",
      "cpu": [
        "ia32"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-loong64": {
      "version": "0.25.9",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-loong64/-/linux-loong64-0.25.9.tgz",
      "integrity": "sha512-Sbe10Bnn0oUAB2AalYztvGcK+o6YFFA/9829PhOCUS9vkJElXGdphz0A3DbMdP8gmKkqPmPcMJmJOrI3VYB1JQ==",
      "cpu": [
        "loong64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-mips64el": {
      "version": "0.25.9",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-mips64el/-/linux-mips64el-0.25.9.tgz",
      "integrity": "sha512-YcM5br0mVyZw2jcQeLIkhWtKPeVfAerES5PvOzaDxVtIyZ2NUBZKNLjC5z3/fUlDgT6w89VsxP2qzNipOaaDyA==",
      "cpu": [
        "mips64el"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-ppc64": {
      "version": "0.25.9",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-ppc64/-/linux-ppc64-0.25.9.tgz",
      "integrity": "sha512-++0HQvasdo20JytyDpFvQtNrEsAgNG2CY1CLMwGXfFTKGBGQT3bOeLSYE2l1fYdvML5KUuwn9Z8L1EWe2tzs1w==",
      "cpu": [
        "ppc64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-riscv64": {
      "version": "0.25.9",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-riscv64/-/linux-riscv64-0.25.9.tgz",
      "integrity": "sha512-uNIBa279Y3fkjV+2cUjx36xkx7eSjb8IvnL01eXUKXez/CBHNRw5ekCGMPM0BcmqBxBcdgUWuUXmVWwm4CH9kg==",
      "cpu": [
        "riscv64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-s390x": {
      "version": "0.25.9",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-s390x/-/linux-s390x-0.25.9.tgz",
      "integrity": "sha512-Mfiphvp3MjC/lctb+7D287Xw1DGzqJPb/J2aHHcHxflUo+8tmN/6d4k6I2yFR7BVo5/g7x2Monq4+Yew0EHRIA==",
      "cpu": [
        "s390x"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-x64": {
      "version": "0.25.9",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-x64/-/linux-x64-0.25.9.tgz",
      "integrity": "sha512-iSwByxzRe48YVkmpbgoxVzn76BXjlYFXC7NvLYq+b+kDjyyk30J0JY47DIn8z1MO3K0oSl9fZoRmZPQI4Hklzg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/netbsd-arm64": {
      "version": "0.25.9",
      "resolved": "https://registry.npmjs.org/@esbuild/netbsd-arm64/-/netbsd-arm64-0.25.9.tgz",
      "integrity": "sha512-9jNJl6FqaUG+COdQMjSCGW4QiMHH88xWbvZ+kRVblZsWrkXlABuGdFJ1E9L7HK+T0Yqd4akKNa/lO0+jDxQD4Q==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "netbsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/netbsd-x64": {
      "version": "0.25.9",
      "resolved": "https://registry.npmjs.org/@esbuild/netbsd-x64/-/netbsd-x64-0.25.9.tgz",
      "integrity": "sha512-RLLdkflmqRG8KanPGOU7Rpg829ZHu8nFy5Pqdi9U01VYtG9Y0zOG6Vr2z4/S+/3zIyOxiK6cCeYNWOFR9QP87g==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "netbsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/openbsd-arm64": {
      "version": "0.25.9",
      "resolved": "https://registry.npmjs.org/@esbuild/openbsd-arm64/-/openbsd-arm64-0.25.9.tgz",
      "integrity": "sha512-YaFBlPGeDasft5IIM+CQAhJAqS3St3nJzDEgsgFixcfZeyGPCd6eJBWzke5piZuZ7CtL656eOSYKk4Ls2C0FRQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "openbsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/openbsd-x64": {
      "version": "0.25.9",
      "resolved": "https://registry.npmjs.org/@esbuild/openbsd-x64/-/openbsd-x64-0.25.9.tgz",
      "integrity": "sha512-1MkgTCuvMGWuqVtAvkpkXFmtL8XhWy+j4jaSO2wxfJtilVCi0ZE37b8uOdMItIHz4I6z1bWWtEX4CJwcKYLcuA==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "openbsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/openharmony-arm64": {
      "version": "0.25.9",
      "resolved": "https://registry.npmjs.org/@esbuild/openharmony-arm64/-/openharmony-arm64-0.25.9.tgz",
      "integrity": "sha512-4Xd0xNiMVXKh6Fa7HEJQbrpP3m3DDn43jKxMjxLLRjWnRsfxjORYJlXPO4JNcXtOyfajXorRKY9NkOpTHptErg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "openharmony"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/sunos-x64": {
      "version": "0.25.9",
      "resolved": "https://registry.npmjs.org/@esbuild/sunos-x64/-/sunos-x64-0.25.9.tgz",
      "integrity": "sha512-WjH4s6hzo00nNezhp3wFIAfmGZ8U7KtrJNlFMRKxiI9mxEK1scOMAaa9i4crUtu+tBr+0IN6JCuAcSBJZfnphw==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "sunos"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/win32-arm64": {
      "version": "0.25.9",
      "resolved": "https://registry.npmjs.org/@esbuild/win32-arm64/-/win32-arm64-0.25.9.tgz",
      "integrity": "sha512-mGFrVJHmZiRqmP8xFOc6b84/7xa5y5YvR1x8djzXpJBSv/UsNK6aqec+6JDjConTgvvQefdGhFDAs2DLAds6gQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/win32-ia32": {
      "version": "0.25.9",
      "resolved": "https://registry.npmjs.org/@esbuild/win32-ia32/-/win32-ia32-0.25.9.tgz",
      "integrity": "sha512-b33gLVU2k11nVx1OhX3C8QQP6UHQK4ZtN56oFWvVXvz2VkDoe6fbG8TOgHFxEvqeqohmRnIHe5A1+HADk4OQww==",
      "cpu": [
        "ia32"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/win32-x64": {
      "version": "0.25.9",
      "resolved": "https://registry.npmjs.org/@esbuild/win32-x64/-/win32-x64-0.25.9.tgz",
      "integrity": "sha512-PPOl1mi6lpLNQxnGoyAfschAodRFYXJ+9fs6WHXz7CSWKbOqiMZsubC+BQsVKuul+3vKLuwTHsS2c2y9EoKwxQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@inquirer/ansi": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/@inquirer/ansi/-/ansi-1.0.1.tgz",
      "integrity": "sha512-yqq0aJW/5XPhi5xOAL1xRCpe1eh8UFVgYFpFsjEqmIR8rKLyP+HINvFXwUaxYICflJrVlxnp7lLN6As735kVpw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@inquirer/checkbox": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/@inquirer/checkbox/-/checkbox-4.3.0.tgz",
      "integrity": "sha512-5+Q3PKH35YsnoPTh75LucALdAxom6xh5D1oeY561x4cqBuH24ZFVyFREPe14xgnrtmGu3EEt1dIi60wRVSnGCw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@inquirer/ansi": "^1.0.1",
        "@inquirer/core": "^10.3.0",
        "@inquirer/figures": "^1.0.14",
        "@inquirer/type": "^3.0.9",
        "yoctocolors-cjs": "^2.1.2"
      },
      "engines": {
        "node": ">=18"
      },
      "peerDependencies": {
        "@types/node": ">=18"
      },
      "peerDependenciesMeta": {
        "@types/node": {
          "optional": true
        }
      }
    },
    "node_modules/@inquirer/confirm": {
      "version": "5.1.14",
      "resolved": "https://registry.npmjs.org/@inquirer/confirm/-/confirm-5.1.14.tgz",
      "integrity": "sha512-5yR4IBfe0kXe59r1YCTG8WXkUbl7Z35HK87Sw+WUyGD8wNUx7JvY7laahzeytyE1oLn74bQnL7hstctQxisQ8Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@inquirer/core": "^10.1.15",
        "@inquirer/type": "^3.0.8"
      },
      "engines": {
        "node": ">=18"
      },
      "peerDependencies": {
        "@types/node": ">=18"
      },
      "peerDependenciesMeta": {
        "@types/node": {
          "optional": true
        }
      }
    },
    "node_modules/@inquirer/core": {
      "version": "10.3.0",
      "resolved": "https://registry.npmjs.org/@inquirer/core/-/core-10.3.0.tgz",
      "integrity": "sha512-Uv2aPPPSK5jeCplQmQ9xadnFx2Zhj9b5Dj7bU6ZeCdDNNY11nhYy4btcSdtDguHqCT2h5oNeQTcUNSGGLA7NTA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@inquirer/ansi": "^1.0.1",
        "@inquirer/figures": "^1.0.14",
        "@inquirer/type": "^3.0.9",
        "cli-width": "^4.1.0",
        "mute-stream": "^2.0.0",
        "signal-exit": "^4.1.0",
        "wrap-ansi": "^6.2.0",
        "yoctocolors-cjs": "^2.1.2"
      },
      "engines": {
        "node": ">=18"
      },
      "peerDependencies": {
        "@types/node": ">=18"
      },
      "peerDependenciesMeta": {
        "@types/node": {
          "optional": true
        }
      }
    },
    "node_modules/@inquirer/editor": {
      "version": "4.2.21",
      "resolved": "https://registry.npmjs.org/@inquirer/editor/-/editor-4.2.21.tgz",
      "integrity": "sha512-MjtjOGjr0Kh4BciaFShYpZ1s9400idOdvQ5D7u7lE6VztPFoyLcVNE5dXBmEEIQq5zi4B9h2kU+q7AVBxJMAkQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@inquirer/core": "^10.3.0",
        "@inquirer/external-editor": "^1.0.2",
        "@inquirer/type": "^3.0.9"
      },
      "engines": {
        "node": ">=18"
      },
      "peerDependencies": {
        "@types/node": ">=18"
      },
      "peerDependenciesMeta": {
        "@types/node": {
          "optional": true
        }
      }
    },
    "node_modules/@inquirer/expand": {
      "version": "4.0.21",
      "resolved": "https://registry.npmjs.org/@inquirer/expand/-/expand-4.0.21.tgz",
      "integrity": "sha512-+mScLhIcbPFmuvU3tAGBed78XvYHSvCl6dBiYMlzCLhpr0bzGzd8tfivMMeqND6XZiaZ1tgusbUHJEfc6YzOdA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@inquirer/core": "^10.3.0",
        "@inquirer/type": "^3.0.9",
        "yoctocolors-cjs": "^2.1.2"
      },
      "engines": {
        "node": ">=18"
      },
      "peerDependencies": {
        "@types/node": ">=18"
      },
      "peerDependenciesMeta": {
        "@types/node": {
          "optional": true
        }
      }
    },
    "node_modules/@inquirer/external-editor": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/@inquirer/external-editor/-/external-editor-1.0.2.tgz",
      "integrity": "sha512-yy9cOoBnx58TlsPrIxauKIFQTiyH+0MK4e97y4sV9ERbI+zDxw7i2hxHLCIEGIE/8PPvDxGhgzIOTSOWcs6/MQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "chardet": "^2.1.0",
        "iconv-lite": "^0.7.0"
      },
      "engines": {
        "node": ">=18"
      },
      "peerDependencies": {
        "@types/node": ">=18"
      },
      "peerDependenciesMeta": {
        "@types/node": {
          "optional": true
        }
      }
    },
    "node_modules/@inquirer/figures": {
      "version": "1.0.14",
      "resolved": "https://registry.npmjs.org/@inquirer/figures/-/figures-1.0.14.tgz",
      "integrity": "sha512-DbFgdt+9/OZYFM+19dbpXOSeAstPy884FPy1KjDu4anWwymZeOYhMY1mdFri172htv6mvc/uvIAAi7b7tvjJBQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@inquirer/input": {
      "version": "4.2.5",
      "resolved": "https://registry.npmjs.org/@inquirer/input/-/input-4.2.5.tgz",
      "integrity": "sha512-7GoWev7P6s7t0oJbenH0eQ0ThNdDJbEAEtVt9vsrYZ9FulIokvd823yLyhQlWHJPGce1wzP53ttfdCZmonMHyA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@inquirer/core": "^10.3.0",
        "@inquirer/type": "^3.0.9"
      },
      "engines": {
        "node": ">=18"
      },
      "peerDependencies": {
        "@types/node": ">=18"
      },
      "peerDependenciesMeta": {
        "@types/node": {
          "optional": true
        }
      }
    },
    "node_modules/@inquirer/number": {
      "version": "3.0.21",
      "resolved": "https://registry.npmjs.org/@inquirer/number/-/number-3.0.21.tgz",
      "integrity": "sha512-5QWs0KGaNMlhbdhOSCFfKsW+/dcAVC2g4wT/z2MCiZM47uLgatC5N20kpkDQf7dHx+XFct/MJvvNGy6aYJn4Pw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@inquirer/core": "^10.3.0",
        "@inquirer/type": "^3.0.9"
      },
      "engines": {
        "node": ">=18"
      },
      "peerDependencies": {
        "@types/node": ">=18"
      },
      "peerDependenciesMeta": {
        "@types/node": {
          "optional": true
        }
      }
    },
    "node_modules/@inquirer/password": {
      "version": "4.0.21",
      "resolved": "https://registry.npmjs.org/@inquirer/password/-/password-4.0.21.tgz",
      "integrity": "sha512-xxeW1V5SbNFNig2pLfetsDb0svWlKuhmr7MPJZMYuDnCTkpVBI+X/doudg4pznc1/U+yYmWFFOi4hNvGgUo7EA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@inquirer/ansi": "^1.0.1",
        "@inquirer/core": "^10.3.0",
        "@inquirer/type": "^3.0.9"
      },
      "engines": {
        "node": ">=18"
      },
      "peerDependencies": {
        "@types/node": ">=18"
      },
      "peerDependenciesMeta": {
        "@types/node": {
          "optional": true
        }
      }
    },
    "node_modules/@inquirer/prompts": {
      "version": "7.8.2",
      "resolved": "https://registry.npmjs.org/@inquirer/prompts/-/prompts-7.8.2.tgz",
      "integrity": "sha512-nqhDw2ZcAUrKNPwhjinJny903bRhI0rQhiDz1LksjeRxqa36i3l75+4iXbOy0rlDpLJGxqtgoPavQjmmyS5UJw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@inquirer/checkbox": "^4.2.1",
        "@inquirer/confirm": "^5.1.14",
        "@inquirer/editor": "^4.2.17",
        "@inquirer/expand": "^4.0.17",
        "@inquirer/input": "^4.2.1",
        "@inquirer/number": "^3.0.17",
        "@inquirer/password": "^4.0.17",
        "@inquirer/rawlist": "^4.1.5",
        "@inquirer/search": "^3.1.0",
        "@inquirer/select": "^4.3.1"
      },
      "engines": {
        "node": ">=18"
      },
      "peerDependencies": {
        "@types/node": ">=18"
      },
      "peerDependenciesMeta": {
        "@types/node": {
          "optional": true
        }
      }
    },
    "node_modules/@inquirer/rawlist": {
      "version": "4.1.9",
      "resolved": "https://registry.npmjs.org/@inquirer/rawlist/-/rawlist-4.1.9.tgz",
      "integrity": "sha512-AWpxB7MuJrRiSfTKGJ7Y68imYt8P9N3Gaa7ySdkFj1iWjr6WfbGAhdZvw/UnhFXTHITJzxGUI9k8IX7akAEBCg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@inquirer/core": "^10.3.0",
        "@inquirer/type": "^3.0.9",
        "yoctocolors-cjs": "^2.1.2"
      },
      "engines": {
        "node": ">=18"
      },
      "peerDependencies": {
        "@types/node": ">=18"
      },
      "peerDependenciesMeta": {
        "@types/node": {
          "optional": true
        }
      }
    },
    "node_modules/@inquirer/search": {
      "version": "3.2.0",
      "resolved": "https://registry.npmjs.org/@inquirer/search/-/search-3.2.0.tgz",
      "integrity": "sha512-a5SzB/qrXafDX1Z4AZW3CsVoiNxcIYCzYP7r9RzrfMpaLpB+yWi5U8BWagZyLmwR0pKbbL5umnGRd0RzGVI8bQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@inquirer/core": "^10.3.0",
        "@inquirer/figures": "^1.0.14",
        "@inquirer/type": "^3.0.9",
        "yoctocolors-cjs": "^2.1.2"
      },
      "engines": {
        "node": ">=18"
      },
      "peerDependencies": {
        "@types/node": ">=18"
      },
      "peerDependenciesMeta": {
        "@types/node": {
          "optional": true
        }
      }
    },
    "node_modules/@inquirer/select": {
      "version": "4.4.0",
      "resolved": "https://registry.npmjs.org/@inquirer/select/-/select-4.4.0.tgz",
      "integrity": "sha512-kaC3FHsJZvVyIjYBs5Ih8y8Bj4P/QItQWrZW22WJax7zTN+ZPXVGuOM55vzbdCP9zKUiBd9iEJVdesujfF+cAA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@inquirer/ansi": "^1.0.1",
        "@inquirer/core": "^10.3.0",
        "@inquirer/figures": "^1.0.14",
        "@inquirer/type": "^3.0.9",
        "yoctocolors-cjs": "^2.1.2"
      },
      "engines": {
        "node": ">=18"
      },
      "peerDependencies": {
        "@types/node": ">=18"
      },
      "peerDependenciesMeta": {
        "@types/node": {
          "optional": true
        }
      }
    },
    "node_modules/@inquirer/type": {
      "version": "3.0.9",
      "resolved": "https://registry.npmjs.org/@inquirer/type/-/type-3.0.9.tgz",
      "integrity": "sha512-QPaNt/nmE2bLGQa9b7wwyRJoLZ7pN6rcyXvzU0YCmivmJyq1BVo94G98tStRWkoD1RgDX5C+dPlhhHzNdu/W/w==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "peerDependencies": {
        "@types/node": ">=18"
      },
      "peerDependenciesMeta": {
        "@types/node": {
          "optional": true
        }
      }
    },
    "node_modules/@ionic/angular": {
      "version": "8.7.7",
      "resolved": "https://registry.npmjs.org/@ionic/angular/-/angular-8.7.7.tgz",
      "integrity": "sha512-59BiojJKNbUI9K4lkK1olgEhuFqErjFjIrDXJJmic1LlGfYzkZJzObf0KtTxqwbWPlBzz9ybi4+N0EATFNBmZw==",
      "license": "MIT",
      "dependencies": {
        "@ionic/core": "8.7.7",
        "ionicons": "^8.0.13",
        "jsonc-parser": "^3.0.0",
        "tslib": "^2.3.0"
      },
      "peerDependencies": {
        "@angular/core": ">=16.0.0",
        "@angular/forms": ">=16.0.0",
        "@angular/router": ">=16.0.0",
        "rxjs": ">=7.5.0",
        "zone.js": ">=0.13.0"
      }
    },
    "node_modules/@ionic/core": {
      "version": "8.7.7",
      "resolved": "https://registry.npmjs.org/@ionic/core/-/core-8.7.7.tgz",
      "integrity": "sha512-XMvVkiRiB9I1Jc63RqderjHzxxiyr6KM2vBDzYBQS6rk7Fb4wC/ZyUuFgnrYKk71r1mgwYTPMy/2qrCShNXgXQ==",
      "license": "MIT",
      "dependencies": {
        "@stencil/core": "4.38.0",
        "ionicons": "^8.0.13",
        "tslib": "^2.1.0"
      }
    },
    "node_modules/@isaacs/balanced-match": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/@isaacs/balanced-match/-/balanced-match-4.0.1.tgz",
      "integrity": "sha512-yzMTt9lEb8Gv7zRioUilSglI0c0smZ9k5D65677DLWLtWJaXIS3CqcGyUFByYKlnUj6TkjLVs54fBl6+TiGQDQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "20 || >=22"
      }
    },
    "node_modules/@isaacs/brace-expansion": {
      "version": "5.0.0",
      "resolved": "https://registry.npmjs.org/@isaacs/brace-expansion/-/brace-expansion-5.0.0.tgz",
      "integrity": "sha512-ZT55BDLV0yv0RBm2czMiZ+SqCGO7AvmOM3G/w2xhVPH+te0aKgFjmBvGlL1dH+ql2tgGO3MVrbb3jCKyvpgnxA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@isaacs/balanced-match": "^4.0.1"
      },
      "engines": {
        "node": "20 || >=22"
      }
    },
    "node_modules/@isaacs/cliui": {
      "version": "8.0.2",
      "resolved": "https://registry.npmjs.org/@isaacs/cliui/-/cliui-8.0.2.tgz",
      "integrity": "sha512-O8jcjabXaleOG9DQ0+ARXWZBTfnP4WNAqzuiJK7ll44AmxGKv/J2M4TPjxjY3znBCfvBXFzucm1twdyFybFqEA==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "string-width": "^5.1.2",
        "string-width-cjs": "npm:string-width@^4.2.0",
        "strip-ansi": "^7.0.1",
        "strip-ansi-cjs": "npm:strip-ansi@^6.0.1",
        "wrap-ansi": "^8.1.0",
        "wrap-ansi-cjs": "npm:wrap-ansi@^7.0.0"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@isaacs/cliui/node_modules/emoji-regex": {
      "version": "9.2.2",
      "resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-9.2.2.tgz",
      "integrity": "sha512-L18DaJsXSUk2+42pv8mLs5jJT2hqFkFE4j21wOmgbUqsZ2hL72NsUU785g9RXgo3s0ZNgVl42TiHp3ZtOv/Vyg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@isaacs/cliui/node_modules/string-width": {
      "version": "5.1.2",
      "resolved": "https://registry.npmjs.org/string-width/-/string-width-5.1.2.tgz",
      "integrity": "sha512-HnLOCR3vjcY8beoNLtcjZ5/nxn2afmME6lhrDrebokqMap+XbeW8n9TXpPDOqdGK5qcI3oT0GKTW6wC7EMiVqA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "eastasianwidth": "^0.2.0",
        "emoji-regex": "^9.2.2",
        "strip-ansi": "^7.0.1"
      },
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/@isaacs/cliui/node_modules/wrap-ansi": {
      "version": "8.1.0",
      "resolved": "https://registry.npmjs.org/wrap-ansi/-/wrap-ansi-8.1.0.tgz",
      "integrity": "sha512-si7QWI6zUMq56bESFvagtmzMdGOtoxfR+Sez11Mobfc7tm+VkUckk9bW2UeffTGVUbOksxmSw0AA2gs8g71NCQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ansi-styles": "^6.1.0",
        "string-width": "^5.0.1",
        "strip-ansi": "^7.0.1"
      },
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/chalk/wrap-ansi?sponsor=1"
      }
    },
    "node_modules/@isaacs/fs-minipass": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/@isaacs/fs-minipass/-/fs-minipass-4.0.1.tgz",
      "integrity": "sha512-wgm9Ehl2jpeqP3zw/7mo3kRHFp5MEDhqAdwy1fTGkHAwnkGOVsgpvQhL8B5n1qlb01jV3n/bI0ZfZp5lWA1k4w==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "minipass": "^7.0.4"
      },
      "engines": {
        "node": ">=18.0.0"
      }
    },
    "node_modules/@istanbuljs/schema": {
      "version": "0.1.3",
      "resolved": "https://registry.npmjs.org/@istanbuljs/schema/-/schema-0.1.3.tgz",
      "integrity": "sha512-ZXRY4jNvVgSVQ8DL3LTcakaAtXwTVUxE81hslsyD2AtoXW/wVob10HkOJ1X/pAlcI7D+2YoZKg5do8G/w6RYgA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/@jridgewell/gen-mapping": {
      "version": "0.3.13",
      "resolved": "https://registry.npmjs.org/@jridgewell/gen-mapping/-/gen-mapping-0.3.13.tgz",
      "integrity": "sha512-2kkt/7niJ6MgEPxF0bYdQ6etZaA+fQvDcLKckhy1yIQOzaoKjBBjSj63/aLVjYE3qhRt5dvM+uUyfCg6UKCBbA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/sourcemap-codec": "^1.5.0",
        "@jridgewell/trace-mapping": "^0.3.24"
      }
    },
    "node_modules/@jridgewell/resolve-uri": {
      "version": "3.1.2",
      "resolved": "https://registry.npmjs.org/@jridgewell/resolve-uri/-/resolve-uri-3.1.2.tgz",
      "integrity": "sha512-bRISgCIjP20/tbWSPWMEi54QVPRZExkuD9lJL+UIxUKtwVJA8wW1Trb1jMs1RFXo1CBTNZ/5hpC9QvmKWdopKw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/@jridgewell/source-map": {
      "version": "0.3.11",
      "resolved": "https://registry.npmjs.org/@jridgewell/source-map/-/source-map-0.3.11.tgz",
      "integrity": "sha512-ZMp1V8ZFcPG5dIWnQLr3NSI1MiCU7UETdS/A0G8V/XWHvJv3ZsFqutJn1Y5RPmAPX6F3BiE397OqveU/9NCuIA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/gen-mapping": "^0.3.5",
        "@jridgewell/trace-mapping": "^0.3.25"
      }
    },
    "node_modules/@jridgewell/sourcemap-codec": {
      "version": "1.5.5",
      "resolved": "https://registry.npmjs.org/@jridgewell/sourcemap-codec/-/sourcemap-codec-1.5.5.tgz",
      "integrity": "sha512-cYQ9310grqxueWbl+WuIUIaiUaDcj7WOq5fVhEljNVgRfOUhY9fy2zTvfoqWsnebh8Sl70VScFbICvJnLKB0Og==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@jridgewell/trace-mapping": {
      "version": "0.3.31",
      "resolved": "https://registry.npmjs.org/@jridgewell/trace-mapping/-/trace-mapping-0.3.31.tgz",
      "integrity": "sha512-zzNR+SdQSDJzc8joaeP8QQoCQr8NuYx2dIIytl1QeBEZHJ9uW6hebsrYgbz8hJwUQao3TWCMtmfV8Nu1twOLAw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/resolve-uri": "^3.1.0",
        "@jridgewell/sourcemap-codec": "^1.4.14"
      }
    },
    "node_modules/@jsonjoy.com/base64": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/@jsonjoy.com/base64/-/base64-1.1.2.tgz",
      "integrity": "sha512-q6XAnWQDIMA3+FTiOYajoYqySkO+JSat0ytXGSuRdq9uXE7o92gzuQwQM14xaCRlBLGq3v5miDGC4vkVTn54xA==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": ">=10.0"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/streamich"
      },
      "peerDependencies": {
        "tslib": "2"
      }
    },
    "node_modules/@jsonjoy.com/buffers": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/@jsonjoy.com/buffers/-/buffers-1.2.1.tgz",
      "integrity": "sha512-12cdlDwX4RUM3QxmUbVJWqZ/mrK6dFQH4Zxq6+r1YXKXYBNgZXndx2qbCJwh3+WWkCSn67IjnlG3XYTvmvYtgA==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": ">=10.0"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/streamich"
      },
      "peerDependencies": {
        "tslib": "2"
      }
    },
    "node_modules/@jsonjoy.com/codegen": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/@jsonjoy.com/codegen/-/codegen-1.0.0.tgz",
      "integrity": "sha512-E8Oy+08cmCf0EK/NMxpaJZmOxPqM+6iSe2S4nlSBrPZOORoDJILxtbSUEDKQyTamm/BVAhIGllOBNU79/dwf0g==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": ">=10.0"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/streamich"
      },
      "peerDependencies": {
        "tslib": "2"
      }
    },
    "node_modules/@jsonjoy.com/json-pack": {
      "version": "1.21.0",
      "resolved": "https://registry.npmjs.org/@jsonjoy.com/json-pack/-/json-pack-1.21.0.tgz",
      "integrity": "sha512-+AKG+R2cfZMShzrF2uQw34v3zbeDYUqnQ+jg7ORic3BGtfw9p/+N6RJbq/kkV8JmYZaINknaEQ2m0/f693ZPpg==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@jsonjoy.com/base64": "^1.1.2",
        "@jsonjoy.com/buffers": "^1.2.0",
        "@jsonjoy.com/codegen": "^1.0.0",
        "@jsonjoy.com/json-pointer": "^1.0.2",
        "@jsonjoy.com/util": "^1.9.0",
        "hyperdyperid": "^1.2.0",
        "thingies": "^2.5.0",
        "tree-dump": "^1.1.0"
      },
      "engines": {
        "node": ">=10.0"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/streamich"
      },
      "peerDependencies": {
        "tslib": "2"
      }
    },
    "node_modules/@jsonjoy.com/json-pointer": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/@jsonjoy.com/json-pointer/-/json-pointer-1.0.2.tgz",
      "integrity": "sha512-Fsn6wM2zlDzY1U+v4Nc8bo3bVqgfNTGcn6dMgs6FjrEnt4ZCe60o6ByKRjOGlI2gow0aE/Q41QOigdTqkyK5fg==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@jsonjoy.com/codegen": "^1.0.0",
        "@jsonjoy.com/util": "^1.9.0"
      },
      "engines": {
        "node": ">=10.0"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/streamich"
      },
      "peerDependencies": {
        "tslib": "2"
      }
    },
    "node_modules/@jsonjoy.com/util": {
      "version": "1.9.0",
      "resolved": "https://registry.npmjs.org/@jsonjoy.com/util/-/util-1.9.0.tgz",
      "integrity": "sha512-pLuQo+VPRnN8hfPqUTLTHk126wuYdXVxE6aDmjSeV4NCAgyxWbiOIeNJVtID3h1Vzpoi9m4jXezf73I6LgabgQ==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@jsonjoy.com/buffers": "^1.0.0",
        "@jsonjoy.com/codegen": "^1.0.0"
      },
      "engines": {
        "node": ">=10.0"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/streamich"
      },
      "peerDependencies": {
        "tslib": "2"
      }
    },
    "node_modules/@leichtgewicht/ip-codec": {
      "version": "2.0.5",
      "resolved": "https://registry.npmjs.org/@leichtgewicht/ip-codec/-/ip-codec-2.0.5.tgz",
      "integrity": "sha512-Vo+PSpZG2/fmgmiNzYK9qWRh8h/CHrwD0mo1h1DzL4yzHNSfWYujGTYsWGreD000gcgmZ7K4Ys6Tx9TxtsKdDw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@listr2/prompt-adapter-inquirer": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/@listr2/prompt-adapter-inquirer/-/prompt-adapter-inquirer-3.0.1.tgz",
      "integrity": "sha512-3XFmGwm3u6ioREG+ynAQB7FoxfajgQnMhIu8wC5eo/Lsih4aKDg0VuIMGaOsYn7hJSJagSeaD4K8yfpkEoDEmA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@inquirer/type": "^3.0.7"
      },
      "engines": {
        "node": ">=20.0.0"
      },
      "peerDependencies": {
        "@inquirer/prompts": ">= 3 < 8",
        "listr2": "9.0.1"
      }
    },
    "node_modules/@lmdb/lmdb-darwin-arm64": {
      "version": "3.4.2",
      "resolved": "https://registry.npmjs.org/@lmdb/lmdb-darwin-arm64/-/lmdb-darwin-arm64-3.4.2.tgz",
      "integrity": "sha512-NK80WwDoODyPaSazKbzd3NEJ3ygePrkERilZshxBViBARNz21rmediktGHExoj9n5t9+ChlgLlxecdFKLCuCKg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ]
    },
    "node_modules/@lmdb/lmdb-darwin-x64": {
      "version": "3.4.2",
      "resolved": "https://registry.npmjs.org/@lmdb/lmdb-darwin-x64/-/lmdb-darwin-x64-3.4.2.tgz",
      "integrity": "sha512-zevaowQNmrp3U7Fz1s9pls5aIgpKRsKb3dZWDINtLiozh3jZI9fBrI19lYYBxqdyiIyNdlyiidPnwPShj4aK+w==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ]
    },
    "node_modules/@lmdb/lmdb-linux-arm": {
      "version": "3.4.2",
      "resolved": "https://registry.npmjs.org/@lmdb/lmdb-linux-arm/-/lmdb-linux-arm-3.4.2.tgz",
      "integrity": "sha512-OmHCULY17rkx/RoCoXlzU7LyR8xqrksgdYWwtYa14l/sseezZ8seKWXcogHcjulBddER5NnEFV4L/Jtr2nyxeg==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@lmdb/lmdb-linux-arm64": {
      "version": "3.4.2",
      "resolved": "https://registry.npmjs.org/@lmdb/lmdb-linux-arm64/-/lmdb-linux-arm64-3.4.2.tgz",
      "integrity": "sha512-ZBEfbNZdkneebvZs98Lq30jMY8V9IJzckVeigGivV7nTHJc+89Ctomp1kAIWKlwIG0ovCDrFI448GzFPORANYg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@lmdb/lmdb-linux-x64": {
      "version": "3.4.2",
      "resolved": "https://registry.npmjs.org/@lmdb/lmdb-linux-x64/-/lmdb-linux-x64-3.4.2.tgz",
      "integrity": "sha512-vL9nM17C77lohPYE4YaAQvfZCSVJSryE4fXdi8M7uWPBnU+9DJabgKVAeyDb84ZM2vcFseoBE4/AagVtJeRE7g==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@lmdb/lmdb-win32-arm64": {
      "version": "3.4.2",
      "resolved": "https://registry.npmjs.org/@lmdb/lmdb-win32-arm64/-/lmdb-win32-arm64-3.4.2.tgz",
      "integrity": "sha512-SXWjdBfNDze4ZPeLtYIzsIeDJDJ/SdsA0pEXcUBayUIMO0FQBHfVZZyHXQjjHr4cvOAzANBgIiqaXRwfMhzmLw==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@lmdb/lmdb-win32-x64": {
      "version": "3.4.2",
      "resolved": "https://registry.npmjs.org/@lmdb/lmdb-win32-x64/-/lmdb-win32-x64-3.4.2.tgz",
      "integrity": "sha512-IY+r3bxKW6Q6sIPiMC0L533DEfRJSXibjSI3Ft/w9Q8KQBNqEIvUFXt+09wV8S5BRk0a8uSF19YWxuRwEfI90g==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@modelcontextprotocol/sdk": {
      "version": "1.17.3",
      "resolved": "https://registry.npmjs.org/@modelcontextprotocol/sdk/-/sdk-1.17.3.tgz",
      "integrity": "sha512-JPwUKWSsbzx+DLFznf/QZ32Qa+ptfbUlHhRLrBQBAFu9iI1iYvizM4p+zhhRDceSsPutXp4z+R/HPVphlIiclg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ajv": "^6.12.6",
        "content-type": "^1.0.5",
        "cors": "^2.8.5",
        "cross-spawn": "^7.0.5",
        "eventsource": "^3.0.2",
        "eventsource-parser": "^3.0.0",
        "express": "^5.0.1",
        "express-rate-limit": "^7.5.0",
        "pkce-challenge": "^5.0.0",
        "raw-body": "^3.0.0",
        "zod": "^3.23.8",
        "zod-to-json-schema": "^3.24.1"
      },
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@modelcontextprotocol/sdk/node_modules/accepts": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/accepts/-/accepts-2.0.0.tgz",
      "integrity": "sha512-5cvg6CtKwfgdmVqY1WIiXKc3Q1bkRqGLi+2W/6ao+6Y7gu/RCwRuAhGEzh5B4KlszSuTLgZYuqFqo5bImjNKng==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "mime-types": "^3.0.0",
        "negotiator": "^1.0.0"
      },
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/@modelcontextprotocol/sdk/node_modules/ajv": {
      "version": "6.12.6",
      "resolved": "https://registry.npmjs.org/ajv/-/ajv-6.12.6.tgz",
      "integrity": "sha512-j3fVLgvTo527anyYyJOGTYJbG+vnnQYvE0m5mmkc1TK+nxAppkCLMIL0aZ4dblVCNoGShhm+kzE4ZUykBoMg4g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "fast-deep-equal": "^3.1.1",
        "fast-json-stable-stringify": "^2.0.0",
        "json-schema-traverse": "^0.4.1",
        "uri-js": "^4.2.2"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/epoberezkin"
      }
    },
    "node_modules/@modelcontextprotocol/sdk/node_modules/body-parser": {
      "version": "2.2.0",
      "resolved": "https://registry.npmjs.org/body-parser/-/body-parser-2.2.0.tgz",
      "integrity": "sha512-02qvAaxv8tp7fBa/mw1ga98OGm+eCbqzJOKoRt70sLmfEEi+jyBYVTDGfCL/k06/4EMk/z01gCe7HoCH/f2LTg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "bytes": "^3.1.2",
        "content-type": "^1.0.5",
        "debug": "^4.4.0",
        "http-errors": "^2.0.0",
        "iconv-lite": "^0.6.3",
        "on-finished": "^2.4.1",
        "qs": "^6.14.0",
        "raw-body": "^3.0.0",
        "type-is": "^2.0.0"
      },
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@modelcontextprotocol/sdk/node_modules/content-disposition": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/content-disposition/-/content-disposition-1.0.0.tgz",
      "integrity": "sha512-Au9nRL8VNUut/XSzbQA38+M78dzP4D+eqg3gfJHMIHHYa3bg067xj1KxMUWj+VULbiZMowKngFFbKczUrNJ1mg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "safe-buffer": "5.2.1"
      },
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/@modelcontextprotocol/sdk/node_modules/cookie-signature": {
      "version": "1.2.2",
      "resolved": "https://registry.npmjs.org/cookie-signature/-/cookie-signature-1.2.2.tgz",
      "integrity": "sha512-D76uU73ulSXrD1UXF4KE2TMxVVwhsnCgfAyTg9k8P6KGZjlXKrOLe4dJQKI3Bxi5wjesZoFXJWElNWBjPZMbhg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.6.0"
      }
    },
    "node_modules/@modelcontextprotocol/sdk/node_modules/express": {
      "version": "5.1.0",
      "resolved": "https://registry.npmjs.org/express/-/express-5.1.0.tgz",
      "integrity": "sha512-DT9ck5YIRU+8GYzzU5kT3eHGA5iL+1Zd0EutOmTE9Dtk+Tvuzd23VBU+ec7HPNSTxXYO55gPV/hq4pSBJDjFpA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "accepts": "^2.0.0",
        "body-parser": "^2.2.0",
        "content-disposition": "^1.0.0",
        "content-type": "^1.0.5",
        "cookie": "^0.7.1",
        "cookie-signature": "^1.2.1",
        "debug": "^4.4.0",
        "encodeurl": "^2.0.0",
        "escape-html": "^1.0.3",
        "etag": "^1.8.1",
        "finalhandler": "^2.1.0",
        "fresh": "^2.0.0",
        "http-errors": "^2.0.0",
        "merge-descriptors": "^2.0.0",
        "mime-types": "^3.0.0",
        "on-finished": "^2.4.1",
        "once": "^1.4.0",
        "parseurl": "^1.3.3",
        "proxy-addr": "^2.0.7",
        "qs": "^6.14.0",
        "range-parser": "^1.2.1",
        "router": "^2.2.0",
        "send": "^1.1.0",
        "serve-static": "^2.2.0",
        "statuses": "^2.0.1",
        "type-is": "^2.0.1",
        "vary": "^1.1.2"
      },
      "engines": {
        "node": ">= 18"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/@modelcontextprotocol/sdk/node_modules/finalhandler": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/finalhandler/-/finalhandler-2.1.0.tgz",
      "integrity": "sha512-/t88Ty3d5JWQbWYgaOGCCYfXRwV1+be02WqYYlL6h0lEiUAMPM8o8qKGO01YIkOHzka2up08wvgYD0mDiI+q3Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "debug": "^4.4.0",
        "encodeurl": "^2.0.0",
        "escape-html": "^1.0.3",
        "on-finished": "^2.4.1",
        "parseurl": "^1.3.3",
        "statuses": "^2.0.1"
      },
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/@modelcontextprotocol/sdk/node_modules/fresh": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/fresh/-/fresh-2.0.0.tgz",
      "integrity": "sha512-Rx/WycZ60HOaqLKAi6cHRKKI7zxWbJ31MhntmtwMoaTeF7XFH9hhBp8vITaMidfljRQ6eYWCKkaTK+ykVJHP2A==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/@modelcontextprotocol/sdk/node_modules/iconv-lite": {
      "version": "0.6.3",
      "resolved": "https://registry.npmjs.org/iconv-lite/-/iconv-lite-0.6.3.tgz",
      "integrity": "sha512-4fCk79wshMdzMp2rH06qWrJE4iolqLhCUH+OiuIgU++RB0+94NlDL81atO7GX55uUKueo0txHNtvEyI6D7WdMw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "safer-buffer": ">= 2.1.2 < 3.0.0"
      },
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/@modelcontextprotocol/sdk/node_modules/json-schema-traverse": {
      "version": "0.4.1",
      "resolved": "https://registry.npmjs.org/json-schema-traverse/-/json-schema-traverse-0.4.1.tgz",
      "integrity": "sha512-xbbCH5dCYU5T8LcEhhuh7HJ88HXuW3qsI3Y0zOZFKfZEHcpWiHU/Jxzk629Brsab/mMiHQti9wMP+845RPe3Vg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@modelcontextprotocol/sdk/node_modules/media-typer": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/media-typer/-/media-typer-1.1.0.tgz",
      "integrity": "sha512-aisnrDP4GNe06UcKFnV5bfMNPBUw4jsLGaWwWfnH3v02GnBuXX2MCVn5RbrWo0j3pczUilYblq7fQ7Nw2t5XKw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/@modelcontextprotocol/sdk/node_modules/merge-descriptors": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/merge-descriptors/-/merge-descriptors-2.0.0.tgz",
      "integrity": "sha512-Snk314V5ayFLhp3fkUREub6WtjBfPdCPY1Ln8/8munuLuiYhsABgBVWsozAG+MWMbVEvcdcpbi9R7ww22l9Q3g==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/@modelcontextprotocol/sdk/node_modules/mime-types": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/mime-types/-/mime-types-3.0.1.tgz",
      "integrity": "sha512-xRc4oEhT6eaBpU1XF7AjpOFD+xQmXNB5OVKwp4tqCuBpHLS/ZbBDrc07mYTDqVMg6PfxUjjNp85O6Cd2Z/5HWA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "mime-db": "^1.54.0"
      },
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/@modelcontextprotocol/sdk/node_modules/qs": {
      "version": "6.14.0",
      "resolved": "https://registry.npmjs.org/qs/-/qs-6.14.0.tgz",
      "integrity": "sha512-YWWTjgABSKcvs/nWBi9PycY/JiPJqOD4JA6o9Sej2AtvSGarXxKC3OQSk4pAarbdQlKAh5D4FCQkJNkW+GAn3w==",
      "dev": true,
      "license": "BSD-3-Clause",
      "dependencies": {
        "side-channel": "^1.1.0"
      },
      "engines": {
        "node": ">=0.6"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/@modelcontextprotocol/sdk/node_modules/send": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/send/-/send-1.2.0.tgz",
      "integrity": "sha512-uaW0WwXKpL9blXE2o0bRhoL2EGXIrZxQ2ZQ4mgcfoBxdFmQold+qWsD2jLrfZ0trjKL6vOw0j//eAwcALFjKSw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "debug": "^4.3.5",
        "encodeurl": "^2.0.0",
        "escape-html": "^1.0.3",
        "etag": "^1.8.1",
        "fresh": "^2.0.0",
        "http-errors": "^2.0.0",
        "mime-types": "^3.0.1",
        "ms": "^2.1.3",
        "on-finished": "^2.4.1",
        "range-parser": "^1.2.1",
        "statuses": "^2.0.1"
      },
      "engines": {
        "node": ">= 18"
      }
    },
    "node_modules/@modelcontextprotocol/sdk/node_modules/serve-static": {
      "version": "2.2.0",
      "resolved": "https://registry.npmjs.org/serve-static/-/serve-static-2.2.0.tgz",
      "integrity": "sha512-61g9pCh0Vnh7IutZjtLGGpTA355+OPn2TyDv/6ivP2h/AdAVX9azsoxmg2/M6nZeQZNYBEwIcsne1mJd9oQItQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "encodeurl": "^2.0.0",
        "escape-html": "^1.0.3",
        "parseurl": "^1.3.3",
        "send": "^1.2.0"
      },
      "engines": {
        "node": ">= 18"
      }
    },
    "node_modules/@modelcontextprotocol/sdk/node_modules/type-is": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/type-is/-/type-is-2.0.1.tgz",
      "integrity": "sha512-OZs6gsjF4vMp32qrCbiVSkrFmXtG/AZhY3t0iAMrMBiAZyV9oALtXO8hsrHbMXF9x6L3grlFuwW2oAz7cav+Gw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "content-type": "^1.0.5",
        "media-typer": "^1.1.0",
        "mime-types": "^3.0.0"
      },
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/@msgpackr-extract/msgpackr-extract-darwin-arm64": {
      "version": "3.0.3",
      "resolved": "https://registry.npmjs.org/@msgpackr-extract/msgpackr-extract-darwin-arm64/-/msgpackr-extract-darwin-arm64-3.0.3.tgz",
      "integrity": "sha512-QZHtlVgbAdy2zAqNA9Gu1UpIuI8Xvsd1v8ic6B2pZmeFnFcMWiPLfWXh7TVw4eGEZ/C9TH281KwhVoeQUKbyjw==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ]
    },
    "node_modules/@msgpackr-extract/msgpackr-extract-darwin-x64": {
      "version": "3.0.3",
      "resolved": "https://registry.npmjs.org/@msgpackr-extract/msgpackr-extract-darwin-x64/-/msgpackr-extract-darwin-x64-3.0.3.tgz",
      "integrity": "sha512-mdzd3AVzYKuUmiWOQ8GNhl64/IoFGol569zNRdkLReh6LRLHOXxU4U8eq0JwaD8iFHdVGqSy4IjFL4reoWCDFw==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ]
    },
    "node_modules/@msgpackr-extract/msgpackr-extract-linux-arm": {
      "version": "3.0.3",
      "resolved": "https://registry.npmjs.org/@msgpackr-extract/msgpackr-extract-linux-arm/-/msgpackr-extract-linux-arm-3.0.3.tgz",
      "integrity": "sha512-fg0uy/dG/nZEXfYilKoRe7yALaNmHoYeIoJuJ7KJ+YyU2bvY8vPv27f7UKhGRpY6euFYqEVhxCFZgAUNQBM3nw==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@msgpackr-extract/msgpackr-extract-linux-arm64": {
      "version": "3.0.3",
      "resolved": "https://registry.npmjs.org/@msgpackr-extract/msgpackr-extract-linux-arm64/-/msgpackr-extract-linux-arm64-3.0.3.tgz",
      "integrity": "sha512-YxQL+ax0XqBJDZiKimS2XQaf+2wDGVa1enVRGzEvLLVFeqa5kx2bWbtcSXgsxjQB7nRqqIGFIcLteF/sHeVtQg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@msgpackr-extract/msgpackr-extract-linux-x64": {
      "version": "3.0.3",
      "resolved": "https://registry.npmjs.org/@msgpackr-extract/msgpackr-extract-linux-x64/-/msgpackr-extract-linux-x64-3.0.3.tgz",
      "integrity": "sha512-cvwNfbP07pKUfq1uH+S6KJ7dT9K8WOE4ZiAcsrSes+UY55E/0jLYc+vq+DO7jlmqRb5zAggExKm0H7O/CBaesg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@msgpackr-extract/msgpackr-extract-win32-x64": {
      "version": "3.0.3",
      "resolved": "https://registry.npmjs.org/@msgpackr-extract/msgpackr-extract-win32-x64/-/msgpackr-extract-win32-x64-3.0.3.tgz",
      "integrity": "sha512-x0fWaQtYp4E6sktbsdAqnehxDgEc/VwM7uLsRCYWaiGu0ykYdZPiS8zCWdnjHwyiumousxfBm4SO31eXqwEZhQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@napi-rs/nice": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/@napi-rs/nice/-/nice-1.1.1.tgz",
      "integrity": "sha512-xJIPs+bYuc9ASBl+cvGsKbGrJmS6fAKaSZCnT0lhahT5rhA2VVy9/EcIgd2JhtEuFOJNx7UHNn/qiTPTY4nrQw==",
      "dev": true,
      "license": "MIT",
      "optional": true,
      "engines": {
        "node": ">= 10"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/Brooooooklyn"
      },
      "optionalDependencies": {
        "@napi-rs/nice-android-arm-eabi": "1.1.1",
        "@napi-rs/nice-android-arm64": "1.1.1",
        "@napi-rs/nice-darwin-arm64": "1.1.1",
        "@napi-rs/nice-darwin-x64": "1.1.1",
        "@napi-rs/nice-freebsd-x64": "1.1.1",
        "@napi-rs/nice-linux-arm-gnueabihf": "1.1.1",
        "@napi-rs/nice-linux-arm64-gnu": "1.1.1",
        "@napi-rs/nice-linux-arm64-musl": "1.1.1",
        "@napi-rs/nice-linux-ppc64-gnu": "1.1.1",
        "@napi-rs/nice-linux-riscv64-gnu": "1.1.1",
        "@napi-rs/nice-linux-s390x-gnu": "1.1.1",
        "@napi-rs/nice-linux-x64-gnu": "1.1.1",
        "@napi-rs/nice-linux-x64-musl": "1.1.1",
        "@napi-rs/nice-openharmony-arm64": "1.1.1",
        "@napi-rs/nice-win32-arm64-msvc": "1.1.1",
        "@napi-rs/nice-win32-ia32-msvc": "1.1.1",
        "@napi-rs/nice-win32-x64-msvc": "1.1.1"
      }
    },
    "node_modules/@napi-rs/nice-android-arm-eabi": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/@napi-rs/nice-android-arm-eabi/-/nice-android-arm-eabi-1.1.1.tgz",
      "integrity": "sha512-kjirL3N6TnRPv5iuHw36wnucNqXAO46dzK9oPb0wj076R5Xm8PfUVA9nAFB5ZNMmfJQJVKACAPd/Z2KYMppthw==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@napi-rs/nice-android-arm64": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/@napi-rs/nice-android-arm64/-/nice-android-arm64-1.1.1.tgz",
      "integrity": "sha512-blG0i7dXgbInN5urONoUCNf+DUEAavRffrO7fZSeoRMJc5qD+BJeNcpr54msPF6qfDD6kzs9AQJogZvT2KD5nw==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@napi-rs/nice-darwin-arm64": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/@napi-rs/nice-darwin-arm64/-/nice-darwin-arm64-1.1.1.tgz",
      "integrity": "sha512-s/E7w45NaLqTGuOjC2p96pct4jRfo61xb9bU1unM/MJ/RFkKlJyJDx7OJI/O0ll/hrfpqKopuAFDV8yo0hfT7A==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@napi-rs/nice-darwin-x64": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/@napi-rs/nice-darwin-x64/-/nice-darwin-x64-1.1.1.tgz",
      "integrity": "sha512-dGoEBnVpsdcC+oHHmW1LRK5eiyzLwdgNQq3BmZIav+9/5WTZwBYX7r5ZkQC07Nxd3KHOCkgbHSh4wPkH1N1LiQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@napi-rs/nice-freebsd-x64": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/@napi-rs/nice-freebsd-x64/-/nice-freebsd-x64-1.1.1.tgz",
      "integrity": "sha512-kHv4kEHAylMYmlNwcQcDtXjklYp4FCf0b05E+0h6nDHsZ+F0bDe04U/tXNOqrx5CmIAth4vwfkjjUmp4c4JktQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@napi-rs/nice-linux-arm-gnueabihf": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/@napi-rs/nice-linux-arm-gnueabihf/-/nice-linux-arm-gnueabihf-1.1.1.tgz",
      "integrity": "sha512-E1t7K0efyKXZDoZg1LzCOLxgolxV58HCkaEkEvIYQx12ht2pa8hoBo+4OB3qh7e+QiBlp1SRf+voWUZFxyhyqg==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@napi-rs/nice-linux-arm64-gnu": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/@napi-rs/nice-linux-arm64-gnu/-/nice-linux-arm64-gnu-1.1.1.tgz",
      "integrity": "sha512-CIKLA12DTIZlmTaaKhQP88R3Xao+gyJxNWEn04wZwC2wmRapNnxCUZkVwggInMJvtVElA+D4ZzOU5sX4jV+SmQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@napi-rs/nice-linux-arm64-musl": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/@napi-rs/nice-linux-arm64-musl/-/nice-linux-arm64-musl-1.1.1.tgz",
      "integrity": "sha512-+2Rzdb3nTIYZ0YJF43qf2twhqOCkiSrHx2Pg6DJaCPYhhaxbLcdlV8hCRMHghQ+EtZQWGNcS2xF4KxBhSGeutg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@napi-rs/nice-linux-ppc64-gnu": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/@napi-rs/nice-linux-ppc64-gnu/-/nice-linux-ppc64-gnu-1.1.1.tgz",
      "integrity": "sha512-4FS8oc0GeHpwvv4tKciKkw3Y4jKsL7FRhaOeiPei0X9T4Jd619wHNe4xCLmN2EMgZoeGg+Q7GY7BsvwKpL22Tg==",
      "cpu": [
        "ppc64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@napi-rs/nice-linux-riscv64-gnu": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/@napi-rs/nice-linux-riscv64-gnu/-/nice-linux-riscv64-gnu-1.1.1.tgz",
      "integrity": "sha512-HU0nw9uD4FO/oGCCk409tCi5IzIZpH2agE6nN4fqpwVlCn5BOq0MS1dXGjXaG17JaAvrlpV5ZeyZwSon10XOXw==",
      "cpu": [
        "riscv64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@napi-rs/nice-linux-s390x-gnu": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/@napi-rs/nice-linux-s390x-gnu/-/nice-linux-s390x-gnu-1.1.1.tgz",
      "integrity": "sha512-2YqKJWWl24EwrX0DzCQgPLKQBxYDdBxOHot1KWEq7aY2uYeX+Uvtv4I8xFVVygJDgf6/92h9N3Y43WPx8+PAgQ==",
      "cpu": [
        "s390x"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@napi-rs/nice-linux-x64-gnu": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/@napi-rs/nice-linux-x64-gnu/-/nice-linux-x64-gnu-1.1.1.tgz",
      "integrity": "sha512-/gaNz3R92t+dcrfCw/96pDopcmec7oCcAQ3l/M+Zxr82KT4DljD37CpgrnXV+pJC263JkW572pdbP3hP+KjcIg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@napi-rs/nice-linux-x64-musl": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/@napi-rs/nice-linux-x64-musl/-/nice-linux-x64-musl-1.1.1.tgz",
      "integrity": "sha512-xScCGnyj/oppsNPMnevsBe3pvNaoK7FGvMjT35riz9YdhB2WtTG47ZlbxtOLpjeO9SqqQ2J2igCmz6IJOD5JYw==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@napi-rs/nice-openharmony-arm64": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/@napi-rs/nice-openharmony-arm64/-/nice-openharmony-arm64-1.1.1.tgz",
      "integrity": "sha512-6uJPRVwVCLDeoOaNyeiW0gp2kFIM4r7PL2MczdZQHkFi9gVlgm+Vn+V6nTWRcu856mJ2WjYJiumEajfSm7arPQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "openharmony"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@napi-rs/nice-win32-arm64-msvc": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/@napi-rs/nice-win32-arm64-msvc/-/nice-win32-arm64-msvc-1.1.1.tgz",
      "integrity": "sha512-uoTb4eAvM5B2aj/z8j+Nv8OttPf2m+HVx3UjA5jcFxASvNhQriyCQF1OB1lHL43ZhW+VwZlgvjmP5qF3+59atA==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@napi-rs/nice-win32-ia32-msvc": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/@napi-rs/nice-win32-ia32-msvc/-/nice-win32-ia32-msvc-1.1.1.tgz",
      "integrity": "sha512-CNQqlQT9MwuCsg1Vd/oKXiuH+TcsSPJmlAFc5frFyX/KkOh0UpBLEj7aoY656d5UKZQMQFP7vJNa1DNUNORvug==",
      "cpu": [
        "ia32"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@napi-rs/nice-win32-x64-msvc": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/@napi-rs/nice-win32-x64-msvc/-/nice-win32-x64-msvc-1.1.1.tgz",
      "integrity": "sha512-vB+4G/jBQCAh0jelMTY3+kgFy00Hlx2f2/1zjMoH821IbplbWZOkLiTYXQkygNTzQJTq5cvwBDgn2ppHD+bglQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@ngtools/webpack": {
      "version": "20.3.5",
      "resolved": "https://registry.npmjs.org/@ngtools/webpack/-/webpack-20.3.5.tgz",
      "integrity": "sha512-LThQWzgEw6a1eTRWn2hUxwVe8WalL75yola4AaI8gJVqlRhfTcjqpleULihCm9cynn3HnVsaHFElaoLdxhugCA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "^20.19.0 || ^22.12.0 || >=24.0.0",
        "npm": "^6.11.0 || ^7.5.6 || >=8.0.0",
        "yarn": ">= 1.13.0"
      },
      "peerDependencies": {
        "@angular/compiler-cli": "^20.0.0",
        "typescript": ">=5.8 <6.0",
        "webpack": "^5.54.0"
      }
    },
    "node_modules/@nodelib/fs.scandir": {
      "version": "2.1.5",
      "resolved": "https://registry.npmjs.org/@nodelib/fs.scandir/-/fs.scandir-2.1.5.tgz",
      "integrity": "sha512-vq24Bq3ym5HEQm2NKCr3yXDwjc7vTsEThRDnkp2DK9p1uqLR+DHurm/NOTo0KG7HYHU7eppKZj3MyqYuMBf62g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@nodelib/fs.stat": "2.0.5",
        "run-parallel": "^1.1.9"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/@nodelib/fs.stat": {
      "version": "2.0.5",
      "resolved": "https://registry.npmjs.org/@nodelib/fs.stat/-/fs.stat-2.0.5.tgz",
      "integrity": "sha512-RkhPPp2zrqDAQA/2jNhnztcPAlv64XdhIp7a7454A5ovI7Bukxgt7MX7udwAu3zg1DcpPU0rz3VV1SeaqvY4+A==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/@nodelib/fs.walk": {
      "version": "1.2.8",
      "resolved": "https://registry.npmjs.org/@nodelib/fs.walk/-/fs.walk-1.2.8.tgz",
      "integrity": "sha512-oGB+UxlgWcgQkgwo8GcEGwemoTFt3FIO9ababBmaGwXIoBKZ+GTy0pP185beGg7Llih/NSHSV2XAs1lnznocSg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@nodelib/fs.scandir": "2.1.5",
        "fastq": "^1.6.0"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/@npmcli/agent": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/@npmcli/agent/-/agent-3.0.0.tgz",
      "integrity": "sha512-S79NdEgDQd/NGCay6TCoVzXSj74skRZIKJcpJjC5lOq34SZzyI6MqtiiWoiVWoVrTcGjNeC4ipbh1VIHlpfF5Q==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "agent-base": "^7.1.0",
        "http-proxy-agent": "^7.0.0",
        "https-proxy-agent": "^7.0.1",
        "lru-cache": "^10.0.1",
        "socks-proxy-agent": "^8.0.3"
      },
      "engines": {
        "node": "^18.17.0 || >=20.5.0"
      }
    },
    "node_modules/@npmcli/agent/node_modules/lru-cache": {
      "version": "10.4.3",
      "resolved": "https://registry.npmjs.org/lru-cache/-/lru-cache-10.4.3.tgz",
      "integrity": "sha512-JNAzZcXrCt42VGLuYz0zfAzDfAvJWW6AfYlDBQyDV5DClI2m5sAmK+OIO7s59XfsRsWHp02jAJrRadPRGTt6SQ==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/@npmcli/fs": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/@npmcli/fs/-/fs-4.0.0.tgz",
      "integrity": "sha512-/xGlezI6xfGO9NwuJlnwz/K14qD1kCSAGtacBHnGzeAIuJGazcp45KP5NuyARXoKb7cwulAGWVsbeSxdG/cb0Q==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "semver": "^7.3.5"
      },
      "engines": {
        "node": "^18.17.0 || >=20.5.0"
      }
    },
    "node_modules/@npmcli/git": {
      "version": "6.0.3",
      "resolved": "https://registry.npmjs.org/@npmcli/git/-/git-6.0.3.tgz",
      "integrity": "sha512-GUYESQlxZRAdhs3UhbB6pVRNUELQOHXwK9ruDkwmCv2aZ5y0SApQzUJCg02p3A7Ue2J5hxvlk1YI53c00NmRyQ==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "@npmcli/promise-spawn": "^8.0.0",
        "ini": "^5.0.0",
        "lru-cache": "^10.0.1",
        "npm-pick-manifest": "^10.0.0",
        "proc-log": "^5.0.0",
        "promise-retry": "^2.0.1",
        "semver": "^7.3.5",
        "which": "^5.0.0"
      },
      "engines": {
        "node": "^18.17.0 || >=20.5.0"
      }
    },
    "node_modules/@npmcli/git/node_modules/isexe": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/isexe/-/isexe-3.1.1.tgz",
      "integrity": "sha512-LpB/54B+/2J5hqQ7imZHfdU31OlgQqx7ZicVlkm9kzg9/w8GKLEcFfJl/t7DCEDueOyBAD6zCCwTO6Fzs0NoEQ==",
      "dev": true,
      "license": "ISC",
      "engines": {
        "node": ">=16"
      }
    },
    "node_modules/@npmcli/git/node_modules/lru-cache": {
      "version": "10.4.3",
      "resolved": "https://registry.npmjs.org/lru-cache/-/lru-cache-10.4.3.tgz",
      "integrity": "sha512-JNAzZcXrCt42VGLuYz0zfAzDfAvJWW6AfYlDBQyDV5DClI2m5sAmK+OIO7s59XfsRsWHp02jAJrRadPRGTt6SQ==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/@npmcli/git/node_modules/which": {
      "version": "5.0.0",
      "resolved": "https://registry.npmjs.org/which/-/which-5.0.0.tgz",
      "integrity": "sha512-JEdGzHwwkrbWoGOlIHqQ5gtprKGOenpDHpxE9zVR1bWbOtYRyPPHMe9FaP6x61CmNaTThSkb0DAJte5jD+DmzQ==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "isexe": "^3.1.1"
      },
      "bin": {
        "node-which": "bin/which.js"
      },
      "engines": {
        "node": "^18.17.0 || >=20.5.0"
      }
    },
    "node_modules/@npmcli/installed-package-contents": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/@npmcli/installed-package-contents/-/installed-package-contents-3.0.0.tgz",
      "integrity": "sha512-fkxoPuFGvxyrH+OQzyTkX2LUEamrF4jZSmxjAtPPHHGO0dqsQ8tTKjnIS8SAnPHdk2I03BDtSMR5K/4loKg79Q==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "npm-bundled": "^4.0.0",
        "npm-normalize-package-bin": "^4.0.0"
      },
      "bin": {
        "installed-package-contents": "bin/index.js"
      },
      "engines": {
        "node": "^18.17.0 || >=20.5.0"
      }
    },
    "node_modules/@npmcli/node-gyp": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/@npmcli/node-gyp/-/node-gyp-4.0.0.tgz",
      "integrity": "sha512-+t5DZ6mO/QFh78PByMq1fGSAub/agLJZDRfJRMeOSNCt8s9YVlTjmGpIPwPhvXTGUIJk+WszlT0rQa1W33yzNA==",
      "dev": true,
      "license": "ISC",
      "engines": {
        "node": "^18.17.0 || >=20.5.0"
      }
    },
    "node_modules/@npmcli/package-json": {
      "version": "6.2.0",
      "resolved": "https://registry.npmjs.org/@npmcli/package-json/-/package-json-6.2.0.tgz",
      "integrity": "sha512-rCNLSB/JzNvot0SEyXqWZ7tX2B5dD2a1br2Dp0vSYVo5jh8Z0EZ7lS9TsZ1UtziddB1UfNUaMCc538/HztnJGA==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "@npmcli/git": "^6.0.0",
        "glob": "^10.2.2",
        "hosted-git-info": "^8.0.0",
        "json-parse-even-better-errors": "^4.0.0",
        "proc-log": "^5.0.0",
        "semver": "^7.5.3",
        "validate-npm-package-license": "^3.0.4"
      },
      "engines": {
        "node": "^18.17.0 || >=20.5.0"
      }
    },
    "node_modules/@npmcli/package-json/node_modules/brace-expansion": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/brace-expansion/-/brace-expansion-2.0.2.tgz",
      "integrity": "sha512-Jt0vHyM+jmUBqojB7E1NIYadt0vI0Qxjxd2TErW94wDz+E2LAm5vKMXXwg6ZZBTHPuUlDgQHKXvjGBdfcF1ZDQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "balanced-match": "^1.0.0"
      }
    },
    "node_modules/@npmcli/package-json/node_modules/glob": {
      "version": "10.4.5",
      "resolved": "https://registry.npmjs.org/glob/-/glob-10.4.5.tgz",
      "integrity": "sha512-7Bv8RF0k6xjo7d4A/PxYLbUCfb6c+Vpd2/mB2yRDlew7Jb5hEXiCD9ibfO7wpk8i4sevK6DFny9h7EYbM3/sHg==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "foreground-child": "^3.1.0",
        "jackspeak": "^3.1.2",
        "minimatch": "^9.0.4",
        "minipass": "^7.1.2",
        "package-json-from-dist": "^1.0.0",
        "path-scurry": "^1.11.1"
      },
      "bin": {
        "glob": "dist/esm/bin.mjs"
      },
      "funding": {
        "url": "https://github.com/sponsors/isaacs"
      }
    },
    "node_modules/@npmcli/package-json/node_modules/hosted-git-info": {
      "version": "8.1.0",
      "resolved": "https://registry.npmjs.org/hosted-git-info/-/hosted-git-info-8.1.0.tgz",
      "integrity": "sha512-Rw/B2DNQaPBICNXEm8balFz9a6WpZrkCGpcWFpy7nCj+NyhSdqXipmfvtmWt9xGfp0wZnBxB+iVpLmQMYt47Tw==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "lru-cache": "^10.0.1"
      },
      "engines": {
        "node": "^18.17.0 || >=20.5.0"
      }
    },
    "node_modules/@npmcli/package-json/node_modules/lru-cache": {
      "version": "10.4.3",
      "resolved": "https://registry.npmjs.org/lru-cache/-/lru-cache-10.4.3.tgz",
      "integrity": "sha512-JNAzZcXrCt42VGLuYz0zfAzDfAvJWW6AfYlDBQyDV5DClI2m5sAmK+OIO7s59XfsRsWHp02jAJrRadPRGTt6SQ==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/@npmcli/package-json/node_modules/minimatch": {
      "version": "9.0.5",
      "resolved": "https://registry.npmjs.org/minimatch/-/minimatch-9.0.5.tgz",
      "integrity": "sha512-G6T0ZX48xgozx7587koeX9Ys2NYy6Gmv//P89sEte9V9whIapMNF4idKxnW2QtCcLiTWlb/wfCabAtAFWhhBow==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "brace-expansion": "^2.0.1"
      },
      "engines": {
        "node": ">=16 || 14 >=14.17"
      },
      "funding": {
        "url": "https://github.com/sponsors/isaacs"
      }
    },
    "node_modules/@npmcli/promise-spawn": {
      "version": "8.0.3",
      "resolved": "https://registry.npmjs.org/@npmcli/promise-spawn/-/promise-spawn-8.0.3.tgz",
      "integrity": "sha512-Yb00SWaL4F8w+K8YGhQ55+xE4RUNdMHV43WZGsiTM92gS+lC0mGsn7I4hLug7pbao035S6bj3Y3w0cUNGLfmkg==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "which": "^5.0.0"
      },
      "engines": {
        "node": "^18.17.0 || >=20.5.0"
      }
    },
    "node_modules/@npmcli/promise-spawn/node_modules/isexe": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/isexe/-/isexe-3.1.1.tgz",
      "integrity": "sha512-LpB/54B+/2J5hqQ7imZHfdU31OlgQqx7ZicVlkm9kzg9/w8GKLEcFfJl/t7DCEDueOyBAD6zCCwTO6Fzs0NoEQ==",
      "dev": true,
      "license": "ISC",
      "engines": {
        "node": ">=16"
      }
    },
    "node_modules/@npmcli/promise-spawn/node_modules/which": {
      "version": "5.0.0",
      "resolved": "https://registry.npmjs.org/which/-/which-5.0.0.tgz",
      "integrity": "sha512-JEdGzHwwkrbWoGOlIHqQ5gtprKGOenpDHpxE9zVR1bWbOtYRyPPHMe9FaP6x61CmNaTThSkb0DAJte5jD+DmzQ==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "isexe": "^3.1.1"
      },
      "bin": {
        "node-which": "bin/which.js"
      },
      "engines": {
        "node": "^18.17.0 || >=20.5.0"
      }
    },
    "node_modules/@npmcli/redact": {
      "version": "3.2.2",
      "resolved": "https://registry.npmjs.org/@npmcli/redact/-/redact-3.2.2.tgz",
      "integrity": "sha512-7VmYAmk4csGv08QzrDKScdzn11jHPFGyqJW39FyPgPuAp3zIaUmuCo1yxw9aGs+NEJuTGQ9Gwqpt93vtJubucg==",
      "dev": true,
      "license": "ISC",
      "engines": {
        "node": "^18.17.0 || >=20.5.0"
      }
    },
    "node_modules/@npmcli/run-script": {
      "version": "9.1.0",
      "resolved": "https://registry.npmjs.org/@npmcli/run-script/-/run-script-9.1.0.tgz",
      "integrity": "sha512-aoNSbxtkePXUlbZB+anS1LqsJdctG5n3UVhfU47+CDdwMi6uNTBMF9gPcQRnqghQd2FGzcwwIFBruFMxjhBewg==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "@npmcli/node-gyp": "^4.0.0",
        "@npmcli/package-json": "^6.0.0",
        "@npmcli/promise-spawn": "^8.0.0",
        "node-gyp": "^11.0.0",
        "proc-log": "^5.0.0",
        "which": "^5.0.0"
      },
      "engines": {
        "node": "^18.17.0 || >=20.5.0"
      }
    },
    "node_modules/@npmcli/run-script/node_modules/isexe": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/isexe/-/isexe-3.1.1.tgz",
      "integrity": "sha512-LpB/54B+/2J5hqQ7imZHfdU31OlgQqx7ZicVlkm9kzg9/w8GKLEcFfJl/t7DCEDueOyBAD6zCCwTO6Fzs0NoEQ==",
      "dev": true,
      "license": "ISC",
      "engines": {
        "node": ">=16"
      }
    },
    "node_modules/@npmcli/run-script/node_modules/which": {
      "version": "5.0.0",
      "resolved": "https://registry.npmjs.org/which/-/which-5.0.0.tgz",
      "integrity": "sha512-JEdGzHwwkrbWoGOlIHqQ5gtprKGOenpDHpxE9zVR1bWbOtYRyPPHMe9FaP6x61CmNaTThSkb0DAJte5jD+DmzQ==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "isexe": "^3.1.1"
      },
      "bin": {
        "node-which": "bin/which.js"
      },
      "engines": {
        "node": "^18.17.0 || >=20.5.0"
      }
    },
    "node_modules/@parcel/watcher": {
      "version": "2.5.1",
      "resolved": "https://registry.npmjs.org/@parcel/watcher/-/watcher-2.5.1.tgz",
      "integrity": "sha512-dfUnCxiN9H4ap84DvD2ubjw+3vUNpstxa0TneY/Paat8a3R4uQZDLSvWjmznAY/DoahqTHl9V46HF/Zs3F29pg==",
      "dev": true,
      "hasInstallScript": true,
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "detect-libc": "^1.0.3",
        "is-glob": "^4.0.3",
        "micromatch": "^4.0.5",
        "node-addon-api": "^7.0.0"
      },
      "engines": {
        "node": ">= 10.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      },
      "optionalDependencies": {
        "@parcel/watcher-android-arm64": "2.5.1",
        "@parcel/watcher-darwin-arm64": "2.5.1",
        "@parcel/watcher-darwin-x64": "2.5.1",
        "@parcel/watcher-freebsd-x64": "2.5.1",
        "@parcel/watcher-linux-arm-glibc": "2.5.1",
        "@parcel/watcher-linux-arm-musl": "2.5.1",
        "@parcel/watcher-linux-arm64-glibc": "2.5.1",
        "@parcel/watcher-linux-arm64-musl": "2.5.1",
        "@parcel/watcher-linux-x64-glibc": "2.5.1",
        "@parcel/watcher-linux-x64-musl": "2.5.1",
        "@parcel/watcher-win32-arm64": "2.5.1",
        "@parcel/watcher-win32-ia32": "2.5.1",
        "@parcel/watcher-win32-x64": "2.5.1"
      }
    },
    "node_modules/@parcel/watcher-android-arm64": {
      "version": "2.5.1",
      "resolved": "https://registry.npmjs.org/@parcel/watcher-android-arm64/-/watcher-android-arm64-2.5.1.tgz",
      "integrity": "sha512-KF8+j9nNbUN8vzOFDpRMsaKBHZ/mcjEjMToVMJOhTozkDonQFFrRcfdLWn6yWKCmJKmdVxSgHiYvTCef4/qcBA==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">= 10.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/@parcel/watcher-darwin-arm64": {
      "version": "2.5.1",
      "resolved": "https://registry.npmjs.org/@parcel/watcher-darwin-arm64/-/watcher-darwin-arm64-2.5.1.tgz",
      "integrity": "sha512-eAzPv5osDmZyBhou8PoF4i6RQXAfeKL9tjb3QzYuccXFMQU0ruIc/POh30ePnaOyD1UXdlKguHBmsTs53tVoPw==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 10.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/@parcel/watcher-darwin-x64": {
      "version": "2.5.1",
      "resolved": "https://registry.npmjs.org/@parcel/watcher-darwin-x64/-/watcher-darwin-x64-2.5.1.tgz",
      "integrity": "sha512-1ZXDthrnNmwv10A0/3AJNZ9JGlzrF82i3gNQcWOzd7nJ8aj+ILyW1MTxVk35Db0u91oD5Nlk9MBiujMlwmeXZg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 10.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/@parcel/watcher-freebsd-x64": {
      "version": "2.5.1",
      "resolved": "https://registry.npmjs.org/@parcel/watcher-freebsd-x64/-/watcher-freebsd-x64-2.5.1.tgz",
      "integrity": "sha512-SI4eljM7Flp9yPuKi8W0ird8TI/JK6CSxju3NojVI6BjHsTyK7zxA9urjVjEKJ5MBYC+bLmMcbAWlZ+rFkLpJQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">= 10.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/@parcel/watcher-linux-arm-glibc": {
      "version": "2.5.1",
      "resolved": "https://registry.npmjs.org/@parcel/watcher-linux-arm-glibc/-/watcher-linux-arm-glibc-2.5.1.tgz",
      "integrity": "sha512-RCdZlEyTs8geyBkkcnPWvtXLY44BCeZKmGYRtSgtwwnHR4dxfHRG3gR99XdMEdQ7KeiDdasJwwvNSF5jKtDwdA==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 10.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/@parcel/watcher-linux-arm-musl": {
      "version": "2.5.1",
      "resolved": "https://registry.npmjs.org/@parcel/watcher-linux-arm-musl/-/watcher-linux-arm-musl-2.5.1.tgz",
      "integrity": "sha512-6E+m/Mm1t1yhB8X412stiKFG3XykmgdIOqhjWj+VL8oHkKABfu/gjFj8DvLrYVHSBNC+/u5PeNrujiSQ1zwd1Q==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 10.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/@parcel/watcher-linux-arm64-glibc": {
      "version": "2.5.1",
      "resolved": "https://registry.npmjs.org/@parcel/watcher-linux-arm64-glibc/-/watcher-linux-arm64-glibc-2.5.1.tgz",
      "integrity": "sha512-LrGp+f02yU3BN9A+DGuY3v3bmnFUggAITBGriZHUREfNEzZh/GO06FF5u2kx8x+GBEUYfyTGamol4j3m9ANe8w==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 10.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/@parcel/watcher-linux-arm64-musl": {
      "version": "2.5.1",
      "resolved": "https://registry.npmjs.org/@parcel/watcher-linux-arm64-musl/-/watcher-linux-arm64-musl-2.5.1.tgz",
      "integrity": "sha512-cFOjABi92pMYRXS7AcQv9/M1YuKRw8SZniCDw0ssQb/noPkRzA+HBDkwmyOJYp5wXcsTrhxO0zq1U11cK9jsFg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 10.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/@parcel/watcher-linux-x64-glibc": {
      "version": "2.5.1",
      "resolved": "https://registry.npmjs.org/@parcel/watcher-linux-x64-glibc/-/watcher-linux-x64-glibc-2.5.1.tgz",
      "integrity": "sha512-GcESn8NZySmfwlTsIur+49yDqSny2IhPeZfXunQi48DMugKeZ7uy1FX83pO0X22sHntJ4Ub+9k34XQCX+oHt2A==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 10.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/@parcel/watcher-linux-x64-musl": {
      "version": "2.5.1",
      "resolved": "https://registry.npmjs.org/@parcel/watcher-linux-x64-musl/-/watcher-linux-x64-musl-2.5.1.tgz",
      "integrity": "sha512-n0E2EQbatQ3bXhcH2D1XIAANAcTZkQICBPVaxMeaCVBtOpBZpWJuf7LwyWPSBDITb7In8mqQgJ7gH8CILCURXg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 10.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/@parcel/watcher-win32-arm64": {
      "version": "2.5.1",
      "resolved": "https://registry.npmjs.org/@parcel/watcher-win32-arm64/-/watcher-win32-arm64-2.5.1.tgz",
      "integrity": "sha512-RFzklRvmc3PkjKjry3hLF9wD7ppR4AKcWNzH7kXR7GUe0Igb3Nz8fyPwtZCSquGrhU5HhUNDr/mKBqj7tqA2Vw==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 10.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/@parcel/watcher-win32-ia32": {
      "version": "2.5.1",
      "resolved": "https://registry.npmjs.org/@parcel/watcher-win32-ia32/-/watcher-win32-ia32-2.5.1.tgz",
      "integrity": "sha512-c2KkcVN+NJmuA7CGlaGD1qJh1cLfDnQsHjE89E60vUEMlqduHGCdCLJCID5geFVM0dOtA3ZiIO8BoEQmzQVfpQ==",
      "cpu": [
        "ia32"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 10.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/@parcel/watcher-win32-x64": {
      "version": "2.5.1",
      "resolved": "https://registry.npmjs.org/@parcel/watcher-win32-x64/-/watcher-win32-x64-2.5.1.tgz",
      "integrity": "sha512-9lHBdJITeNR++EvSQVUcaZoWupyHfXe1jZvGZ06O/5MflPcuPLtEphScIBL+AiCWBO46tDSHzWyD0uDmmZqsgA==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 10.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/@parcel/watcher/node_modules/detect-libc": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/detect-libc/-/detect-libc-1.0.3.tgz",
      "integrity": "sha512-pGjwhsmsp4kL2RTz08wcOlGN83otlqHeD/Z5T8GXZB+/YcpQ/dgo+lbU8ZsGxV0HIvqqxo9l7mqYwyYMD9bKDg==",
      "dev": true,
      "license": "Apache-2.0",
      "optional": true,
      "bin": {
        "detect-libc": "bin/detect-libc.js"
      },
      "engines": {
        "node": ">=0.10"
      }
    },
    "node_modules/@parcel/watcher/node_modules/node-addon-api": {
      "version": "7.1.1",
      "resolved": "https://registry.npmjs.org/node-addon-api/-/node-addon-api-7.1.1.tgz",
      "integrity": "sha512-5m3bsyrjFWE1xf7nz7YXdN4udnVtXK6/Yfgn5qnahL6bCkf2yKt4k3nuTKAtT4r3IG8JNR2ncsIMdZuAzJjHQQ==",
      "dev": true,
      "license": "MIT",
      "optional": true
    },
    "node_modules/@pkgjs/parseargs": {
      "version": "0.11.0",
      "resolved": "https://registry.npmjs.org/@pkgjs/parseargs/-/parseargs-0.11.0.tgz",
      "integrity": "sha512-+1VkjdD0QBLPodGrJUeqarH8VAIvQODIbwh9XpP5Syisf7YoQgsJKPNFoqqLQlu+VQ/tVSshMR6loPMn8U+dPg==",
      "dev": true,
      "license": "MIT",
      "optional": true,
      "engines": {
        "node": ">=14"
      }
    },
    "node_modules/@rollup/rollup-android-arm-eabi": {
      "version": "4.52.3",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-android-arm-eabi/-/rollup-android-arm-eabi-4.52.3.tgz",
      "integrity": "sha512-h6cqHGZ6VdnwliFG1NXvMPTy/9PS3h8oLh7ImwR+kl+oYnQizgjxsONmmPSb2C66RksfkfIxEVtDSEcJiO0tqw==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ]
    },
    "node_modules/@rollup/rollup-android-arm64": {
      "version": "4.52.3",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-android-arm64/-/rollup-android-arm64-4.52.3.tgz",
      "integrity": "sha512-wd+u7SLT/u6knklV/ifG7gr5Qy4GUbH2hMWcDauPFJzmCZUAJ8L2bTkVXC2niOIxp8lk3iH/QX8kSrUxVZrOVw==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ]
    },
    "node_modules/@rollup/rollup-darwin-arm64": {
      "version": "4.34.9",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-darwin-arm64/-/rollup-darwin-arm64-4.34.9.tgz",
      "integrity": "sha512-0CY3/K54slrzLDjOA7TOjN1NuLKERBgk9nY5V34mhmuu673YNb+7ghaDUs6N0ujXR7fz5XaS5Aa6d2TNxZd0OQ==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ]
    },
    "node_modules/@rollup/rollup-darwin-x64": {
      "version": "4.34.9",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-darwin-x64/-/rollup-darwin-x64-4.34.9.tgz",
      "integrity": "sha512-eOojSEAi/acnsJVYRxnMkPFqcxSMFfrw7r2iD9Q32SGkb/Q9FpUY1UlAu1DH9T7j++gZ0lHjnm4OyH2vCI7l7Q==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ]
    },
    "node_modules/@rollup/rollup-freebsd-arm64": {
      "version": "4.52.3",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-freebsd-arm64/-/rollup-freebsd-arm64-4.52.3.tgz",
      "integrity": "sha512-u9Xg2FavYbD30g3DSfNhxgNrxhi6xVG4Y6i9Ur1C7xUuGDW3banRbXj+qgnIrwRN4KeJ396jchwy9bCIzbyBEQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ]
    },
    "node_modules/@rollup/rollup-freebsd-x64": {
      "version": "4.52.3",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-freebsd-x64/-/rollup-freebsd-x64-4.52.3.tgz",
      "integrity": "sha512-5M8kyi/OX96wtD5qJR89a/3x5x8x5inXBZO04JWhkQb2JWavOWfjgkdvUqibGJeNNaz1/Z1PPza5/tAPXICI6A==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ]
    },
    "node_modules/@rollup/rollup-linux-arm-gnueabihf": {
      "version": "4.52.3",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-arm-gnueabihf/-/rollup-linux-arm-gnueabihf-4.52.3.tgz",
      "integrity": "sha512-IoerZJ4l1wRMopEHRKOO16e04iXRDyZFZnNZKrWeNquh5d6bucjezgd+OxG03mOMTnS1x7hilzb3uURPkJ0OfA==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-arm-musleabihf": {
      "version": "4.52.3",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-arm-musleabihf/-/rollup-linux-arm-musleabihf-4.52.3.tgz",
      "integrity": "sha512-ZYdtqgHTDfvrJHSh3W22TvjWxwOgc3ThK/XjgcNGP2DIwFIPeAPNsQxrJO5XqleSlgDux2VAoWQ5iJrtaC1TbA==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-arm64-gnu": {
      "version": "4.34.9",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-arm64-gnu/-/rollup-linux-arm64-gnu-4.34.9.tgz",
      "integrity": "sha512-6TZjPHjKZUQKmVKMUowF3ewHxctrRR09eYyvT5eFv8w/fXarEra83A2mHTVJLA5xU91aCNOUnM+DWFMSbQ0Nxw==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-arm64-musl": {
      "version": "4.34.9",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-arm64-musl/-/rollup-linux-arm64-musl-4.34.9.tgz",
      "integrity": "sha512-LD2fytxZJZ6xzOKnMbIpgzFOuIKlxVOpiMAXawsAZ2mHBPEYOnLRK5TTEsID6z4eM23DuO88X0Tq1mErHMVq0A==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-loong64-gnu": {
      "version": "4.52.3",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-loong64-gnu/-/rollup-linux-loong64-gnu-4.52.3.tgz",
      "integrity": "sha512-3y5GA0JkBuirLqmjwAKwB0keDlI6JfGYduMlJD/Rl7fvb4Ni8iKdQs1eiunMZJhwDWdCvrcqXRY++VEBbvk6Eg==",
      "cpu": [
        "loong64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-ppc64-gnu": {
      "version": "4.52.3",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-ppc64-gnu/-/rollup-linux-ppc64-gnu-4.52.3.tgz",
      "integrity": "sha512-AUUH65a0p3Q0Yfm5oD2KVgzTKgwPyp9DSXc3UA7DtxhEb/WSPfbG4wqXeSN62OG5gSo18em4xv6dbfcUGXcagw==",
      "cpu": [
        "ppc64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-riscv64-gnu": {
      "version": "4.52.3",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-riscv64-gnu/-/rollup-linux-riscv64-gnu-4.52.3.tgz",
      "integrity": "sha512-1makPhFFVBqZE+XFg3Dkq+IkQ7JvmUrwwqaYBL2CE+ZpxPaqkGaiWFEWVGyvTwZace6WLJHwjVh/+CXbKDGPmg==",
      "cpu": [
        "riscv64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-riscv64-musl": {
      "version": "4.52.3",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-riscv64-musl/-/rollup-linux-riscv64-musl-4.52.3.tgz",
      "integrity": "sha512-OOFJa28dxfl8kLOPMUOQBCO6z3X2SAfzIE276fwT52uXDWUS178KWq0pL7d6p1kz7pkzA0yQwtqL0dEPoVcRWg==",
      "cpu": [
        "riscv64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-s390x-gnu": {
      "version": "4.52.3",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-s390x-gnu/-/rollup-linux-s390x-gnu-4.52.3.tgz",
      "integrity": "sha512-jMdsML2VI5l+V7cKfZx3ak+SLlJ8fKvLJ0Eoa4b9/vCUrzXKgoKxvHqvJ/mkWhFiyp88nCkM5S2v6nIwRtPcgg==",
      "cpu": [
        "s390x"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-x64-gnu": {
      "version": "4.34.9",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-x64-gnu/-/rollup-linux-x64-gnu-4.34.9.tgz",
      "integrity": "sha512-FwBHNSOjUTQLP4MG7y6rR6qbGw4MFeQnIBrMe161QGaQoBQLqSUEKlHIiVgF3g/mb3lxlxzJOpIBhaP+C+KP2A==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-x64-musl": {
      "version": "4.34.9",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-x64-musl/-/rollup-linux-x64-musl-4.34.9.tgz",
      "integrity": "sha512-cYRpV4650z2I3/s6+5/LONkjIz8MBeqrk+vPXV10ORBnshpn8S32bPqQ2Utv39jCiDcO2eJTuSlPXpnvmaIgRA==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-openharmony-arm64": {
      "version": "4.52.3",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-openharmony-arm64/-/rollup-openharmony-arm64-4.52.3.tgz",
      "integrity": "sha512-KTD/EqjZF3yvRaWUJdD1cW+IQBk4fbQaHYJUmP8N4XoKFZilVL8cobFSTDnjTtxWJQ3JYaMgF4nObY/+nYkumA==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "openharmony"
      ]
    },
    "node_modules/@rollup/rollup-win32-arm64-msvc": {
      "version": "4.34.9",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-win32-arm64-msvc/-/rollup-win32-arm64-msvc-4.34.9.tgz",
      "integrity": "sha512-z4mQK9dAN6byRA/vsSgQiPeuO63wdiDxZ9yg9iyX2QTzKuQM7T4xlBoeUP/J8uiFkqxkcWndWi+W7bXdPbt27Q==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@rollup/rollup-win32-ia32-msvc": {
      "version": "4.52.3",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-win32-ia32-msvc/-/rollup-win32-ia32-msvc-4.52.3.tgz",
      "integrity": "sha512-of1iHkTQSo3kr6dTIRX6t81uj/c/b15HXVsPcEElN5sS859qHrOepM5p9G41Hah+CTqSh2r8Bm56dL2z9UQQ7g==",
      "cpu": [
        "ia32"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@rollup/rollup-win32-x64-gnu": {
      "version": "4.52.3",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-win32-x64-gnu/-/rollup-win32-x64-gnu-4.52.3.tgz",
      "integrity": "sha512-s0hybmlHb56mWVZQj8ra9048/WZTPLILKxcvcq+8awSZmyiSUZjjem1AhU3Tf4ZKpYhK4mg36HtHDOe8QJS5PQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@rollup/rollup-win32-x64-msvc": {
      "version": "4.34.9",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-win32-x64-msvc/-/rollup-win32-x64-msvc-4.34.9.tgz",
      "integrity": "sha512-AyleYRPU7+rgkMWbEh71fQlrzRfeP6SyMnRf9XX4fCdDPAJumdSBqYEcWPMzVQ4ScAl7E4oFfK0GUVn77xSwbw==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@schematics/angular": {
      "version": "20.3.5",
      "resolved": "https://registry.npmjs.org/@schematics/angular/-/angular-20.3.5.tgz",
      "integrity": "sha512-mrVWO64psqah8E8HgpF30NMizVZyX6aH3k6hqf2tDgU3+giKX7xvTG9UQCaXA4MLBsQbpcWAmwPLipwLnPm8wA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@angular-devkit/core": "20.3.5",
        "@angular-devkit/schematics": "20.3.5",
        "jsonc-parser": "3.3.1"
      },
      "engines": {
        "node": "^20.19.0 || ^22.12.0 || >=24.0.0",
        "npm": "^6.11.0 || ^7.5.6 || >=8.0.0",
        "yarn": ">= 1.13.0"
      }
    },
    "node_modules/@sigstore/bundle": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/@sigstore/bundle/-/bundle-3.1.0.tgz",
      "integrity": "sha512-Mm1E3/CmDDCz3nDhFKTuYdB47EdRFRQMOE/EAbiG1MJW77/w1b3P7Qx7JSrVJs8PfwOLOVcKQCHErIwCTyPbag==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@sigstore/protobuf-specs": "^0.4.0"
      },
      "engines": {
        "node": "^18.17.0 || >=20.5.0"
      }
    },
    "node_modules/@sigstore/core": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/@sigstore/core/-/core-2.0.0.tgz",
      "integrity": "sha512-nYxaSb/MtlSI+JWcwTHQxyNmWeWrUXJJ/G4liLrGG7+tS4vAz6LF3xRXqLH6wPIVUoZQel2Fs4ddLx4NCpiIYg==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": "^18.17.0 || >=20.5.0"
      }
    },
    "node_modules/@sigstore/protobuf-specs": {
      "version": "0.4.3",
      "resolved": "https://registry.npmjs.org/@sigstore/protobuf-specs/-/protobuf-specs-0.4.3.tgz",
      "integrity": "sha512-fk2zjD9117RL9BjqEwF7fwv7Q/P9yGsMV4MUJZ/DocaQJ6+3pKr+syBq1owU5Q5qGw5CUbXzm+4yJ2JVRDQeSA==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": "^18.17.0 || >=20.5.0"
      }
    },
    "node_modules/@sigstore/sign": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/@sigstore/sign/-/sign-3.1.0.tgz",
      "integrity": "sha512-knzjmaOHOov1Ur7N/z4B1oPqZ0QX5geUfhrVaqVlu+hl0EAoL4o+l0MSULINcD5GCWe3Z0+YJO8ues6vFlW0Yw==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@sigstore/bundle": "^3.1.0",
        "@sigstore/core": "^2.0.0",
        "@sigstore/protobuf-specs": "^0.4.0",
        "make-fetch-happen": "^14.0.2",
        "proc-log": "^5.0.0",
        "promise-retry": "^2.0.1"
      },
      "engines": {
        "node": "^18.17.0 || >=20.5.0"
      }
    },
    "node_modules/@sigstore/tuf": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/@sigstore/tuf/-/tuf-3.1.1.tgz",
      "integrity": "sha512-eFFvlcBIoGwVkkwmTi/vEQFSva3xs5Ot3WmBcjgjVdiaoelBLQaQ/ZBfhlG0MnG0cmTYScPpk7eDdGDWUcFUmg==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@sigstore/protobuf-specs": "^0.4.1",
        "tuf-js": "^3.0.1"
      },
      "engines": {
        "node": "^18.17.0 || >=20.5.0"
      }
    },
    "node_modules/@sigstore/verify": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/@sigstore/verify/-/verify-2.1.1.tgz",
      "integrity": "sha512-hVJD77oT67aowHxwT4+M6PGOp+E2LtLdTK3+FC0lBO9T7sYwItDMXZ7Z07IDCvR1M717a4axbIWckrW67KMP/w==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@sigstore/bundle": "^3.1.0",
        "@sigstore/core": "^2.0.0",
        "@sigstore/protobuf-specs": "^0.4.1"
      },
      "engines": {
        "node": "^18.17.0 || >=20.5.0"
      }
    },
    "node_modules/@socket.io/component-emitter": {
      "version": "3.1.2",
      "resolved": "https://registry.npmjs.org/@socket.io/component-emitter/-/component-emitter-3.1.2.tgz",
      "integrity": "sha512-9BCxFwvbGg/RsZK9tjXd8s4UcwR0MWeFQ1XEKIQVVvAGJyINdrqKMcTRyLoK8Rse1GjzLV9cwjWV1olXRWEXVA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@stencil/core": {
      "version": "4.38.0",
      "resolved": "https://registry.npmjs.org/@stencil/core/-/core-4.38.0.tgz",
      "integrity": "sha512-oC3QFKO0X1yXVvETgc8OLY525MNKhn9vISBrbtKnGoPlokJ6rI8Vk1RK22TevnNrHLI4SExNLbcDnqilKR35JQ==",
      "license": "MIT",
      "bin": {
        "stencil": "bin/stencil"
      },
      "engines": {
        "node": ">=16.0.0",
        "npm": ">=7.10.0"
      },
      "optionalDependencies": {
        "@rollup/rollup-darwin-arm64": "4.34.9",
        "@rollup/rollup-darwin-x64": "4.34.9",
        "@rollup/rollup-linux-arm64-gnu": "4.34.9",
        "@rollup/rollup-linux-arm64-musl": "4.34.9",
        "@rollup/rollup-linux-x64-gnu": "4.34.9",
        "@rollup/rollup-linux-x64-musl": "4.34.9",
        "@rollup/rollup-win32-arm64-msvc": "4.34.9",
        "@rollup/rollup-win32-x64-msvc": "4.34.9"
      }
    },
    "node_modules/@tufjs/canonical-json": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/@tufjs/canonical-json/-/canonical-json-2.0.0.tgz",
      "integrity": "sha512-yVtV8zsdo8qFHe+/3kw81dSLyF7D576A5cCFCi4X7B39tWT7SekaEFUnvnWJHz+9qO7qJTah1JbrDjWKqFtdWA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "^16.14.0 || >=18.0.0"
      }
    },
    "node_modules/@tufjs/models": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/@tufjs/models/-/models-3.0.1.tgz",
      "integrity": "sha512-UUYHISyhCU3ZgN8yaear3cGATHb3SMuKHsQ/nVbHXcmnBf+LzQ/cQfhNG+rfaSHgqGKNEm2cOCLVLELStUQ1JA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@tufjs/canonical-json": "2.0.0",
        "minimatch": "^9.0.5"
      },
      "engines": {
        "node": "^18.17.0 || >=20.5.0"
      }
    },
    "node_modules/@tufjs/models/node_modules/brace-expansion": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/brace-expansion/-/brace-expansion-2.0.2.tgz",
      "integrity": "sha512-Jt0vHyM+jmUBqojB7E1NIYadt0vI0Qxjxd2TErW94wDz+E2LAm5vKMXXwg6ZZBTHPuUlDgQHKXvjGBdfcF1ZDQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "balanced-match": "^1.0.0"
      }
    },
    "node_modules/@tufjs/models/node_modules/minimatch": {
      "version": "9.0.5",
      "resolved": "https://registry.npmjs.org/minimatch/-/minimatch-9.0.5.tgz",
      "integrity": "sha512-G6T0ZX48xgozx7587koeX9Ys2NYy6Gmv//P89sEte9V9whIapMNF4idKxnW2QtCcLiTWlb/wfCabAtAFWhhBow==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "brace-expansion": "^2.0.1"
      },
      "engines": {
        "node": ">=16 || 14 >=14.17"
      },
      "funding": {
        "url": "https://github.com/sponsors/isaacs"
      }
    },
    "node_modules/@types/body-parser": {
      "version": "1.19.6",
      "resolved": "https://registry.npmjs.org/@types/body-parser/-/body-parser-1.19.6.tgz",
      "integrity": "sha512-HLFeCYgz89uk22N5Qg3dvGvsv46B8GLvKKo1zKG4NybA8U2DiEO3w9lqGg29t/tfLRJpJ6iQxnVw4OnB7MoM9g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/connect": "*",
        "@types/node": "*"
      }
    },
    "node_modules/@types/bonjour": {
      "version": "3.5.13",
      "resolved": "https://registry.npmjs.org/@types/bonjour/-/bonjour-3.5.13.tgz",
      "integrity": "sha512-z9fJ5Im06zvUL548KvYNecEVlA7cVDkGUi6kZusb04mpyEFKCIZJvloCcmpmLaIahDpOQGHaHmG6imtPMmPXGQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/node": "*"
      }
    },
    "node_modules/@types/connect": {
      "version": "3.4.38",
      "resolved": "https://registry.npmjs.org/@types/connect/-/connect-3.4.38.tgz",
      "integrity": "sha512-K6uROf1LD88uDQqJCktA4yzL1YYAK6NgfsI0v/mTgyPKWsX1CnJ0XPSDhViejru1GcRkLWb8RlzFYJRqGUbaug==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/node": "*"
      }
    },
    "node_modules/@types/connect-history-api-fallback": {
      "version": "1.5.4",
      "resolved": "https://registry.npmjs.org/@types/connect-history-api-fallback/-/connect-history-api-fallback-1.5.4.tgz",
      "integrity": "sha512-n6Cr2xS1h4uAulPRdlw6Jl6s1oG8KrVilPN2yUITEs+K48EzMJJ3W1xy8K5eWuFvjp3R74AOIGSmp2UfBJ8HFw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/express-serve-static-core": "*",
        "@types/node": "*"
      }
    },
    "node_modules/@types/cors": {
      "version": "2.8.19",
      "resolved": "https://registry.npmjs.org/@types/cors/-/cors-2.8.19.tgz",
      "integrity": "sha512-mFNylyeyqN93lfe/9CSxOGREz8cpzAhH+E93xJ4xWQf62V8sQ/24reV2nyzUWM6H6Xji+GGHpkbLe7pVoUEskg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/node": "*"
      }
    },
    "node_modules/@types/eslint": {
      "version": "9.6.1",
      "resolved": "https://registry.npmjs.org/@types/eslint/-/eslint-9.6.1.tgz",
      "integrity": "sha512-FXx2pKgId/WyYo2jXw63kk7/+TY7u7AziEJxJAnSFzHlqTAS3Ync6SvgYAN/k4/PQpnnVuzoMuVnByKK2qp0ag==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/estree": "*",
        "@types/json-schema": "*"
      }
    },
    "node_modules/@types/eslint-scope": {
      "version": "3.7.7",
      "resolved": "https://registry.npmjs.org/@types/eslint-scope/-/eslint-scope-3.7.7.tgz",
      "integrity": "sha512-MzMFlSLBqNF2gcHWO0G1vP/YQyfvrxZ0bF+u7mzUdZ1/xK4A4sru+nraZz5i3iEIk1l1uyicaDVTB4QbbEkAYg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/eslint": "*",
        "@types/estree": "*"
      }
    },
    "node_modules/@types/estree": {
      "version": "1.0.8",
      "resolved": "https://registry.npmjs.org/@types/estree/-/estree-1.0.8.tgz",
      "integrity": "sha512-dWHzHa2WqEXI/O1E9OjrocMTKJl2mSrEolh1Iomrv6U+JuNwaHXsXx9bLu5gG7BUWFIN0skIQJQ/L1rIex4X6w==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/express": {
      "version": "4.17.23",
      "resolved": "https://registry.npmjs.org/@types/express/-/express-4.17.23.tgz",
      "integrity": "sha512-Crp6WY9aTYP3qPi2wGDo9iUe/rceX01UMhnF1jmwDcKCFM6cx7YhGP/Mpr3y9AASpfHixIG0E6azCcL5OcDHsQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/body-parser": "*",
        "@types/express-serve-static-core": "^4.17.33",
        "@types/qs": "*",
        "@types/serve-static": "*"
      }
    },
    "node_modules/@types/express-serve-static-core": {
      "version": "4.19.7",
      "resolved": "https://registry.npmjs.org/@types/express-serve-static-core/-/express-serve-static-core-4.19.7.tgz",
      "integrity": "sha512-FvPtiIf1LfhzsaIXhv/PHan/2FeQBbtBDtfX2QfvPxdUelMDEckK08SM6nqo1MIZY3RUlfA+HV8+hFUSio78qg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/node": "*",
        "@types/qs": "*",
        "@types/range-parser": "*",
        "@types/send": "*"
      }
    },
    "node_modules/@types/http-errors": {
      "version": "2.0.5",
      "resolved": "https://registry.npmjs.org/@types/http-errors/-/http-errors-2.0.5.tgz",
      "integrity": "sha512-r8Tayk8HJnX0FztbZN7oVqGccWgw98T/0neJphO91KkmOzug1KkofZURD4UaD5uH8AqcFLfdPErnBod0u71/qg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/http-proxy": {
      "version": "1.17.16",
      "resolved": "https://registry.npmjs.org/@types/http-proxy/-/http-proxy-1.17.16.tgz",
      "integrity": "sha512-sdWoUajOB1cd0A8cRRQ1cfyWNbmFKLAqBB89Y8x5iYyG/mkJHc0YUH8pdWBy2omi9qtCpiIgGjuwO0dQST2l5w==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/node": "*"
      }
    },
    "node_modules/@types/jasmine": {
      "version": "5.1.12",
      "resolved": "https://registry.npmjs.org/@types/jasmine/-/jasmine-5.1.12.tgz",
      "integrity": "sha512-1BzPxNsFDLDfj9InVR3IeY0ZVf4o9XV+4mDqoCfyPkbsA7dYyKAPAb2co6wLFlHcvxPlt1wShm7zQdV7uTfLGA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/json-schema": {
      "version": "7.0.15",
      "resolved": "https://registry.npmjs.org/@types/json-schema/-/json-schema-7.0.15.tgz",
      "integrity": "sha512-5+fP8P8MFNC+AyZCDxrB2pkZFPGzqQWUzpSeuuVLvm8VMcorNYavBqoFcxK8bQz4Qsbn4oUEEem4wDLfcysGHA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/mime": {
      "version": "1.3.5",
      "resolved": "https://registry.npmjs.org/@types/mime/-/mime-1.3.5.tgz",
      "integrity": "sha512-/pyBZWSLD2n0dcHE3hq8s8ZvcETHtEuF+3E7XVt0Ig2nvsVQXdghHVcEkIWjy9A0wKfTn97a/PSDYohKIlnP/w==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/node": {
      "version": "24.9.1",
      "resolved": "https://registry.npmjs.org/@types/node/-/node-24.9.1.tgz",
      "integrity": "sha512-QoiaXANRkSXK6p0Duvt56W208du4P9Uye9hWLWgGMDTEoKPhuenzNcC4vGUmrNkiOKTlIrBoyNQYNpSwfEZXSg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "undici-types": "~7.16.0"
      }
    },
    "node_modules/@types/node-forge": {
      "version": "1.3.14",
      "resolved": "https://registry.npmjs.org/@types/node-forge/-/node-forge-1.3.14.tgz",
      "integrity": "sha512-mhVF2BnD4BO+jtOp7z1CdzaK4mbuK0LLQYAvdOLqHTavxFNq4zA1EmYkpnFjP8HOUzedfQkRnp0E2ulSAYSzAw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/node": "*"
      }
    },
    "node_modules/@types/qs": {
      "version": "6.14.0",
      "resolved": "https://registry.npmjs.org/@types/qs/-/qs-6.14.0.tgz",
      "integrity": "sha512-eOunJqu0K1923aExK6y8p6fsihYEn/BYuQ4g0CxAAgFc4b/ZLN4CrsRZ55srTdqoiLzU2B2evC+apEIxprEzkQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/range-parser": {
      "version": "1.2.7",
      "resolved": "https://registry.npmjs.org/@types/range-parser/-/range-parser-1.2.7.tgz",
      "integrity": "sha512-hKormJbkJqzQGhziax5PItDUTMAM9uE2XXQmM37dyd4hVM+5aVl7oVxMVUiVQn2oCQFN/LKCZdvSM0pFRqbSmQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/retry": {
      "version": "0.12.2",
      "resolved": "https://registry.npmjs.org/@types/retry/-/retry-0.12.2.tgz",
      "integrity": "sha512-XISRgDJ2Tc5q4TRqvgJtzsRkFYNJzZrhTdtMoGVBttwzzQJkPnS3WWTFc7kuDRoPtPakl+T+OfdEUjYJj7Jbow==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/send": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/@types/send/-/send-1.2.0.tgz",
      "integrity": "sha512-zBF6vZJn1IaMpg3xUF25VK3gd3l8zwE0ZLRX7dsQyQi+jp4E8mMDJNGDYnYse+bQhYwWERTxVwHpi3dMOq7RKQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/node": "*"
      }
    },
    "node_modules/@types/serve-index": {
      "version": "1.9.4",
      "resolved": "https://registry.npmjs.org/@types/serve-index/-/serve-index-1.9.4.tgz",
      "integrity": "sha512-qLpGZ/c2fhSs5gnYsQxtDEq3Oy8SXPClIXkW5ghvAvsNuVSA8k+gCONcUCS/UjLEYvYps+e8uBtfgXgvhwfNug==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/express": "*"
      }
    },
    "node_modules/@types/serve-static": {
      "version": "1.15.9",
      "resolved": "https://registry.npmjs.org/@types/serve-static/-/serve-static-1.15.9.tgz",
      "integrity": "sha512-dOTIuqpWLyl3BBXU3maNQsS4A3zuuoYRNIvYSxxhebPfXg2mzWQEPne/nlJ37yOse6uGgR386uTpdsx4D0QZWA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/http-errors": "*",
        "@types/node": "*",
        "@types/send": "<1"
      }
    },
    "node_modules/@types/serve-static/node_modules/@types/send": {
      "version": "0.17.5",
      "resolved": "https://registry.npmjs.org/@types/send/-/send-0.17.5.tgz",
      "integrity": "sha512-z6F2D3cOStZvuk2SaP6YrwkNO65iTZcwA2ZkSABegdkAh/lf+Aa/YQndZVfmEXT5vgAp6zv06VQ3ejSVjAny4w==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/mime": "^1",
        "@types/node": "*"
      }
    },
    "node_modules/@types/sockjs": {
      "version": "0.3.36",
      "resolved": "https://registry.npmjs.org/@types/sockjs/-/sockjs-0.3.36.tgz",
      "integrity": "sha512-MK9V6NzAS1+Ud7JV9lJLFqW85VbC9dq3LmwZCuBe4wBDgKC0Kj/jd8Xl+nSviU+Qc3+m7umHHyHg//2KSa0a0Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/node": "*"
      }
    },
    "node_modules/@types/ws": {
      "version": "8.18.1",
      "resolved": "https://registry.npmjs.org/@types/ws/-/ws-8.18.1.tgz",
      "integrity": "sha512-ThVF6DCVhA8kUGy+aazFQ4kXQ7E1Ty7A3ypFOe0IcJV8O/M511G99AW24irKrW56Wt44yG9+ij8FaqoBGkuBXg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/node": "*"
      }
    },
    "node_modules/@vitejs/plugin-basic-ssl": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/@vitejs/plugin-basic-ssl/-/plugin-basic-ssl-2.1.0.tgz",
      "integrity": "sha512-dOxxrhgyDIEUADhb/8OlV9JIqYLgos03YorAueTIeOUskLJSEsfwCByjbu98ctXitUN3znXKp0bYD/WHSudCeA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "^18.0.0 || ^20.0.0 || >=22.0.0"
      },
      "peerDependencies": {
        "vite": "^6.0.0 || ^7.0.0"
      }
    },
    "node_modules/@webassemblyjs/ast": {
      "version": "1.14.1",
      "resolved": "https://registry.npmjs.org/@webassemblyjs/ast/-/ast-1.14.1.tgz",
      "integrity": "sha512-nuBEDgQfm1ccRp/8bCQrx1frohyufl4JlbMMZ4P1wpeOfDhF6FQkxZJ1b/e+PLwr6X1Nhw6OLme5usuBWYBvuQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@webassemblyjs/helper-numbers": "1.13.2",
        "@webassemblyjs/helper-wasm-bytecode": "1.13.2"
      }
    },
    "node_modules/@webassemblyjs/floating-point-hex-parser": {
      "version": "1.13.2",
      "resolved": "https://registry.npmjs.org/@webassemblyjs/floating-point-hex-parser/-/floating-point-hex-parser-1.13.2.tgz",
      "integrity": "sha512-6oXyTOzbKxGH4steLbLNOu71Oj+C8Lg34n6CqRvqfS2O71BxY6ByfMDRhBytzknj9yGUPVJ1qIKhRlAwO1AovA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@webassemblyjs/helper-api-error": {
      "version": "1.13.2",
      "resolved": "https://registry.npmjs.org/@webassemblyjs/helper-api-error/-/helper-api-error-1.13.2.tgz",
      "integrity": "sha512-U56GMYxy4ZQCbDZd6JuvvNV/WFildOjsaWD3Tzzvmw/mas3cXzRJPMjP83JqEsgSbyrmaGjBfDtV7KDXV9UzFQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@webassemblyjs/helper-buffer": {
      "version": "1.14.1",
      "resolved": "https://registry.npmjs.org/@webassemblyjs/helper-buffer/-/helper-buffer-1.14.1.tgz",
      "integrity": "sha512-jyH7wtcHiKssDtFPRB+iQdxlDf96m0E39yb0k5uJVhFGleZFoNw1c4aeIcVUPPbXUVJ94wwnMOAqUHyzoEPVMA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@webassemblyjs/helper-numbers": {
      "version": "1.13.2",
      "resolved": "https://registry.npmjs.org/@webassemblyjs/helper-numbers/-/helper-numbers-1.13.2.tgz",
      "integrity": "sha512-FE8aCmS5Q6eQYcV3gI35O4J789wlQA+7JrqTTpJqn5emA4U2hvwJmvFRC0HODS+3Ye6WioDklgd6scJ3+PLnEA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@webassemblyjs/floating-point-hex-parser": "1.13.2",
        "@webassemblyjs/helper-api-error": "1.13.2",
        "@xtuc/long": "4.2.2"
      }
    },
    "node_modules/@webassemblyjs/helper-wasm-bytecode": {
      "version": "1.13.2",
      "resolved": "https://registry.npmjs.org/@webassemblyjs/helper-wasm-bytecode/-/helper-wasm-bytecode-1.13.2.tgz",
      "integrity": "sha512-3QbLKy93F0EAIXLh0ogEVR6rOubA9AoZ+WRYhNbFyuB70j3dRdwH9g+qXhLAO0kiYGlg3TxDV+I4rQTr/YNXkA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@webassemblyjs/helper-wasm-section": {
      "version": "1.14.1",
      "resolved": "https://registry.npmjs.org/@webassemblyjs/helper-wasm-section/-/helper-wasm-section-1.14.1.tgz",
      "integrity": "sha512-ds5mXEqTJ6oxRoqjhWDU83OgzAYjwsCV8Lo/N+oRsNDmx/ZDpqalmrtgOMkHwxsG0iI//3BwWAErYRHtgn0dZw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@webassemblyjs/ast": "1.14.1",
        "@webassemblyjs/helper-buffer": "1.14.1",
        "@webassemblyjs/helper-wasm-bytecode": "1.13.2",
        "@webassemblyjs/wasm-gen": "1.14.1"
      }
    },
    "node_modules/@webassemblyjs/ieee754": {
      "version": "1.13.2",
      "resolved": "https://registry.npmjs.org/@webassemblyjs/ieee754/-/ieee754-1.13.2.tgz",
      "integrity": "sha512-4LtOzh58S/5lX4ITKxnAK2USuNEvpdVV9AlgGQb8rJDHaLeHciwG4zlGr0j/SNWlr7x3vO1lDEsuePvtcDNCkw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@xtuc/ieee754": "^1.2.0"
      }
    },
    "node_modules/@webassemblyjs/leb128": {
      "version": "1.13.2",
      "resolved": "https://registry.npmjs.org/@webassemblyjs/leb128/-/leb128-1.13.2.tgz",
      "integrity": "sha512-Lde1oNoIdzVzdkNEAWZ1dZ5orIbff80YPdHx20mrHwHrVNNTjNr8E3xz9BdpcGqRQbAEa+fkrCb+fRFTl/6sQw==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@xtuc/long": "4.2.2"
      }
    },
    "node_modules/@webassemblyjs/utf8": {
      "version": "1.13.2",
      "resolved": "https://registry.npmjs.org/@webassemblyjs/utf8/-/utf8-1.13.2.tgz",
      "integrity": "sha512-3NQWGjKTASY1xV5m7Hr0iPeXD9+RDobLll3T9d2AO+g3my8xy5peVyjSag4I50mR1bBSN/Ct12lo+R9tJk0NZQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@webassemblyjs/wasm-edit": {
      "version": "1.14.1",
      "resolved": "https://registry.npmjs.org/@webassemblyjs/wasm-edit/-/wasm-edit-1.14.1.tgz",
      "integrity": "sha512-RNJUIQH/J8iA/1NzlE4N7KtyZNHi3w7at7hDjvRNm5rcUXa00z1vRz3glZoULfJ5mpvYhLybmVcwcjGrC1pRrQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@webassemblyjs/ast": "1.14.1",
        "@webassemblyjs/helper-buffer": "1.14.1",
        "@webassemblyjs/helper-wasm-bytecode": "1.13.2",
        "@webassemblyjs/helper-wasm-section": "1.14.1",
        "@webassemblyjs/wasm-gen": "1.14.1",
        "@webassemblyjs/wasm-opt": "1.14.1",
        "@webassemblyjs/wasm-parser": "1.14.1",
        "@webassemblyjs/wast-printer": "1.14.1"
      }
    },
    "node_modules/@webassemblyjs/wasm-gen": {
      "version": "1.14.1",
      "resolved": "https://registry.npmjs.org/@webassemblyjs/wasm-gen/-/wasm-gen-1.14.1.tgz",
      "integrity": "sha512-AmomSIjP8ZbfGQhumkNvgC33AY7qtMCXnN6bL2u2Js4gVCg8fp735aEiMSBbDR7UQIj90n4wKAFUSEd0QN2Ukg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@webassemblyjs/ast": "1.14.1",
        "@webassemblyjs/helper-wasm-bytecode": "1.13.2",
        "@webassemblyjs/ieee754": "1.13.2",
        "@webassemblyjs/leb128": "1.13.2",
        "@webassemblyjs/utf8": "1.13.2"
      }
    },
    "node_modules/@webassemblyjs/wasm-opt": {
      "version": "1.14.1",
      "resolved": "https://registry.npmjs.org/@webassemblyjs/wasm-opt/-/wasm-opt-1.14.1.tgz",
      "integrity": "sha512-PTcKLUNvBqnY2U6E5bdOQcSM+oVP/PmrDY9NzowJjislEjwP/C4an2303MCVS2Mg9d3AJpIGdUFIQQWbPds0Sw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@webassemblyjs/ast": "1.14.1",
        "@webassemblyjs/helper-buffer": "1.14.1",
        "@webassemblyjs/wasm-gen": "1.14.1",
        "@webassemblyjs/wasm-parser": "1.14.1"
      }
    },
    "node_modules/@webassemblyjs/wasm-parser": {
      "version": "1.14.1",
      "resolved": "https://registry.npmjs.org/@webassemblyjs/wasm-parser/-/wasm-parser-1.14.1.tgz",
      "integrity": "sha512-JLBl+KZ0R5qB7mCnud/yyX08jWFw5MsoalJ1pQ4EdFlgj9VdXKGuENGsiCIjegI1W7p91rUlcB/LB5yRJKNTcQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@webassemblyjs/ast": "1.14.1",
        "@webassemblyjs/helper-api-error": "1.13.2",
        "@webassemblyjs/helper-wasm-bytecode": "1.13.2",
        "@webassemblyjs/ieee754": "1.13.2",
        "@webassemblyjs/leb128": "1.13.2",
        "@webassemblyjs/utf8": "1.13.2"
      }
    },
    "node_modules/@webassemblyjs/wast-printer": {
      "version": "1.14.1",
      "resolved": "https://registry.npmjs.org/@webassemblyjs/wast-printer/-/wast-printer-1.14.1.tgz",
      "integrity": "sha512-kPSSXE6De1XOR820C90RIo2ogvZG+c3KiHzqUoO/F34Y2shGzesfqv7o57xrxovZJH/MetF5UjroJ/R/3isoiw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@webassemblyjs/ast": "1.14.1",
        "@xtuc/long": "4.2.2"
      }
    },
    "node_modules/@xtuc/ieee754": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/@xtuc/ieee754/-/ieee754-1.2.0.tgz",
      "integrity": "sha512-DX8nKgqcGwsc0eJSqYt5lwP4DH5FlHnmuWWBRy7X0NcaGR0ZtuyeESgMwTYVEtxmsNGY+qit4QYT/MIYTOTPeA==",
      "dev": true,
      "license": "BSD-3-Clause"
    },
    "node_modules/@xtuc/long": {
      "version": "4.2.2",
      "resolved": "https://registry.npmjs.org/@xtuc/long/-/long-4.2.2.tgz",
      "integrity": "sha512-NuHqBY1PB/D8xU6s/thBgOAiAP7HOYDQ32+BFZILJ8ivkUkAHQnWfn6WhL79Owj1qmUnoN/YPhktdIoucipkAQ==",
      "dev": true,
      "license": "Apache-2.0"
    },
    "node_modules/@yarnpkg/lockfile": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@yarnpkg/lockfile/-/lockfile-1.1.0.tgz",
      "integrity": "sha512-GpSwvyXOcOOlV70vbnzjj4fW5xW/FdUF6nQEt1ENy7m4ZCczi1+/buVUPAqmGfqznsORNFzUMjctTIp8a9tuCQ==",
      "dev": true,
      "license": "BSD-2-Clause"
    },
    "node_modules/abbrev": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/abbrev/-/abbrev-3.0.1.tgz",
      "integrity": "sha512-AO2ac6pjRB3SJmGJo+v5/aK6Omggp6fsLrs6wN9bd35ulu4cCwaAU9+7ZhXjeqHVkaHThLuzH0nZr0YpCDhygg==",
      "dev": true,
      "license": "ISC",
      "engines": {
        "node": "^18.17.0 || >=20.5.0"
      }
    },
    "node_modules/accepts": {
      "version": "1.3.8",
      "resolved": "https://registry.npmjs.org/accepts/-/accepts-1.3.8.tgz",
      "integrity": "sha512-PYAthTa2m2VKxuvSD3DPC/Gy+U+sOA1LAuT8mkmRuvw+NACSaeXEQ+NHcVF7rONl6qcaxV3Uuemwawk+7+SJLw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "mime-types": "~2.1.34",
        "negotiator": "0.6.3"
      },
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/accepts/node_modules/negotiator": {
      "version": "0.6.3",
      "resolved": "https://registry.npmjs.org/negotiator/-/negotiator-0.6.3.tgz",
      "integrity": "sha512-+EUsqGPLsM+j/zdChZjsnX51g4XrHFOIXwfnCVPGlQk/k5giakcKsuxCObBRu6DSm9opw/O6slWbJdghQM4bBg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/acorn": {
      "version": "8.15.0",
      "resolved": "https://registry.npmjs.org/acorn/-/acorn-8.15.0.tgz",
      "integrity": "sha512-NZyJarBfL7nWwIq+FDL6Zp/yHEhePMNnnJ0y3qfieCrmNvYct8uvtiV41UvlSe6apAfk0fY1FbWx+NwfmpvtTg==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "acorn": "bin/acorn"
      },
      "engines": {
        "node": ">=0.4.0"
      }
    },
    "node_modules/acorn-import-phases": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/acorn-import-phases/-/acorn-import-phases-1.0.4.tgz",
      "integrity": "sha512-wKmbr/DDiIXzEOiWrTTUcDm24kQ2vGfZQvM2fwg2vXqR5uW6aapr7ObPtj1th32b9u90/Pf4AItvdTh42fBmVQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=10.13.0"
      },
      "peerDependencies": {
        "acorn": "^8.14.0"
      }
    },
    "node_modules/adjust-sourcemap-loader": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/adjust-sourcemap-loader/-/adjust-sourcemap-loader-4.0.0.tgz",
      "integrity": "sha512-OXwN5b9pCUXNQHJpwwD2qP40byEmSgzj8B4ydSN0uMNYWiFmJ6x6KwUllMmfk8Rwu/HJDFR7U8ubsWBoN0Xp0A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "loader-utils": "^2.0.0",
        "regex-parser": "^2.2.11"
      },
      "engines": {
        "node": ">=8.9"
      }
    },
    "node_modules/adjust-sourcemap-loader/node_modules/loader-utils": {
      "version": "2.0.4",
      "resolved": "https://registry.npmjs.org/loader-utils/-/loader-utils-2.0.4.tgz",
      "integrity": "sha512-xXqpXoINfFhgua9xiqD8fPFHgkoq1mmmpE92WlDbm9rNRd/EbRb+Gqf908T2DMfuHjjJlksiK2RbHVOdD/MqSw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "big.js": "^5.2.2",
        "emojis-list": "^3.0.0",
        "json5": "^2.1.2"
      },
      "engines": {
        "node": ">=8.9.0"
      }
    },
    "node_modules/agent-base": {
      "version": "7.1.4",
      "resolved": "https://registry.npmjs.org/agent-base/-/agent-base-7.1.4.tgz",
      "integrity": "sha512-MnA+YT8fwfJPgBx3m60MNqakm30XOkyIoH1y6huTQvC0PwZG7ki8NacLBcrPbNoo8vEZy7Jpuk7+jMO+CUovTQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 14"
      }
    },
    "node_modules/ajv": {
      "version": "8.17.1",
      "resolved": "https://registry.npmjs.org/ajv/-/ajv-8.17.1.tgz",
      "integrity": "sha512-B/gBuNg5SiMTrPkC+A2+cW0RszwxYmn6VYxB/inlBStS5nx6xHIt/ehKRhIMhqusl7a8LjQoZnjCs5vhwxOQ1g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "fast-deep-equal": "^3.1.3",
        "fast-uri": "^3.0.1",
        "json-schema-traverse": "^1.0.0",
        "require-from-string": "^2.0.2"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/epoberezkin"
      }
    },
    "node_modules/ajv-formats": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/ajv-formats/-/ajv-formats-3.0.1.tgz",
      "integrity": "sha512-8iUql50EUR+uUcdRQ3HDqa6EVyo3docL8g5WJ3FNcWmu62IbkGUue/pEyLBW8VGKKucTPgqeks4fIU1DA4yowQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ajv": "^8.0.0"
      },
      "peerDependencies": {
        "ajv": "^8.0.0"
      },
      "peerDependenciesMeta": {
        "ajv": {
          "optional": true
        }
      }
    },
    "node_modules/ajv-keywords": {
      "version": "5.1.0",
      "resolved": "https://registry.npmjs.org/ajv-keywords/-/ajv-keywords-5.1.0.tgz",
      "integrity": "sha512-YCS/JNFAUyr5vAuhk1DWm1CBxRHW9LbJ2ozWeemrIqpbsqKjHVxYPyi5GC0rjZIT5JxJ3virVTS8wk4i/Z+krw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "fast-deep-equal": "^3.1.3"
      },
      "peerDependencies": {
        "ajv": "^8.8.2"
      }
    },
    "node_modules/algoliasearch": {
      "version": "5.35.0",
      "resolved": "https://registry.npmjs.org/algoliasearch/-/algoliasearch-5.35.0.tgz",
      "integrity": "sha512-Y+moNhsqgLmvJdgTsO4GZNgsaDWv8AOGAaPeIeHKlDn/XunoAqYbA+XNpBd1dW8GOXAUDyxC9Rxc7AV4kpFcIg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@algolia/abtesting": "1.1.0",
        "@algolia/client-abtesting": "5.35.0",
        "@algolia/client-analytics": "5.35.0",
        "@algolia/client-common": "5.35.0",
        "@algolia/client-insights": "5.35.0",
        "@algolia/client-personalization": "5.35.0",
        "@algolia/client-query-suggestions": "5.35.0",
        "@algolia/client-search": "5.35.0",
        "@algolia/ingestion": "1.35.0",
        "@algolia/monitoring": "1.35.0",
        "@algolia/recommend": "5.35.0",
        "@algolia/requester-browser-xhr": "5.35.0",
        "@algolia/requester-fetch": "5.35.0",
        "@algolia/requester-node-http": "5.35.0"
      },
      "engines": {
        "node": ">= 14.0.0"
      }
    },
    "node_modules/ansi-colors": {
      "version": "4.1.3",
      "resolved": "https://registry.npmjs.org/ansi-colors/-/ansi-colors-4.1.3.tgz",
      "integrity": "sha512-/6w/C21Pm1A7aZitlI5Ni/2J6FFQN8i1Cvz3kHABAAbw93v/NlvKdVOqz7CCWz/3iv/JplRSEEZ83XION15ovw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/ansi-escapes": {
      "version": "7.1.1",
      "resolved": "https://registry.npmjs.org/ansi-escapes/-/ansi-escapes-7.1.1.tgz",
      "integrity": "sha512-Zhl0ErHcSRUaVfGUeUdDuLgpkEo8KIFjB4Y9uAc46ScOpdDiU1Dbyplh7qWJeJ/ZHpbyMSM26+X3BySgnIz40Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "environment": "^1.0.0"
      },
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/ansi-html-community": {
      "version": "0.0.8",
      "resolved": "https://registry.npmjs.org/ansi-html-community/-/ansi-html-community-0.0.8.tgz",
      "integrity": "sha512-1APHAyr3+PCamwNw3bXCPp4HFLONZt/yIH0sZp0/469KWNTEy+qN5jQ3GVX6DMZ1UXAi34yVwtTeaG/HpBuuzw==",
      "dev": true,
      "engines": [
        "node >= 0.8.0"
      ],
      "license": "Apache-2.0",
      "bin": {
        "ansi-html": "bin/ansi-html"
      }
    },
    "node_modules/ansi-regex": {
      "version": "6.2.2",
      "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-6.2.2.tgz",
      "integrity": "sha512-Bq3SmSpyFHaWjPk8If9yc6svM8c56dB5BAtW4Qbw5jHTwwXXcTLoRMkpDJp6VL0XzlWaCHTXrkFURMYmD0sLqg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/chalk/ansi-regex?sponsor=1"
      }
    },
    "node_modules/ansi-styles": {
      "version": "6.2.3",
      "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-6.2.3.tgz",
      "integrity": "sha512-4Dj6M28JB+oAH8kFkTLUo+a2jwOFkuqb3yucU0CANcRRUbxS0cP0nZYCGjcc3BNXwRIsUVmDGgzawme7zvJHvg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/chalk/ansi-styles?sponsor=1"
      }
    },
    "node_modules/anymatch": {
      "version": "3.1.3",
      "resolved": "https://registry.npmjs.org/anymatch/-/anymatch-3.1.3.tgz",
      "integrity": "sha512-KMReFUr0B4t+D+OBkjR3KYqvocp2XaSzO55UcB6mgQMd3KbcE+mWTyvVV7D/zsdEbNnV6acZUutkiHQXvTr1Rw==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "normalize-path": "^3.0.0",
        "picomatch": "^2.0.4"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/anymatch/node_modules/picomatch": {
      "version": "2.3.1",
      "resolved": "https://registry.npmjs.org/picomatch/-/picomatch-2.3.1.tgz",
      "integrity": "sha512-JU3teHTNjmE2VCGFzuY8EXzCDVwEqB2a8fsIvwaStHhAWJEeVd1o1QD80CU6+ZdEXXSLbSsuLwJjkCBWqRQUVA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8.6"
      },
      "funding": {
        "url": "https://github.com/sponsors/jonschlinkert"
      }
    },
    "node_modules/argparse": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/argparse/-/argparse-2.0.1.tgz",
      "integrity": "sha512-8+9WqebbFzpX9OR+Wa6O29asIogeRMzcGtAINdpMHHyAg10f05aSFVBbcEqGf/PXw1EjAZ+q2/bEBg3DvurK3Q==",
      "dev": true,
      "license": "Python-2.0"
    },
    "node_modules/array-flatten": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/array-flatten/-/array-flatten-1.1.1.tgz",
      "integrity": "sha512-PCVAQswWemu6UdxsDFFX/+gVeYqKAod3D3UVm91jHwynguOwAvYPhx8nNlM++NqRcK6CxxpUafjmhIdKiHibqg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/autoprefixer": {
      "version": "10.4.21",
      "resolved": "https://registry.npmjs.org/autoprefixer/-/autoprefixer-10.4.21.tgz",
      "integrity": "sha512-O+A6LWV5LDHSJD3LjHYoNi4VLsj/Whi7k6zG12xTYaU4cQ8oxQGckXNX8cRHK5yOZ/ppVHe0ZBXGzSV9jXdVbQ==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/autoprefixer"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "browserslist": "^4.24.4",
        "caniuse-lite": "^1.0.30001702",
        "fraction.js": "^4.3.7",
        "normalize-range": "^0.1.2",
        "picocolors": "^1.1.1",
        "postcss-value-parser": "^4.2.0"
      },
      "bin": {
        "autoprefixer": "bin/autoprefixer"
      },
      "engines": {
        "node": "^10 || ^12 || >=14"
      },
      "peerDependencies": {
        "postcss": "^8.1.0"
      }
    },
    "node_modules/babel-loader": {
      "version": "10.0.0",
      "resolved": "https://registry.npmjs.org/babel-loader/-/babel-loader-10.0.0.tgz",
      "integrity": "sha512-z8jt+EdS61AMw22nSfoNJAZ0vrtmhPRVi6ghL3rCeRZI8cdNYFiV5xeV3HbE7rlZZNmGH8BVccwWt8/ED0QOHA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "find-up": "^5.0.0"
      },
      "engines": {
        "node": "^18.20.0 || ^20.10.0 || >=22.0.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.12.0",
        "webpack": ">=5.61.0"
      }
    },
    "node_modules/babel-plugin-polyfill-corejs2": {
      "version": "0.4.14",
      "resolved": "https://registry.npmjs.org/babel-plugin-polyfill-corejs2/-/babel-plugin-polyfill-corejs2-0.4.14.tgz",
      "integrity": "sha512-Co2Y9wX854ts6U8gAAPXfn0GmAyctHuK8n0Yhfjd6t30g7yvKjspvvOo9yG+z52PZRgFErt7Ka2pYnXCjLKEpg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/compat-data": "^7.27.7",
        "@babel/helper-define-polyfill-provider": "^0.6.5",
        "semver": "^6.3.1"
      },
      "peerDependencies": {
        "@babel/core": "^7.4.0 || ^8.0.0-0 <8.0.0"
      }
    },
    "node_modules/babel-plugin-polyfill-corejs2/node_modules/semver": {
      "version": "6.3.1",
      "resolved": "https://registry.npmjs.org/semver/-/semver-6.3.1.tgz",
      "integrity": "sha512-BR7VvDCVHO+q2xBEWskxS6DJE1qRnb7DxzUrogb71CWoSficBxYsiAGd+Kl0mmq/MprG9yArRkyrQxTO6XjMzA==",
      "dev": true,
      "license": "ISC",
      "bin": {
        "semver": "bin/semver.js"
      }
    },
    "node_modules/babel-plugin-polyfill-corejs3": {
      "version": "0.13.0",
      "resolved": "https://registry.npmjs.org/babel-plugin-polyfill-corejs3/-/babel-plugin-polyfill-corejs3-0.13.0.tgz",
      "integrity": "sha512-U+GNwMdSFgzVmfhNm8GJUX88AadB3uo9KpJqS3FaqNIPKgySuvMb+bHPsOmmuWyIcuqZj/pzt1RUIUZns4y2+A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-define-polyfill-provider": "^0.6.5",
        "core-js-compat": "^3.43.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.4.0 || ^8.0.0-0 <8.0.0"
      }
    },
    "node_modules/babel-plugin-polyfill-regenerator": {
      "version": "0.6.5",
      "resolved": "https://registry.npmjs.org/babel-plugin-polyfill-regenerator/-/babel-plugin-polyfill-regenerator-0.6.5.tgz",
      "integrity": "sha512-ISqQ2frbiNU9vIJkzg7dlPpznPZ4jOiUQ1uSmB0fEHeowtN3COYRsXr/xexn64NpU13P06jc/L5TgiJXOgrbEg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-define-polyfill-provider": "^0.6.5"
      },
      "peerDependencies": {
        "@babel/core": "^7.4.0 || ^8.0.0-0 <8.0.0"
      }
    },
    "node_modules/balanced-match": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/balanced-match/-/balanced-match-1.0.2.tgz",
      "integrity": "sha512-3oSeUO0TMV67hN1AmbXsK4yaqU7tjiHlbxRDZOpH0KW9+CeX4bRAaX0Anxt0tx2MrpRpWwQaPwIlISEJhYU5Pw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/base64id": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/base64id/-/base64id-2.0.0.tgz",
      "integrity": "sha512-lGe34o6EHj9y3Kts9R4ZYs/Gr+6N7MCaMlIFA3F1R2O5/m7K06AxfSeO5530PEERE6/WyEg3lsuyw4GHlPZHog==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "^4.5.0 || >= 5.9"
      }
    },
    "node_modules/baseline-browser-mapping": {
      "version": "2.8.19",
      "resolved": "https://registry.npmjs.org/baseline-browser-mapping/-/baseline-browser-mapping-2.8.19.tgz",
      "integrity": "sha512-zoKGUdu6vb2jd3YOq0nnhEDQVbPcHhco3UImJrv5dSkvxTc2pl2WjOPsjZXDwPDSl5eghIMuY3R6J9NDKF3KcQ==",
      "dev": true,
      "license": "Apache-2.0",
      "bin": {
        "baseline-browser-mapping": "dist/cli.js"
      }
    },
    "node_modules/batch": {
      "version": "0.6.1",
      "resolved": "https://registry.npmjs.org/batch/-/batch-0.6.1.tgz",
      "integrity": "sha512-x+VAiMRL6UPkx+kudNvxTl6hB2XNNCG2r+7wixVfIYwu/2HKRXimwQyaumLjMveWvT2Hkd/cAJw+QBMfJ/EKVw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/beasties": {
      "version": "0.3.5",
      "resolved": "https://registry.npmjs.org/beasties/-/beasties-0.3.5.tgz",
      "integrity": "sha512-NaWu+f4YrJxEttJSm16AzMIFtVldCvaJ68b1L098KpqXmxt9xOLtKoLkKxb8ekhOrLqEJAbvT6n6SEvB/sac7A==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "css-select": "^6.0.0",
        "css-what": "^7.0.0",
        "dom-serializer": "^2.0.0",
        "domhandler": "^5.0.3",
        "htmlparser2": "^10.0.0",
        "picocolors": "^1.1.1",
        "postcss": "^8.4.49",
        "postcss-media-query-parser": "^0.2.3"
      },
      "engines": {
        "node": ">=14.0.0"
      }
    },
    "node_modules/big.js": {
      "version": "5.2.2",
      "resolved": "https://registry.npmjs.org/big.js/-/big.js-5.2.2.tgz",
      "integrity": "sha512-vyL2OymJxmarO8gxMr0mhChsO9QGwhynfuu4+MHTAW6czfq9humCB7rKpUjDd9YUiDPU4mzpyupFSvOClAwbmQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "*"
      }
    },
    "node_modules/binary-extensions": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/binary-extensions/-/binary-extensions-2.3.0.tgz",
      "integrity": "sha512-Ceh+7ox5qe7LJuLHoY0feh3pHuUDHAcRUeyL2VYghZwfpkNIy/+8Ocg0a3UuSoYzavmylwuLWQOf3hl0jjMMIw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/body-parser": {
      "version": "1.20.3",
      "resolved": "https://registry.npmjs.org/body-parser/-/body-parser-1.20.3.tgz",
      "integrity": "sha512-7rAxByjUMqQ3/bHJy7D6OGXvx/MMc4IqBn/X0fcM1QUcAItpZrBEYhWGem+tzXH90c+G01ypMcYJBO9Y30203g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "bytes": "3.1.2",
        "content-type": "~1.0.5",
        "debug": "2.6.9",
        "depd": "2.0.0",
        "destroy": "1.2.0",
        "http-errors": "2.0.0",
        "iconv-lite": "0.4.24",
        "on-finished": "2.4.1",
        "qs": "6.13.0",
        "raw-body": "2.5.2",
        "type-is": "~1.6.18",
        "unpipe": "1.0.0"
      },
      "engines": {
        "node": ">= 0.8",
        "npm": "1.2.8000 || >= 1.4.16"
      }
    },
    "node_modules/body-parser/node_modules/debug": {
      "version": "2.6.9",
      "resolved": "https://registry.npmjs.org/debug/-/debug-2.6.9.tgz",
      "integrity": "sha512-bC7ElrdJaJnPbAP+1EotYvqZsb3ecl5wi6Bfi6BJTUcNowp6cvspg0jXznRTKDjm/E7AdgFBVeAPVMNcKGsHMA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ms": "2.0.0"
      }
    },
    "node_modules/body-parser/node_modules/iconv-lite": {
      "version": "0.4.24",
      "resolved": "https://registry.npmjs.org/iconv-lite/-/iconv-lite-0.4.24.tgz",
      "integrity": "sha512-v3MXnZAcvnywkTUEZomIActle7RXXeedOR31wwl7VlyoXO4Qi9arvSenNQWne1TcRwhCL1HwLI21bEqdpj8/rA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "safer-buffer": ">= 2.1.2 < 3"
      },
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/body-parser/node_modules/ms": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/ms/-/ms-2.0.0.tgz",
      "integrity": "sha512-Tpp60P6IUJDTuOq/5Z8cdskzJujfwqfOTkrwIwj7IRISpnkJnT6SyJ4PCPnGMoFjC9ddhal5KVIYtAt97ix05A==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/body-parser/node_modules/raw-body": {
      "version": "2.5.2",
      "resolved": "https://registry.npmjs.org/raw-body/-/raw-body-2.5.2.tgz",
      "integrity": "sha512-8zGqypfENjCIqGhgXToC8aB2r7YrBX+AQAfIPs/Mlk+BtPTztOvTS01NRW/3Eh60J+a48lt8qsCzirQ6loCVfA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "bytes": "3.1.2",
        "http-errors": "2.0.0",
        "iconv-lite": "0.4.24",
        "unpipe": "1.0.0"
      },
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/bonjour-service": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/bonjour-service/-/bonjour-service-1.3.0.tgz",
      "integrity": "sha512-3YuAUiSkWykd+2Azjgyxei8OWf8thdn8AITIog2M4UICzoqfjlqr64WIjEXZllf/W6vK1goqleSR6brGomxQqA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "fast-deep-equal": "^3.1.3",
        "multicast-dns": "^7.2.5"
      }
    },
    "node_modules/boolbase": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/boolbase/-/boolbase-1.0.0.tgz",
      "integrity": "sha512-JZOSA7Mo9sNGB8+UjSgzdLtokWAky1zbztM3WRLCbZ70/3cTANmQmOdR7y2g+J0e2WXywy1yS468tY+IruqEww==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/brace-expansion": {
      "version": "1.1.12",
      "resolved": "https://registry.npmjs.org/brace-expansion/-/brace-expansion-1.1.12.tgz",
      "integrity": "sha512-9T9UjW3r0UW5c1Q7GTwllptXwhvYmEzFhzMfZ9H7FQWt+uZePjZPjBP/W1ZEyZ1twGWom5/56TF4lPcqjnDHcg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "balanced-match": "^1.0.0",
        "concat-map": "0.0.1"
      }
    },
    "node_modules/braces": {
      "version": "3.0.3",
      "resolved": "https://registry.npmjs.org/braces/-/braces-3.0.3.tgz",
      "integrity": "sha512-yQbXgO/OSZVD2IsiLlro+7Hf6Q18EJrKSEsdoMzKePKXct3gvD8oLcOQdIzGupr5Fj+EDe8gO/lxc1BzfMpxvA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "fill-range": "^7.1.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/browserslist": {
      "version": "4.26.3",
      "resolved": "https://registry.npmjs.org/browserslist/-/browserslist-4.26.3.tgz",
      "integrity": "sha512-lAUU+02RFBuCKQPj/P6NgjlbCnLBMp4UtgTx7vNHd3XSIJF87s9a5rA3aH2yw3GS9DqZAUbOtZdCCiZeVRqt0w==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/browserslist"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "baseline-browser-mapping": "^2.8.9",
        "caniuse-lite": "^1.0.30001746",
        "electron-to-chromium": "^1.5.227",
        "node-releases": "^2.0.21",
        "update-browserslist-db": "^1.1.3"
      },
      "bin": {
        "browserslist": "cli.js"
      },
      "engines": {
        "node": "^6 || ^7 || ^8 || ^9 || ^10 || ^11 || ^12 || >=13.7"
      }
    },
    "node_modules/buffer-from": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/buffer-from/-/buffer-from-1.1.2.tgz",
      "integrity": "sha512-E+XQCRwSbaaiChtv6k6Dwgc+bx+Bs6vuKJHHl5kox/BaKbhiXzqQOwK4cO22yElGp2OCmjwVhT3HmxgyPGnJfQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/bundle-name": {
      "version": "4.1.0",
      "resolved": "https://registry.npmjs.org/bundle-name/-/bundle-name-4.1.0.tgz",
      "integrity": "sha512-tjwM5exMg6BGRI+kNmTntNsvdZS1X8BFYS6tnJ2hdH0kVxM6/eVZ2xy+FqStSWvYmtfFMDLIxurorHwDKfDz5Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "run-applescript": "^7.0.0"
      },
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/bytes": {
      "version": "3.1.2",
      "resolved": "https://registry.npmjs.org/bytes/-/bytes-3.1.2.tgz",
      "integrity": "sha512-/Nf7TyzTx6S3yRJObOAV7956r8cr2+Oj8AC5dt8wSP3BQAoeX58NoHyCU8P8zGkNXStjTSi6fzO6F0pBdcYbEg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/cacache": {
      "version": "19.0.1",
      "resolved": "https://registry.npmjs.org/cacache/-/cacache-19.0.1.tgz",
      "integrity": "sha512-hdsUxulXCi5STId78vRVYEtDAjq99ICAUktLTeTYsLoTE6Z8dS0c8pWNCxwdrk9YfJeobDZc2Y186hD/5ZQgFQ==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "@npmcli/fs": "^4.0.0",
        "fs-minipass": "^3.0.0",
        "glob": "^10.2.2",
        "lru-cache": "^10.0.1",
        "minipass": "^7.0.3",
        "minipass-collect": "^2.0.1",
        "minipass-flush": "^1.0.5",
        "minipass-pipeline": "^1.2.4",
        "p-map": "^7.0.2",
        "ssri": "^12.0.0",
        "tar": "^7.4.3",
        "unique-filename": "^4.0.0"
      },
      "engines": {
        "node": "^18.17.0 || >=20.5.0"
      }
    },
    "node_modules/cacache/node_modules/brace-expansion": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/brace-expansion/-/brace-expansion-2.0.2.tgz",
      "integrity": "sha512-Jt0vHyM+jmUBqojB7E1NIYadt0vI0Qxjxd2TErW94wDz+E2LAm5vKMXXwg6ZZBTHPuUlDgQHKXvjGBdfcF1ZDQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "balanced-match": "^1.0.0"
      }
    },
    "node_modules/cacache/node_modules/chownr": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/chownr/-/chownr-3.0.0.tgz",
      "integrity": "sha512-+IxzY9BZOQd/XuYPRmrvEVjF/nqj5kgT4kEq7VofrDoM1MxoRjEWkrCC3EtLi59TVawxTAn+orJwFQcrqEN1+g==",
      "dev": true,
      "license": "BlueOak-1.0.0",
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/cacache/node_modules/glob": {
      "version": "10.4.5",
      "resolved": "https://registry.npmjs.org/glob/-/glob-10.4.5.tgz",
      "integrity": "sha512-7Bv8RF0k6xjo7d4A/PxYLbUCfb6c+Vpd2/mB2yRDlew7Jb5hEXiCD9ibfO7wpk8i4sevK6DFny9h7EYbM3/sHg==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "foreground-child": "^3.1.0",
        "jackspeak": "^3.1.2",
        "minimatch": "^9.0.4",
        "minipass": "^7.1.2",
        "package-json-from-dist": "^1.0.0",
        "path-scurry": "^1.11.1"
      },
      "bin": {
        "glob": "dist/esm/bin.mjs"
      },
      "funding": {
        "url": "https://github.com/sponsors/isaacs"
      }
    },
    "node_modules/cacache/node_modules/lru-cache": {
      "version": "10.4.3",
      "resolved": "https://registry.npmjs.org/lru-cache/-/lru-cache-10.4.3.tgz",
      "integrity": "sha512-JNAzZcXrCt42VGLuYz0zfAzDfAvJWW6AfYlDBQyDV5DClI2m5sAmK+OIO7s59XfsRsWHp02jAJrRadPRGTt6SQ==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/cacache/node_modules/minimatch": {
      "version": "9.0.5",
      "resolved": "https://registry.npmjs.org/minimatch/-/minimatch-9.0.5.tgz",
      "integrity": "sha512-G6T0ZX48xgozx7587koeX9Ys2NYy6Gmv//P89sEte9V9whIapMNF4idKxnW2QtCcLiTWlb/wfCabAtAFWhhBow==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "brace-expansion": "^2.0.1"
      },
      "engines": {
        "node": ">=16 || 14 >=14.17"
      },
      "funding": {
        "url": "https://github.com/sponsors/isaacs"
      }
    },
    "node_modules/cacache/node_modules/tar": {
      "version": "7.5.1",
      "resolved": "https://registry.npmjs.org/tar/-/tar-7.5.1.tgz",
      "integrity": "sha512-nlGpxf+hv0v7GkWBK2V9spgactGOp0qvfWRxUMjqHyzrt3SgwE48DIv/FhqPHJYLHpgW1opq3nERbz5Anq7n1g==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "@isaacs/fs-minipass": "^4.0.0",
        "chownr": "^3.0.0",
        "minipass": "^7.1.2",
        "minizlib": "^3.1.0",
        "yallist": "^5.0.0"
      },
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/cacache/node_modules/yallist": {
      "version": "5.0.0",
      "resolved": "https://registry.npmjs.org/yallist/-/yallist-5.0.0.tgz",
      "integrity": "sha512-YgvUTfwqyc7UXVMrB+SImsVYSmTS8X/tSrtdNZMImM+n7+QTriRXyXim0mBrTXNeqzVF0KWGgHPeiyViFFrNDw==",
      "dev": true,
      "license": "BlueOak-1.0.0",
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/call-bind-apply-helpers": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/call-bind-apply-helpers/-/call-bind-apply-helpers-1.0.2.tgz",
      "integrity": "sha512-Sp1ablJ0ivDkSzjcaJdxEunN5/XvksFJ2sMBFfq6x0ryhQV/2b/KwFe21cMpmHtPOSij8K99/wSfoEuTObmuMQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "function-bind": "^1.1.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/call-bound": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/call-bound/-/call-bound-1.0.4.tgz",
      "integrity": "sha512-+ys997U96po4Kx/ABpBCqhA9EuxJaQWDQg7295H4hBphv3IZg0boBKuwYpt4YXp6MZ5AmZQnU/tyMTlRpaSejg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind-apply-helpers": "^1.0.2",
        "get-intrinsic": "^1.3.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/callsites": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/callsites/-/callsites-3.1.0.tgz",
      "integrity": "sha512-P8BjAsXvZS+VIDUI11hHCQEv74YT67YUi5JJFNWIqL235sBmjX4+qx9Muvls5ivyNENctx46xQLQ3aTuE7ssaQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/caniuse-lite": {
      "version": "1.0.30001751",
      "resolved": "https://registry.npmjs.org/caniuse-lite/-/caniuse-lite-1.0.30001751.tgz",
      "integrity": "sha512-A0QJhug0Ly64Ii3eIqHu5X51ebln3k4yTUkY1j8drqpWHVreg/VLijN48cZ1bYPiqOQuqpkIKnzr/Ul8V+p6Cw==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/caniuse-lite"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "CC-BY-4.0"
    },
    "node_modules/chalk": {
      "version": "5.6.2",
      "resolved": "https://registry.npmjs.org/chalk/-/chalk-5.6.2.tgz",
      "integrity": "sha512-7NzBL0rN6fMUW+f7A6Io4h40qQlG+xGmtMxfbnH/K7TAtt8JQWVQK+6g0UXKMeVJoyV5EkkNsErQ8pVD3bLHbA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "^12.17.0 || ^14.13 || >=16.0.0"
      },
      "funding": {
        "url": "https://github.com/chalk/chalk?sponsor=1"
      }
    },
    "node_modules/chardet": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/chardet/-/chardet-2.1.0.tgz",
      "integrity": "sha512-bNFETTG/pM5ryzQ9Ad0lJOTa6HWD/YsScAR3EnCPZRPlQh77JocYktSHOUHelyhm8IARL+o4c4F1bP5KVOjiRA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/chokidar": {
      "version": "4.0.3",
      "resolved": "https://registry.npmjs.org/chokidar/-/chokidar-4.0.3.tgz",
      "integrity": "sha512-Qgzu8kfBvo+cA4962jnP1KkS6Dop5NS6g7R5LFYJr4b8Ub94PPQXUksCw9PvXoeXPRRddRNC5C1JQUR2SMGtnA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "readdirp": "^4.0.1"
      },
      "engines": {
        "node": ">= 14.16.0"
      },
      "funding": {
        "url": "https://paulmillr.com/funding/"
      }
    },
    "node_modules/chownr": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/chownr/-/chownr-2.0.0.tgz",
      "integrity": "sha512-bIomtDF5KGpdogkLd9VspvFzk9KfpyyGlS8YFVZl7TGPBHL5snIOnxeshwVgPteQ9b4Eydl+pVbIyE1DcvCWgQ==",
      "dev": true,
      "license": "ISC",
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/chrome-trace-event": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/chrome-trace-event/-/chrome-trace-event-1.0.4.tgz",
      "integrity": "sha512-rNjApaLzuwaOTjCiT8lSDdGN1APCiqkChLMJxJPWLunPAt5fy8xgU9/jNOchV84wfIxrA0lRQB7oCT8jrn/wrQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.0"
      }
    },
    "node_modules/cli-cursor": {
      "version": "5.0.0",
      "resolved": "https://registry.npmjs.org/cli-cursor/-/cli-cursor-5.0.0.tgz",
      "integrity": "sha512-aCj4O5wKyszjMmDT4tZj93kxyydN/K5zPWSCe6/0AV/AA1pqe5ZBIw0a2ZfPQV7lL5/yb5HsUreJ6UFAF1tEQw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "restore-cursor": "^5.0.0"
      },
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/cli-spinners": {
      "version": "2.9.2",
      "resolved": "https://registry.npmjs.org/cli-spinners/-/cli-spinners-2.9.2.tgz",
      "integrity": "sha512-ywqV+5MmyL4E7ybXgKys4DugZbX0FC6LnwrhjuykIjnK9k8OQacQ7axGKnjDXWNhns0xot3bZI5h55H8yo9cJg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/cli-truncate": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/cli-truncate/-/cli-truncate-4.0.0.tgz",
      "integrity": "sha512-nPdaFdQ0h/GEigbPClz11D0v/ZJEwxmeVZGeMo3Z5StPtUTkA9o1lD6QwoirYiSDzbcwn2XcjwmCp68W1IS4TA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "slice-ansi": "^5.0.0",
        "string-width": "^7.0.0"
      },
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/cli-width": {
      "version": "4.1.0",
      "resolved": "https://registry.npmjs.org/cli-width/-/cli-width-4.1.0.tgz",
      "integrity": "sha512-ouuZd4/dm2Sw5Gmqy6bGyNNNe1qt9RpmxveLSO7KcgsTnU7RXfsw+/bukWGo1abgBiMAic068rclZsO4IWmmxQ==",
      "dev": true,
      "license": "ISC",
      "engines": {
        "node": ">= 12"
      }
    },
    "node_modules/cliui": {
      "version": "9.0.1",
      "resolved": "https://registry.npmjs.org/cliui/-/cliui-9.0.1.tgz",
      "integrity": "sha512-k7ndgKhwoQveBL+/1tqGJYNz097I7WOvwbmmU2AR5+magtbjPWQTS1C5vzGkBC8Ym8UWRzfKUzUUqFLypY4Q+w==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "string-width": "^7.2.0",
        "strip-ansi": "^7.1.0",
        "wrap-ansi": "^9.0.0"
      },
      "engines": {
        "node": ">=20"
      }
    },
    "node_modules/cliui/node_modules/wrap-ansi": {
      "version": "9.0.2",
      "resolved": "https://registry.npmjs.org/wrap-ansi/-/wrap-ansi-9.0.2.tgz",
      "integrity": "sha512-42AtmgqjV+X1VpdOfyTGOYRi0/zsoLqtXQckTmqTeybT+BDIbM/Guxo7x3pE2vtpr1ok6xRqM9OpBe+Jyoqyww==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ansi-styles": "^6.2.1",
        "string-width": "^7.0.0",
        "strip-ansi": "^7.1.0"
      },
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/chalk/wrap-ansi?sponsor=1"
      }
    },
    "node_modules/clone-deep": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/clone-deep/-/clone-deep-4.0.1.tgz",
      "integrity": "sha512-neHB9xuzh/wk0dIHweyAXv2aPGZIVk3pLMe+/RNzINf17fe0OG96QroktYAUm7SM1PBnzTabaLboqqxDyMU+SQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "is-plain-object": "^2.0.4",
        "kind-of": "^6.0.2",
        "shallow-clone": "^3.0.0"
      },
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/clone-deep/node_modules/is-plain-object": {
      "version": "2.0.4",
      "resolved": "https://registry.npmjs.org/is-plain-object/-/is-plain-object-2.0.4.tgz",
      "integrity": "sha512-h5PpgXkWitc38BBMYawTYMWJHFZJVnBquFE57xFpjB8pJFiF6gZ+bU+WyI/yqXiFR5mdLsgYNaPe8uao6Uv9Og==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "isobject": "^3.0.1"
      },
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/color-convert": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/color-convert/-/color-convert-2.0.1.tgz",
      "integrity": "sha512-RRECPsj7iu/xb5oKYcsFHSppFNnsj/52OVTRKb4zP5onXwVF3zVmmToNcOfGC+CRDpfK/U584fMg38ZHCaElKQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "color-name": "~1.1.4"
      },
      "engines": {
        "node": ">=7.0.0"
      }
    },
    "node_modules/color-name": {
      "version": "1.1.4",
      "resolved": "https://registry.npmjs.org/color-name/-/color-name-1.1.4.tgz",
      "integrity": "sha512-dOy+3AuW3a2wNbZHIuMZpTcgjGuLU/uBL/ubcZF9OXbDo8ff4O8yVp5Bf0efS8uEoYo5q4Fx7dY9OgQGXgAsQA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/colorette": {
      "version": "2.0.20",
      "resolved": "https://registry.npmjs.org/colorette/-/colorette-2.0.20.tgz",
      "integrity": "sha512-IfEDxwoWIjkeXL1eXcDiow4UbKjhLdq6/EuSVR9GMN7KVH3r9gQ83e73hsz1Nd1T3ijd5xv1wcWRYO+D6kCI2w==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/commander": {
      "version": "2.20.3",
      "resolved": "https://registry.npmjs.org/commander/-/commander-2.20.3.tgz",
      "integrity": "sha512-GpVkmM8vF2vQUkj2LvZmD35JxeJOLCwJ9cUkugyk2nuhbv3+mJvpLYYt+0+USMxE+oj+ey/lJEnhZw75x/OMcQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/compressible": {
      "version": "2.0.18",
      "resolved": "https://registry.npmjs.org/compressible/-/compressible-2.0.18.tgz",
      "integrity": "sha512-AF3r7P5dWxL8MxyITRMlORQNaOA2IkAFaTr4k7BUumjPtRpGDTZpl0Pb1XCO6JeDCBdp126Cgs9sMxqSjgYyRg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "mime-db": ">= 1.43.0 < 2"
      },
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/compression": {
      "version": "1.8.1",
      "resolved": "https://registry.npmjs.org/compression/-/compression-1.8.1.tgz",
      "integrity": "sha512-9mAqGPHLakhCLeNyxPkK4xVo746zQ/czLH1Ky+vkitMnWfWZps8r0qXuwhwizagCRttsL4lfG4pIOvaWLpAP0w==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "bytes": "3.1.2",
        "compressible": "~2.0.18",
        "debug": "2.6.9",
        "negotiator": "~0.6.4",
        "on-headers": "~1.1.0",
        "safe-buffer": "5.2.1",
        "vary": "~1.1.2"
      },
      "engines": {
        "node": ">= 0.8.0"
      }
    },
    "node_modules/compression/node_modules/debug": {
      "version": "2.6.9",
      "resolved": "https://registry.npmjs.org/debug/-/debug-2.6.9.tgz",
      "integrity": "sha512-bC7ElrdJaJnPbAP+1EotYvqZsb3ecl5wi6Bfi6BJTUcNowp6cvspg0jXznRTKDjm/E7AdgFBVeAPVMNcKGsHMA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ms": "2.0.0"
      }
    },
    "node_modules/compression/node_modules/ms": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/ms/-/ms-2.0.0.tgz",
      "integrity": "sha512-Tpp60P6IUJDTuOq/5Z8cdskzJujfwqfOTkrwIwj7IRISpnkJnT6SyJ4PCPnGMoFjC9ddhal5KVIYtAt97ix05A==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/compression/node_modules/negotiator": {
      "version": "0.6.4",
      "resolved": "https://registry.npmjs.org/negotiator/-/negotiator-0.6.4.tgz",
      "integrity": "sha512-myRT3DiWPHqho5PrJaIRyaMv2kgYf0mUVgBNOYMuCH5Ki1yEiQaf/ZJuQ62nvpc44wL5WDbTX7yGJi1Neevw8w==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/concat-map": {
      "version": "0.0.1",
      "resolved": "https://registry.npmjs.org/concat-map/-/concat-map-0.0.1.tgz",
      "integrity": "sha512-/Srv4dswyQNBfohGpz9o6Yb3Gz3SrUDqBH5rTuhGR7ahtlbYKnVxw2bCFMRljaA7EXHaXZ8wsHdodFvbkhKmqg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/connect": {
      "version": "3.7.0",
      "resolved": "https://registry.npmjs.org/connect/-/connect-3.7.0.tgz",
      "integrity": "sha512-ZqRXc+tZukToSNmh5C2iWMSoV3X1YUcPbqEM4DkEG5tNQXrQUZCNVGGv3IuicnkMtPfGf3Xtp8WCXs295iQ1pQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "debug": "2.6.9",
        "finalhandler": "1.1.2",
        "parseurl": "~1.3.3",
        "utils-merge": "1.0.1"
      },
      "engines": {
        "node": ">= 0.10.0"
      }
    },
    "node_modules/connect-history-api-fallback": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/connect-history-api-fallback/-/connect-history-api-fallback-2.0.0.tgz",
      "integrity": "sha512-U73+6lQFmfiNPrYbXqr6kZ1i1wiRqXnp2nhMsINseWXO8lDau0LGEffJ8kQi4EjLZympVgRdvqjAgiZ1tgzDDA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.8"
      }
    },
    "node_modules/connect/node_modules/debug": {
      "version": "2.6.9",
      "resolved": "https://registry.npmjs.org/debug/-/debug-2.6.9.tgz",
      "integrity": "sha512-bC7ElrdJaJnPbAP+1EotYvqZsb3ecl5wi6Bfi6BJTUcNowp6cvspg0jXznRTKDjm/E7AdgFBVeAPVMNcKGsHMA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ms": "2.0.0"
      }
    },
    "node_modules/connect/node_modules/encodeurl": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/encodeurl/-/encodeurl-1.0.2.tgz",
      "integrity": "sha512-TPJXq8JqFaVYm2CWmPvnP2Iyo4ZSM7/QKcSmuMLDObfpH5fi7RUGmd/rTDf+rut/saiDiQEeVTNgAmJEdAOx0w==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/connect/node_modules/finalhandler": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/finalhandler/-/finalhandler-1.1.2.tgz",
      "integrity": "sha512-aAWcW57uxVNrQZqFXjITpW3sIUQmHGG3qSb9mUah9MgMC4NeWhNOlNjXEYq3HjRAvL6arUviZGGJsBg6z0zsWA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "debug": "2.6.9",
        "encodeurl": "~1.0.2",
        "escape-html": "~1.0.3",
        "on-finished": "~2.3.0",
        "parseurl": "~1.3.3",
        "statuses": "~1.5.0",
        "unpipe": "~1.0.0"
      },
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/connect/node_modules/ms": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/ms/-/ms-2.0.0.tgz",
      "integrity": "sha512-Tpp60P6IUJDTuOq/5Z8cdskzJujfwqfOTkrwIwj7IRISpnkJnT6SyJ4PCPnGMoFjC9ddhal5KVIYtAt97ix05A==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/connect/node_modules/on-finished": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/on-finished/-/on-finished-2.3.0.tgz",
      "integrity": "sha512-ikqdkGAAyf/X/gPhXGvfgAytDZtDbr+bkNUJ0N9h5MI/dmdgCs3l6hoHrcUv41sRKew3jIwrp4qQDXiK99Utww==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ee-first": "1.1.1"
      },
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/connect/node_modules/statuses": {
      "version": "1.5.0",
      "resolved": "https://registry.npmjs.org/statuses/-/statuses-1.5.0.tgz",
      "integrity": "sha512-OpZ3zP+jT1PI7I8nemJX4AKmAX070ZkYPVWV/AaKTJl+tXCTGyVdC1a4SL8RUQYEwk/f34ZX8UTykN68FwrqAA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/content-disposition": {
      "version": "0.5.4",
      "resolved": "https://registry.npmjs.org/content-disposition/-/content-disposition-0.5.4.tgz",
      "integrity": "sha512-FveZTNuGw04cxlAiWbzi6zTAL/lhehaWbTtgluJh4/E95DqMwTmha3KZN1aAWA8cFIhHzMZUvLevkw5Rqk+tSQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "safe-buffer": "5.2.1"
      },
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/content-type": {
      "version": "1.0.5",
      "resolved": "https://registry.npmjs.org/content-type/-/content-type-1.0.5.tgz",
      "integrity": "sha512-nTjqfcBFEipKdXCv4YDQWCfmcLZKm81ldF0pAopTvyrFGVbcR6P/VAAd5G7N+0tTr8QqiU0tFadD6FK4NtJwOA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/convert-source-map": {
      "version": "1.9.0",
      "resolved": "https://registry.npmjs.org/convert-source-map/-/convert-source-map-1.9.0.tgz",
      "integrity": "sha512-ASFBup0Mz1uyiIjANan1jzLQami9z1PoYSZCiiYW2FczPbenXc45FZdBZLzOT+r6+iciuEModtmCti+hjaAk0A==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/cookie": {
      "version": "0.7.2",
      "resolved": "https://registry.npmjs.org/cookie/-/cookie-0.7.2.tgz",
      "integrity": "sha512-yki5XnKuf750l50uGTllt6kKILY4nQ1eNIQatoXEByZ5dWgnKqbnqmTrBE5B4N7lrMJKQ2ytWMiTO2o0v6Ew/w==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/cookie-signature": {
      "version": "1.0.6",
      "resolved": "https://registry.npmjs.org/cookie-signature/-/cookie-signature-1.0.6.tgz",
      "integrity": "sha512-QADzlaHc8icV8I7vbaJXJwod9HWYp8uCqf1xa4OfNu1T7JVxQIrUgOWtHdNDtPiywmFbiS12VjotIXLrKM3orQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/copy-anything": {
      "version": "2.0.6",
      "resolved": "https://registry.npmjs.org/copy-anything/-/copy-anything-2.0.6.tgz",
      "integrity": "sha512-1j20GZTsvKNkc4BY3NpMOM8tt///wY3FpIzozTOFO2ffuZcV61nojHXVKIy3WM+7ADCy5FVhdZYHYDdgTU0yJw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "is-what": "^3.14.1"
      },
      "funding": {
        "url": "https://github.com/sponsors/mesqueeb"
      }
    },
    "node_modules/copy-webpack-plugin": {
      "version": "13.0.1",
      "resolved": "https://registry.npmjs.org/copy-webpack-plugin/-/copy-webpack-plugin-13.0.1.tgz",
      "integrity": "sha512-J+YV3WfhY6W/Xf9h+J1znYuqTye2xkBUIGyTPWuBAT27qajBa5mR4f8WBmfDY3YjRftT2kqZZiLi1qf0H+UOFw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "glob-parent": "^6.0.1",
        "normalize-path": "^3.0.0",
        "schema-utils": "^4.2.0",
        "serialize-javascript": "^6.0.2",
        "tinyglobby": "^0.2.12"
      },
      "engines": {
        "node": ">= 18.12.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/webpack"
      },
      "peerDependencies": {
        "webpack": "^5.1.0"
      }
    },
    "node_modules/core-js-compat": {
      "version": "3.46.0",
      "resolved": "https://registry.npmjs.org/core-js-compat/-/core-js-compat-3.46.0.tgz",
      "integrity": "sha512-p9hObIIEENxSV8xIu+V68JjSeARg6UVMG5mR+JEUguG3sI6MsiS1njz2jHmyJDvA+8jX/sytkBHup6kxhM9law==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "browserslist": "^4.26.3"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/core-js"
      }
    },
    "node_modules/core-util-is": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/core-util-is/-/core-util-is-1.0.3.tgz",
      "integrity": "sha512-ZQBvi1DcpJ4GDqanjucZ2Hj3wEO5pZDS89BWbkcrvdxksJorwUDDZamX9ldFkp9aw2lmBDLgkObEA4DWNJ9FYQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/cors": {
      "version": "2.8.5",
      "resolved": "https://registry.npmjs.org/cors/-/cors-2.8.5.tgz",
      "integrity": "sha512-KIHbLJqu73RGr/hnbrO9uBeixNGuvSQjul/jdFvS/KFSIH1hWVd1ng7zOHx+YrEfInLG7q4n6GHQ9cDtxv/P6g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "object-assign": "^4",
        "vary": "^1"
      },
      "engines": {
        "node": ">= 0.10"
      }
    },
    "node_modules/cosmiconfig": {
      "version": "9.0.0",
      "resolved": "https://registry.npmjs.org/cosmiconfig/-/cosmiconfig-9.0.0.tgz",
      "integrity": "sha512-itvL5h8RETACmOTFc4UfIyB2RfEHi71Ax6E/PivVxq9NseKbOWpeyHEOIbmAw1rs8Ak0VursQNww7lf7YtUwzg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "env-paths": "^2.2.1",
        "import-fresh": "^3.3.0",
        "js-yaml": "^4.1.0",
        "parse-json": "^5.2.0"
      },
      "engines": {
        "node": ">=14"
      },
      "funding": {
        "url": "https://github.com/sponsors/d-fischer"
      },
      "peerDependencies": {
        "typescript": ">=4.9.5"
      },
      "peerDependenciesMeta": {
        "typescript": {
          "optional": true
        }
      }
    },
    "node_modules/cross-spawn": {
      "version": "7.0.6",
      "resolved": "https://registry.npmjs.org/cross-spawn/-/cross-spawn-7.0.6.tgz",
      "integrity": "sha512-uV2QOWP2nWzsy2aMp8aRibhi9dlzF5Hgh5SHaB9OiTGEyDTiJJyx0uy51QXdyWbtAHNua4XJzUKca3OzKUd3vA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "path-key": "^3.1.0",
        "shebang-command": "^2.0.0",
        "which": "^2.0.1"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/css-loader": {
      "version": "7.1.2",
      "resolved": "https://registry.npmjs.org/css-loader/-/css-loader-7.1.2.tgz",
      "integrity": "sha512-6WvYYn7l/XEGN8Xu2vWFt9nVzrCn39vKyTEFf/ExEyoksJjjSZV/0/35XPlMbpnr6VGhZIUg5yJrL8tGfes/FA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "icss-utils": "^5.1.0",
        "postcss": "^8.4.33",
        "postcss-modules-extract-imports": "^3.1.0",
        "postcss-modules-local-by-default": "^4.0.5",
        "postcss-modules-scope": "^3.2.0",
        "postcss-modules-values": "^4.0.0",
        "postcss-value-parser": "^4.2.0",
        "semver": "^7.5.4"
      },
      "engines": {
        "node": ">= 18.12.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/webpack"
      },
      "peerDependencies": {
        "@rspack/core": "0.x || 1.x",
        "webpack": "^5.27.0"
      },
      "peerDependenciesMeta": {
        "@rspack/core": {
          "optional": true
        },
        "webpack": {
          "optional": true
        }
      }
    },
    "node_modules/css-select": {
      "version": "6.0.0",
      "resolved": "https://registry.npmjs.org/css-select/-/css-select-6.0.0.tgz",
      "integrity": "sha512-rZZVSLle8v0+EY8QAkDWrKhpgt6SA5OtHsgBnsj6ZaLb5dmDVOWUDtQitd9ydxxvEjhewNudS6eTVU7uOyzvXw==",
      "dev": true,
      "license": "BSD-2-Clause",
      "dependencies": {
        "boolbase": "^1.0.0",
        "css-what": "^7.0.0",
        "domhandler": "^5.0.3",
        "domutils": "^3.2.2",
        "nth-check": "^2.1.1"
      },
      "funding": {
        "url": "https://github.com/sponsors/fb55"
      }
    },
    "node_modules/css-what": {
      "version": "7.0.0",
      "resolved": "https://registry.npmjs.org/css-what/-/css-what-7.0.0.tgz",
      "integrity": "sha512-wD5oz5xibMOPHzy13CyGmogB3phdvcDaB5t0W/Nr5Z2O/agcB8YwOz6e2Lsp10pNDzBoDO9nVa3RGs/2BttpHQ==",
      "dev": true,
      "license": "BSD-2-Clause",
      "engines": {
        "node": ">= 6"
      },
      "funding": {
        "url": "https://github.com/sponsors/fb55"
      }
    },
    "node_modules/cssesc": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/cssesc/-/cssesc-3.0.0.tgz",
      "integrity": "sha512-/Tb/JcjK111nNScGob5MNtsntNM1aCNUDipB/TkwZFhyDrrE47SOx/18wF2bbjgc3ZzCSKW1T5nt5EbFoAz/Vg==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "cssesc": "bin/cssesc"
      },
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/custom-event": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/custom-event/-/custom-event-1.0.1.tgz",
      "integrity": "sha512-GAj5FOq0Hd+RsCGVJxZuKaIDXDf3h6GQoNEjFgbLLI/trgtavwUbSnZ5pVfg27DVCaWjIohryS0JFwIJyT2cMg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/date-format": {
      "version": "4.0.14",
      "resolved": "https://registry.npmjs.org/date-format/-/date-format-4.0.14.tgz",
      "integrity": "sha512-39BOQLs9ZjKh0/patS9nrT8wc3ioX3/eA/zgbKNopnF2wCqJEoxywwwElATYvRsXdnOxA/OQeQoFZ3rFjVajhg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=4.0"
      }
    },
    "node_modules/debug": {
      "version": "4.4.3",
      "resolved": "https://registry.npmjs.org/debug/-/debug-4.4.3.tgz",
      "integrity": "sha512-RGwwWnwQvkVfavKVt22FGLw+xYSdzARwm0ru6DhTVA3umU5hZc28V3kO4stgYryrTlLpuvgI9GiijltAjNbcqA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ms": "^2.1.3"
      },
      "engines": {
        "node": ">=6.0"
      },
      "peerDependenciesMeta": {
        "supports-color": {
          "optional": true
        }
      }
    },
    "node_modules/default-browser": {
      "version": "5.2.1",
      "resolved": "https://registry.npmjs.org/default-browser/-/default-browser-5.2.1.tgz",
      "integrity": "sha512-WY/3TUME0x3KPYdRRxEJJvXRHV4PyPoUsxtZa78lwItwRQRHhd2U9xOscaT/YTf8uCXIAjeJOFBVEh/7FtD8Xg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "bundle-name": "^4.1.0",
        "default-browser-id": "^5.0.0"
      },
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/default-browser-id": {
      "version": "5.0.0",
      "resolved": "https://registry.npmjs.org/default-browser-id/-/default-browser-id-5.0.0.tgz",
      "integrity": "sha512-A6p/pu/6fyBcA1TRz/GqWYPViplrftcW2gZC9q79ngNCKAeR/X3gcEdXQHl4KNXV+3wgIJ1CPkJQ3IHM6lcsyA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/define-lazy-prop": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/define-lazy-prop/-/define-lazy-prop-3.0.0.tgz",
      "integrity": "sha512-N+MeXYoqr3pOgn8xfyRPREN7gHakLYjhsHhWGT3fWAiL4IkAt0iDw14QiiEm2bE30c5XX5q0FtAA3CK5f9/BUg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/depd": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/depd/-/depd-2.0.0.tgz",
      "integrity": "sha512-g7nH6P6dyDioJogAAGprGpCtVImJhpPk/roCzdb3fIh61/s/nPsfR6onyMwkCAR/OlC3yBC0lESvUoQEAssIrw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/destroy": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/destroy/-/destroy-1.2.0.tgz",
      "integrity": "sha512-2sJGJTaXIIaR1w4iJSNoN0hnMY7Gpc/n8D4qSCJw8QqFWXf7cuAgnEHxBpweaVcPevC2l3KpjYCx3NypQQgaJg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.8",
        "npm": "1.2.8000 || >= 1.4.16"
      }
    },
    "node_modules/detect-libc": {
      "version": "2.1.2",
      "resolved": "https://registry.npmjs.org/detect-libc/-/detect-libc-2.1.2.tgz",
      "integrity": "sha512-Btj2BOOO83o3WyH59e8MgXsxEQVcarkUOpEYrubB0urwnN10yQ364rsiByU11nZlqWYZm05i/of7io4mzihBtQ==",
      "dev": true,
      "license": "Apache-2.0",
      "optional": true,
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/detect-node": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/detect-node/-/detect-node-2.1.0.tgz",
      "integrity": "sha512-T0NIuQpnTvFDATNuHN5roPwSBG83rFsuO+MXXH9/3N1eFbn4wcPjttvjMLEPWJ0RGUYgQE7cGgS3tNxbqCGM7g==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/di": {
      "version": "0.0.1",
      "resolved": "https://registry.npmjs.org/di/-/di-0.0.1.tgz",
      "integrity": "sha512-uJaamHkagcZtHPqCIHZxnFrXlunQXgBOsZSUOWwFw31QJCAbyTBoHMW75YOTur5ZNx8pIeAKgf6GWIgaqqiLhA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/dns-packet": {
      "version": "5.6.1",
      "resolved": "https://registry.npmjs.org/dns-packet/-/dns-packet-5.6.1.tgz",
      "integrity": "sha512-l4gcSouhcgIKRvyy99RNVOgxXiicE+2jZoNmaNmZ6JXiGajBOJAesk1OBlJuM5k2c+eudGdLxDqXuPCKIj6kpw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@leichtgewicht/ip-codec": "^2.0.1"
      },
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/dom-serialize": {
      "version": "2.2.1",
      "resolved": "https://registry.npmjs.org/dom-serialize/-/dom-serialize-2.2.1.tgz",
      "integrity": "sha512-Yra4DbvoW7/Z6LBN560ZwXMjoNOSAN2wRsKFGc4iBeso+mpIA6qj1vfdf9HpMaKAqG6wXTy+1SYEzmNpKXOSsQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "custom-event": "~1.0.0",
        "ent": "~2.2.0",
        "extend": "^3.0.0",
        "void-elements": "^2.0.0"
      }
    },
    "node_modules/dom-serializer": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/dom-serializer/-/dom-serializer-2.0.0.tgz",
      "integrity": "sha512-wIkAryiqt/nV5EQKqQpo3SToSOV9J0DnbJqwK7Wv/Trc92zIAYZ4FlMu+JPFW1DfGFt81ZTCGgDEabffXeLyJg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "domelementtype": "^2.3.0",
        "domhandler": "^5.0.2",
        "entities": "^4.2.0"
      },
      "funding": {
        "url": "https://github.com/cheeriojs/dom-serializer?sponsor=1"
      }
    },
    "node_modules/domelementtype": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/domelementtype/-/domelementtype-2.3.0.tgz",
      "integrity": "sha512-OLETBj6w0OsagBwdXnPdN0cnMfF9opN69co+7ZrbfPGrdpPVNBUj02spi6B1N7wChLQiPn4CSH/zJvXw56gmHw==",
      "dev": true,
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/fb55"
        }
      ],
      "license": "BSD-2-Clause"
    },
    "node_modules/domhandler": {
      "version": "5.0.3",
      "resolved": "https://registry.npmjs.org/domhandler/-/domhandler-5.0.3.tgz",
      "integrity": "sha512-cgwlv/1iFQiFnU96XXgROh8xTeetsnJiDsTc7TYCLFd9+/WNkIqPTxiM/8pSd8VIrhXGTf1Ny1q1hquVqDJB5w==",
      "dev": true,
      "license": "BSD-2-Clause",
      "dependencies": {
        "domelementtype": "^2.3.0"
      },
      "engines": {
        "node": ">= 4"
      },
      "funding": {
        "url": "https://github.com/fb55/domhandler?sponsor=1"
      }
    },
    "node_modules/domutils": {
      "version": "3.2.2",
      "resolved": "https://registry.npmjs.org/domutils/-/domutils-3.2.2.tgz",
      "integrity": "sha512-6kZKyUajlDuqlHKVX1w7gyslj9MPIXzIFiz/rGu35uC1wMi+kMhQwGhl4lt9unC9Vb9INnY9Z3/ZA3+FhASLaw==",
      "dev": true,
      "license": "BSD-2-Clause",
      "dependencies": {
        "dom-serializer": "^2.0.0",
        "domelementtype": "^2.3.0",
        "domhandler": "^5.0.3"
      },
      "funding": {
        "url": "https://github.com/fb55/domutils?sponsor=1"
      }
    },
    "node_modules/dunder-proto": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/dunder-proto/-/dunder-proto-1.0.1.tgz",
      "integrity": "sha512-KIN/nDJBQRcXw0MLVhZE9iQHmG68qAVIBg9CqmUYjmQIhgij9U5MFvrqkUL5FbtyyzZuOeOt0zdeRe4UY7ct+A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind-apply-helpers": "^1.0.1",
        "es-errors": "^1.3.0",
        "gopd": "^1.2.0"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/eastasianwidth": {
      "version": "0.2.0",
      "resolved": "https://registry.npmjs.org/eastasianwidth/-/eastasianwidth-0.2.0.tgz",
      "integrity": "sha512-I88TYZWc9XiYHRQ4/3c5rjjfgkjhLyW2luGIheGERbNQ6OY7yTybanSpDXZa8y7VUP9YmDcYa+eyq4ca7iLqWA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/ee-first": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/ee-first/-/ee-first-1.1.1.tgz",
      "integrity": "sha512-WMwm9LhRUo+WUaRN+vRuETqG89IgZphVSNkdFgeb6sS/E4OrDIN7t48CAewSHXc6C8lefD8KKfr5vY61brQlow==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/electron-to-chromium": {
      "version": "1.5.237",
      "resolved": "https://registry.npmjs.org/electron-to-chromium/-/electron-to-chromium-1.5.237.tgz",
      "integrity": "sha512-icUt1NvfhGLar5lSWH3tHNzablaA5js3HVHacQimfP8ViEBOQv+L7DKEuHdbTZ0SKCO1ogTJTIL1Gwk9S6Qvcg==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/emoji-regex": {
      "version": "10.6.0",
      "resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-10.6.0.tgz",
      "integrity": "sha512-toUI84YS5YmxW219erniWD0CIVOo46xGKColeNQRgOzDorgBi1v4D71/OFzgD9GO2UGKIv1C3Sp8DAn0+j5w7A==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/emojis-list": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/emojis-list/-/emojis-list-3.0.0.tgz",
      "integrity": "sha512-/kyM18EfinwXZbno9FyUGeFh87KC8HRQBQGildHZbEuRyWFOmv1U10o9BBp8XVZDVNNuQKyIGIu5ZYAAXJ0V2Q==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 4"
      }
    },
    "node_modules/encodeurl": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/encodeurl/-/encodeurl-2.0.0.tgz",
      "integrity": "sha512-Q0n9HRi4m6JuGIV1eFlmvJB7ZEVxu93IrMyiMsGC0lrMJMWzRgx6WGquyfQgZVb31vhGgXnfmPNNXmxnOkRBrg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/encoding": {
      "version": "0.1.13",
      "resolved": "https://registry.npmjs.org/encoding/-/encoding-0.1.13.tgz",
      "integrity": "sha512-ETBauow1T35Y/WZMkio9jiM0Z5xjHHmJ4XmjZOq1l/dXz3lr2sRn87nJy20RupqSh1F2m3HHPSp8ShIPQJrJ3A==",
      "dev": true,
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "iconv-lite": "^0.6.2"
      }
    },
    "node_modules/encoding/node_modules/iconv-lite": {
      "version": "0.6.3",
      "resolved": "https://registry.npmjs.org/iconv-lite/-/iconv-lite-0.6.3.tgz",
      "integrity": "sha512-4fCk79wshMdzMp2rH06qWrJE4iolqLhCUH+OiuIgU++RB0+94NlDL81atO7GX55uUKueo0txHNtvEyI6D7WdMw==",
      "dev": true,
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "safer-buffer": ">= 2.1.2 < 3.0.0"
      },
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/engine.io": {
      "version": "6.6.4",
      "resolved": "https://registry.npmjs.org/engine.io/-/engine.io-6.6.4.tgz",
      "integrity": "sha512-ZCkIjSYNDyGn0R6ewHDtXgns/Zre/NT6Agvq1/WobF7JXgFff4SeDroKiCO3fNJreU9YG429Sc81o4w5ok/W5g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/cors": "^2.8.12",
        "@types/node": ">=10.0.0",
        "accepts": "~1.3.4",
        "base64id": "2.0.0",
        "cookie": "~0.7.2",
        "cors": "~2.8.5",
        "debug": "~4.3.1",
        "engine.io-parser": "~5.2.1",
        "ws": "~8.17.1"
      },
      "engines": {
        "node": ">=10.2.0"
      }
    },
    "node_modules/engine.io-parser": {
      "version": "5.2.3",
      "resolved": "https://registry.npmjs.org/engine.io-parser/-/engine.io-parser-5.2.3.tgz",
      "integrity": "sha512-HqD3yTBfnBxIrbnM1DoD6Pcq8NECnh8d4As1Qgh0z5Gg3jRRIqijury0CL3ghu/edArpUYiYqQiDUQBIs4np3Q==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=10.0.0"
      }
    },
    "node_modules/engine.io/node_modules/debug": {
      "version": "4.3.7",
      "resolved": "https://registry.npmjs.org/debug/-/debug-4.3.7.tgz",
      "integrity": "sha512-Er2nc/H7RrMXZBFCEim6TCmMk02Z8vLC2Rbi1KEBggpo0fS6l0S1nnapwmIi3yW/+GOJap1Krg4w0Hg80oCqgQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ms": "^2.1.3"
      },
      "engines": {
        "node": ">=6.0"
      },
      "peerDependenciesMeta": {
        "supports-color": {
          "optional": true
        }
      }
    },
    "node_modules/enhanced-resolve": {
      "version": "5.18.3",
      "resolved": "https://registry.npmjs.org/enhanced-resolve/-/enhanced-resolve-5.18.3.tgz",
      "integrity": "sha512-d4lC8xfavMeBjzGr2vECC3fsGXziXZQyJxD868h2M/mBI3PwAuODxAkLkq5HYuvrPYcUtiLzsTo8U3PgX3Ocww==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "graceful-fs": "^4.2.4",
        "tapable": "^2.2.0"
      },
      "engines": {
        "node": ">=10.13.0"
      }
    },
    "node_modules/ent": {
      "version": "2.2.2",
      "resolved": "https://registry.npmjs.org/ent/-/ent-2.2.2.tgz",
      "integrity": "sha512-kKvD1tO6BM+oK9HzCPpUdRb4vKFQY/FPTFmurMvh6LlN68VMrdj77w8yp51/kDbpkFOS9J8w5W6zIzgM2H8/hw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.3",
        "es-errors": "^1.3.0",
        "punycode": "^1.4.1",
        "safe-regex-test": "^1.1.0"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/entities": {
      "version": "4.5.0",
      "resolved": "https://registry.npmjs.org/entities/-/entities-4.5.0.tgz",
      "integrity": "sha512-V0hjH4dGPh9Ao5p0MoRY6BVqtwCjhz6vI5LT8AJ55H+4g9/4vbHx1I54fS0XuclLhDHArPQCiMjDxjaL8fPxhw==",
      "dev": true,
      "license": "BSD-2-Clause",
      "engines": {
        "node": ">=0.12"
      },
      "funding": {
        "url": "https://github.com/fb55/entities?sponsor=1"
      }
    },
    "node_modules/env-paths": {
      "version": "2.2.1",
      "resolved": "https://registry.npmjs.org/env-paths/-/env-paths-2.2.1.tgz",
      "integrity": "sha512-+h1lkLKhZMTYjog1VEpJNG7NZJWcuc2DDk/qsqSTRRCOXiLjeQ1d1/udrUGhqMxUgAlwKNZ0cf2uqan5GLuS2A==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/environment": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/environment/-/environment-1.1.0.tgz",
      "integrity": "sha512-xUtoPkMggbz0MPyPiIWr1Kp4aeWJjDZ6SMvURhimjdZgsRuDplF5/s9hcgGhyXMhs+6vpnuoiZ2kFiu3FMnS8Q==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/err-code": {
      "version": "2.0.3",
      "resolved": "https://registry.npmjs.org/err-code/-/err-code-2.0.3.tgz",
      "integrity": "sha512-2bmlRpNKBxT/CRmPOlyISQpNj+qSeYvcym/uT0Jx2bMOlKLtSy1ZmLuVxSEKKyor/N5yhvp/ZiG1oE3DEYMSFA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/errno": {
      "version": "0.1.8",
      "resolved": "https://registry.npmjs.org/errno/-/errno-0.1.8.tgz",
      "integrity": "sha512-dJ6oBr5SQ1VSd9qkk7ByRgb/1SH4JZjCHSW/mr63/QcXO9zLVxvJ6Oy13nio03rxpSnVDDjFor75SjVeZWPW/A==",
      "dev": true,
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "prr": "~1.0.1"
      },
      "bin": {
        "errno": "cli.js"
      }
    },
    "node_modules/error-ex": {
      "version": "1.3.4",
      "resolved": "https://registry.npmjs.org/error-ex/-/error-ex-1.3.4.tgz",
      "integrity": "sha512-sqQamAnR14VgCr1A618A3sGrygcpK+HEbenA/HiEAkkUwcZIIB/tgWqHFxWgOyDh4nB4JCRimh79dR5Ywc9MDQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "is-arrayish": "^0.2.1"
      }
    },
    "node_modules/es-define-property": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/es-define-property/-/es-define-property-1.0.1.tgz",
      "integrity": "sha512-e3nRfgfUZ4rNGL232gUgX06QNyyez04KdjFrF+LTRoOXmrOgFKDg4BCdsjW8EnT69eqdYGmRpJwiPVYNrCaW3g==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/es-errors": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/es-errors/-/es-errors-1.3.0.tgz",
      "integrity": "sha512-Zf5H2Kxt2xjTvbJvP2ZWLEICxA6j+hAmMzIlypy4xcBg1vKVnx89Wy0GbS+kf5cwCVFFzdCFh2XSCFNULS6csw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/es-module-lexer": {
      "version": "1.7.0",
      "resolved": "https://registry.npmjs.org/es-module-lexer/-/es-module-lexer-1.7.0.tgz",
      "integrity": "sha512-jEQoCwk8hyb2AZziIOLhDqpm5+2ww5uIE6lkO/6jcOCusfk6LhMHpXXfBLXTZ7Ydyt0j4VoUQv6uGNYbdW+kBA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/es-object-atoms": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/es-object-atoms/-/es-object-atoms-1.1.1.tgz",
      "integrity": "sha512-FGgH2h8zKNim9ljj7dankFPcICIK9Cp5bm+c2gQSYePhpaG5+esrLODihIorn+Pe6FGJzWhXQotPv73jTaldXA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/esbuild": {
      "version": "0.25.9",
      "resolved": "https://registry.npmjs.org/esbuild/-/esbuild-0.25.9.tgz",
      "integrity": "sha512-CRbODhYyQx3qp7ZEwzxOk4JBqmD/seJrzPa/cGjY1VtIn5E09Oi9/dB4JwctnfZ8Q8iT7rioVv5k/FNT/uf54g==",
      "dev": true,
      "hasInstallScript": true,
      "license": "MIT",
      "bin": {
        "esbuild": "bin/esbuild"
      },
      "engines": {
        "node": ">=18"
      },
      "optionalDependencies": {
        "@esbuild/aix-ppc64": "0.25.9",
        "@esbuild/android-arm": "0.25.9",
        "@esbuild/android-arm64": "0.25.9",
        "@esbuild/android-x64": "0.25.9",
        "@esbuild/darwin-arm64": "0.25.9",
        "@esbuild/darwin-x64": "0.25.9",
        "@esbuild/freebsd-arm64": "0.25.9",
        "@esbuild/freebsd-x64": "0.25.9",
        "@esbuild/linux-arm": "0.25.9",
        "@esbuild/linux-arm64": "0.25.9",
        "@esbuild/linux-ia32": "0.25.9",
        "@esbuild/linux-loong64": "0.25.9",
        "@esbuild/linux-mips64el": "0.25.9",
        "@esbuild/linux-ppc64": "0.25.9",
        "@esbuild/linux-riscv64": "0.25.9",
        "@esbuild/linux-s390x": "0.25.9",
        "@esbuild/linux-x64": "0.25.9",
        "@esbuild/netbsd-arm64": "0.25.9",
        "@esbuild/netbsd-x64": "0.25.9",
        "@esbuild/openbsd-arm64": "0.25.9",
        "@esbuild/openbsd-x64": "0.25.9",
        "@esbuild/openharmony-arm64": "0.25.9",
        "@esbuild/sunos-x64": "0.25.9",
        "@esbuild/win32-arm64": "0.25.9",
        "@esbuild/win32-ia32": "0.25.9",
        "@esbuild/win32-x64": "0.25.9"
      }
    },
    "node_modules/esbuild-wasm": {
      "version": "0.25.9",
      "resolved": "https://registry.npmjs.org/esbuild-wasm/-/esbuild-wasm-0.25.9.tgz",
      "integrity": "sha512-Jpv5tCSwQg18aCqCRD3oHIX/prBhXMDapIoG//A+6+dV0e7KQMGFg85ihJ5T1EeMjbZjON3TqFy0VrGAnIHLDA==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "esbuild": "bin/esbuild"
      },
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/escalade": {
      "version": "3.2.0",
      "resolved": "https://registry.npmjs.org/escalade/-/escalade-3.2.0.tgz",
      "integrity": "sha512-WUj2qlxaQtO4g6Pq5c29GTcWGDyd8itL8zTlipgECz3JesAiiOKotd8JU6otB3PACgG6xkJUyVhboMS+bje/jA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/escape-html": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/escape-html/-/escape-html-1.0.3.tgz",
      "integrity": "sha512-NiSupZ4OeuGwr68lGIeym/ksIZMJodUGOSCZ/FSnTxcrekbvqrgdUxlJOMpijaKZVjAJrWrGs/6Jy8OMuyj9ow==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/eslint-scope": {
      "version": "5.1.1",
      "resolved": "https://registry.npmjs.org/eslint-scope/-/eslint-scope-5.1.1.tgz",
      "integrity": "sha512-2NxwbF/hZ0KpepYN0cNbo+FN6XoK7GaHlQhgx/hIZl6Va0bF45RQOOwhLIy8lQDbuCiadSLCBnH2CFYquit5bw==",
      "dev": true,
      "license": "BSD-2-Clause",
      "dependencies": {
        "esrecurse": "^4.3.0",
        "estraverse": "^4.1.1"
      },
      "engines": {
        "node": ">=8.0.0"
      }
    },
    "node_modules/esrecurse": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/esrecurse/-/esrecurse-4.3.0.tgz",
      "integrity": "sha512-KmfKL3b6G+RXvP8N1vr3Tq1kL/oCFgn2NYXEtqP8/L3pKapUA4G8cFVaoF3SU323CD4XypR/ffioHmkti6/Tag==",
      "dev": true,
      "license": "BSD-2-Clause",
      "dependencies": {
        "estraverse": "^5.2.0"
      },
      "engines": {
        "node": ">=4.0"
      }
    },
    "node_modules/esrecurse/node_modules/estraverse": {
      "version": "5.3.0",
      "resolved": "https://registry.npmjs.org/estraverse/-/estraverse-5.3.0.tgz",
      "integrity": "sha512-MMdARuVEQziNTeJD8DgMqmhwR11BRQ/cBP+pLtYdSTnf3MIO8fFeiINEbX36ZdNlfU/7A9f3gUw49B3oQsvwBA==",
      "dev": true,
      "license": "BSD-2-Clause",
      "engines": {
        "node": ">=4.0"
      }
    },
    "node_modules/estraverse": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/estraverse/-/estraverse-4.3.0.tgz",
      "integrity": "sha512-39nnKffWz8xN1BU/2c79n9nB9HDzo0niYUqx6xyqUnyoAnQyyWpOTdZEeiCch8BBu515t4wp9ZmgVfVhn9EBpw==",
      "dev": true,
      "license": "BSD-2-Clause",
      "engines": {
        "node": ">=4.0"
      }
    },
    "node_modules/esutils": {
      "version": "2.0.3",
      "resolved": "https://registry.npmjs.org/esutils/-/esutils-2.0.3.tgz",
      "integrity": "sha512-kVscqXk4OCp68SZ0dkgEKVi6/8ij300KBWTJq32P/dYeWTSwK41WyTxalN1eRmA5Z9UU/LX9D7FWSmV9SAYx6g==",
      "dev": true,
      "license": "BSD-2-Clause",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/etag": {
      "version": "1.8.1",
      "resolved": "https://registry.npmjs.org/etag/-/etag-1.8.1.tgz",
      "integrity": "sha512-aIL5Fx7mawVa300al2BnEE4iNvo1qETxLrPI/o05L7z6go7fCw1J6EQmbK4FmJ2AS7kgVF/KEZWufBfdClMcPg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/eventemitter3": {
      "version": "4.0.7",
      "resolved": "https://registry.npmjs.org/eventemitter3/-/eventemitter3-4.0.7.tgz",
      "integrity": "sha512-8guHBZCwKnFhYdHr2ysuRWErTwhoN2X8XELRlrRwpmfeY2jjuUN4taQMsULKUVo1K4DvZl+0pgfyoysHxvmvEw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/events": {
      "version": "3.3.0",
      "resolved": "https://registry.npmjs.org/events/-/events-3.3.0.tgz",
      "integrity": "sha512-mQw+2fkQbALzQ7V0MY0IqdnXNOeTtP4r0lN9z7AAawCXgqea7bDii20AYrIBrFd/Hx0M2Ocz6S111CaFkUcb0Q==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.8.x"
      }
    },
    "node_modules/eventsource": {
      "version": "3.0.7",
      "resolved": "https://registry.npmjs.org/eventsource/-/eventsource-3.0.7.tgz",
      "integrity": "sha512-CRT1WTyuQoD771GW56XEZFQ/ZoSfWid1alKGDYMmkt2yl8UXrVR4pspqWNEcqKvVIzg6PAltWjxcSSPrboA4iA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "eventsource-parser": "^3.0.1"
      },
      "engines": {
        "node": ">=18.0.0"
      }
    },
    "node_modules/eventsource-parser": {
      "version": "3.0.6",
      "resolved": "https://registry.npmjs.org/eventsource-parser/-/eventsource-parser-3.0.6.tgz",
      "integrity": "sha512-Vo1ab+QXPzZ4tCa8SwIHJFaSzy4R6SHf7BY79rFBDf0idraZWAkYrDjDj8uWaSm3S2TK+hJ7/t1CEmZ7jXw+pg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=18.0.0"
      }
    },
    "node_modules/exponential-backoff": {
      "version": "3.1.3",
      "resolved": "https://registry.npmjs.org/exponential-backoff/-/exponential-backoff-3.1.3.tgz",
      "integrity": "sha512-ZgEeZXj30q+I0EN+CbSSpIyPaJ5HVQD18Z1m+u1FXbAeT94mr1zw50q4q6jiiC447Nl/YTcIYSAftiGqetwXCA==",
      "dev": true,
      "license": "Apache-2.0"
    },
    "node_modules/express": {
      "version": "4.21.2",
      "resolved": "https://registry.npmjs.org/express/-/express-4.21.2.tgz",
      "integrity": "sha512-28HqgMZAmih1Czt9ny7qr6ek2qddF4FclbMzwhCREB6OFfH+rXAnuNCwo1/wFvrtbgsQDb4kSbX9de9lFbrXnA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "accepts": "~1.3.8",
        "array-flatten": "1.1.1",
        "body-parser": "1.20.3",
        "content-disposition": "0.5.4",
        "content-type": "~1.0.4",
        "cookie": "0.7.1",
        "cookie-signature": "1.0.6",
        "debug": "2.6.9",
        "depd": "2.0.0",
        "encodeurl": "~2.0.0",
        "escape-html": "~1.0.3",
        "etag": "~1.8.1",
        "finalhandler": "1.3.1",
        "fresh": "0.5.2",
        "http-errors": "2.0.0",
        "merge-descriptors": "1.0.3",
        "methods": "~1.1.2",
        "on-finished": "2.4.1",
        "parseurl": "~1.3.3",
        "path-to-regexp": "0.1.12",
        "proxy-addr": "~2.0.7",
        "qs": "6.13.0",
        "range-parser": "~1.2.1",
        "safe-buffer": "5.2.1",
        "send": "0.19.0",
        "serve-static": "1.16.2",
        "setprototypeof": "1.2.0",
        "statuses": "2.0.1",
        "type-is": "~1.6.18",
        "utils-merge": "1.0.1",
        "vary": "~1.1.2"
      },
      "engines": {
        "node": ">= 0.10.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/express-rate-limit": {
      "version": "7.5.1",
      "resolved": "https://registry.npmjs.org/express-rate-limit/-/express-rate-limit-7.5.1.tgz",
      "integrity": "sha512-7iN8iPMDzOMHPUYllBEsQdWVB6fPDMPqwjBaFrgr4Jgr/+okjvzAy+UHlYYL/Vs0OsOrMkwS6PJDkFlJwoxUnw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 16"
      },
      "funding": {
        "url": "https://github.com/sponsors/express-rate-limit"
      },
      "peerDependencies": {
        "express": ">= 4.11"
      }
    },
    "node_modules/express/node_modules/cookie": {
      "version": "0.7.1",
      "resolved": "https://registry.npmjs.org/cookie/-/cookie-0.7.1.tgz",
      "integrity": "sha512-6DnInpx7SJ2AK3+CTUE/ZM0vWTUboZCegxhC2xiIydHR9jNuTAASBrfEpHhiGOZw/nX51bHt6YQl8jsGo4y/0w==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/express/node_modules/debug": {
      "version": "2.6.9",
      "resolved": "https://registry.npmjs.org/debug/-/debug-2.6.9.tgz",
      "integrity": "sha512-bC7ElrdJaJnPbAP+1EotYvqZsb3ecl5wi6Bfi6BJTUcNowp6cvspg0jXznRTKDjm/E7AdgFBVeAPVMNcKGsHMA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ms": "2.0.0"
      }
    },
    "node_modules/express/node_modules/ms": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/ms/-/ms-2.0.0.tgz",
      "integrity": "sha512-Tpp60P6IUJDTuOq/5Z8cdskzJujfwqfOTkrwIwj7IRISpnkJnT6SyJ4PCPnGMoFjC9ddhal5KVIYtAt97ix05A==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/extend": {
      "version": "3.0.2",
      "resolved": "https://registry.npmjs.org/extend/-/extend-3.0.2.tgz",
      "integrity": "sha512-fjquC59cD7CyW6urNXK0FBufkZcoiGG80wTuPujX590cB5Ttln20E2UB4S/WARVqhXffZl2LNgS+gQdPIIim/g==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/fast-deep-equal": {
      "version": "3.1.3",
      "resolved": "https://registry.npmjs.org/fast-deep-equal/-/fast-deep-equal-3.1.3.tgz",
      "integrity": "sha512-f3qQ9oQy9j2AhBe/H9VC91wLmKBCCU/gDOnKNAYG5hswO7BLKj09Hc5HYNz9cGI++xlpDCIgDaitVs03ATR84Q==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/fast-glob": {
      "version": "3.3.3",
      "resolved": "https://registry.npmjs.org/fast-glob/-/fast-glob-3.3.3.tgz",
      "integrity": "sha512-7MptL8U0cqcFdzIzwOTHoilX9x5BrNqye7Z/LuC7kCMRio1EMSyqRK3BEAUD7sXRq4iT4AzTVuZdhgQ2TCvYLg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@nodelib/fs.stat": "^2.0.2",
        "@nodelib/fs.walk": "^1.2.3",
        "glob-parent": "^5.1.2",
        "merge2": "^1.3.0",
        "micromatch": "^4.0.8"
      },
      "engines": {
        "node": ">=8.6.0"
      }
    },
    "node_modules/fast-glob/node_modules/glob-parent": {
      "version": "5.1.2",
      "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-5.1.2.tgz",
      "integrity": "sha512-AOIgSQCepiJYwP3ARnGx+5VnTu2HBYdzbGP45eLw1vr3zB3vZLeyed1sC9hnbcOc9/SrMyM5RPQrkGz4aS9Zow==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "is-glob": "^4.0.1"
      },
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/fast-json-stable-stringify": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/fast-json-stable-stringify/-/fast-json-stable-stringify-2.1.0.tgz",
      "integrity": "sha512-lhd/wF+Lk98HZoTCtlVraHtfh5XYijIjalXck7saUtuanSDyLMxnHhSXEDJqHxD7msR8D0uCmqlkwjCV8xvwHw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/fast-uri": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/fast-uri/-/fast-uri-3.1.0.tgz",
      "integrity": "sha512-iPeeDKJSWf4IEOasVVrknXpaBV0IApz/gp7S2bb7Z4Lljbl2MGJRqInZiUrQwV16cpzw/D3S5j5Julj/gT52AA==",
      "dev": true,
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/fastify"
        },
        {
          "type": "opencollective",
          "url": "https://opencollective.com/fastify"
        }
      ],
      "license": "BSD-3-Clause"
    },
    "node_modules/fastq": {
      "version": "1.19.1",
      "resolved": "https://registry.npmjs.org/fastq/-/fastq-1.19.1.tgz",
      "integrity": "sha512-GwLTyxkCXjXbxqIhTsMI2Nui8huMPtnxg7krajPJAjnEG/iiOS7i+zCtWGZR9G0NBKbXKh6X9m9UIsYX/N6vvQ==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "reusify": "^1.0.4"
      }
    },
    "node_modules/faye-websocket": {
      "version": "0.11.4",
      "resolved": "https://registry.npmjs.org/faye-websocket/-/faye-websocket-0.11.4.tgz",
      "integrity": "sha512-CzbClwlXAuiRQAlUyfqPgvPoNKTckTPGfwZV4ZdAhVcP2lh9KUxJg2b5GkE7XbjKQ3YJnQ9z6D9ntLAlB+tP8g==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "websocket-driver": ">=0.5.1"
      },
      "engines": {
        "node": ">=0.8.0"
      }
    },
    "node_modules/fdir": {
      "version": "6.5.0",
      "resolved": "https://registry.npmjs.org/fdir/-/fdir-6.5.0.tgz",
      "integrity": "sha512-tIbYtZbucOs0BRGqPJkshJUYdL+SDH7dVM8gjy+ERp3WAUjLEFJE+02kanyHtwjWOnwrKYBiwAmM0p4kLJAnXg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=12.0.0"
      },
      "peerDependencies": {
        "picomatch": "^3 || ^4"
      },
      "peerDependenciesMeta": {
        "picomatch": {
          "optional": true
        }
      }
    },
    "node_modules/fill-range": {
      "version": "7.1.1",
      "resolved": "https://registry.npmjs.org/fill-range/-/fill-range-7.1.1.tgz",
      "integrity": "sha512-YsGpe3WHLK8ZYi4tWDg2Jy3ebRz2rXowDxnld4bkQB00cc/1Zw9AWnC0i9ztDJitivtQvaI9KaLyKrc+hBW0yg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "to-regex-range": "^5.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/finalhandler": {
      "version": "1.3.1",
      "resolved": "https://registry.npmjs.org/finalhandler/-/finalhandler-1.3.1.tgz",
      "integrity": "sha512-6BN9trH7bp3qvnrRyzsBz+g3lZxTNZTbVO2EV1CS0WIcDbawYVdYvGflME/9QP0h0pYlCDBCTjYa9nZzMDpyxQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "debug": "2.6.9",
        "encodeurl": "~2.0.0",
        "escape-html": "~1.0.3",
        "on-finished": "2.4.1",
        "parseurl": "~1.3.3",
        "statuses": "2.0.1",
        "unpipe": "~1.0.0"
      },
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/finalhandler/node_modules/debug": {
      "version": "2.6.9",
      "resolved": "https://registry.npmjs.org/debug/-/debug-2.6.9.tgz",
      "integrity": "sha512-bC7ElrdJaJnPbAP+1EotYvqZsb3ecl5wi6Bfi6BJTUcNowp6cvspg0jXznRTKDjm/E7AdgFBVeAPVMNcKGsHMA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ms": "2.0.0"
      }
    },
    "node_modules/finalhandler/node_modules/ms": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/ms/-/ms-2.0.0.tgz",
      "integrity": "sha512-Tpp60P6IUJDTuOq/5Z8cdskzJujfwqfOTkrwIwj7IRISpnkJnT6SyJ4PCPnGMoFjC9ddhal5KVIYtAt97ix05A==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/find-up": {
      "version": "5.0.0",
      "resolved": "https://registry.npmjs.org/find-up/-/find-up-5.0.0.tgz",
      "integrity": "sha512-78/PXT1wlLLDgTzDs7sjq9hzz0vXD+zn+7wypEe4fXQxCmdmqfGsEPQxmiCSQI3ajFV91bVSsvNtrJRiW6nGng==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "locate-path": "^6.0.0",
        "path-exists": "^4.0.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/flat": {
      "version": "5.0.2",
      "resolved": "https://registry.npmjs.org/flat/-/flat-5.0.2.tgz",
      "integrity": "sha512-b6suED+5/3rTpUBdG1gupIl8MPFCAMA0QXwmljLhvCUKcUvdE4gWky9zpuGCcXHOsz4J9wPGNWq6OKpmIzz3hQ==",
      "dev": true,
      "license": "BSD-3-Clause",
      "bin": {
        "flat": "cli.js"
      }
    },
    "node_modules/flatted": {
      "version": "3.3.3",
      "resolved": "https://registry.npmjs.org/flatted/-/flatted-3.3.3.tgz",
      "integrity": "sha512-GX+ysw4PBCz0PzosHDepZGANEuFCMLrnRTiEy9McGjmkCQYwRq4A/X786G/fjM/+OjsWSU1ZrY5qyARZmO/uwg==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/follow-redirects": {
      "version": "1.15.11",
      "resolved": "https://registry.npmjs.org/follow-redirects/-/follow-redirects-1.15.11.tgz",
      "integrity": "sha512-deG2P0JfjrTxl50XGCDyfI97ZGVCxIpfKYmfyrQ54n5FO/0gfIES8C/Psl6kWVDolizcaaxZJnTS0QSMxvnsBQ==",
      "dev": true,
      "funding": [
        {
          "type": "individual",
          "url": "https://github.com/sponsors/RubenVerborgh"
        }
      ],
      "license": "MIT",
      "engines": {
        "node": ">=4.0"
      },
      "peerDependenciesMeta": {
        "debug": {
          "optional": true
        }
      }
    },
    "node_modules/foreground-child": {
      "version": "3.3.1",
      "resolved": "https://registry.npmjs.org/foreground-child/-/foreground-child-3.3.1.tgz",
      "integrity": "sha512-gIXjKqtFuWEgzFRJA9WCQeSJLZDjgJUOMCMzxtvFq/37KojM1BFGufqsCy0r4qSQmYLsZYMeyRqzIWOMup03sw==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "cross-spawn": "^7.0.6",
        "signal-exit": "^4.0.1"
      },
      "engines": {
        "node": ">=14"
      },
      "funding": {
        "url": "https://github.com/sponsors/isaacs"
      }
    },
    "node_modules/forwarded": {
      "version": "0.2.0",
      "resolved": "https://registry.npmjs.org/forwarded/-/forwarded-0.2.0.tgz",
      "integrity": "sha512-buRG0fpBtRHSTCOASe6hD258tEubFoRLb4ZNA6NxMVHNw2gOcwHo9wyablzMzOA5z9xA9L1KNjk/Nt6MT9aYow==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/fraction.js": {
      "version": "4.3.7",
      "resolved": "https://registry.npmjs.org/fraction.js/-/fraction.js-4.3.7.tgz",
      "integrity": "sha512-ZsDfxO51wGAXREY55a7la9LScWpwv9RxIrYABrlvOFBlH/ShPnrtsXeuUIfXKKOVicNxQ+o8JTbJvjS4M89yew==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "*"
      },
      "funding": {
        "type": "patreon",
        "url": "https://github.com/sponsors/rawify"
      }
    },
    "node_modules/fresh": {
      "version": "0.5.2",
      "resolved": "https://registry.npmjs.org/fresh/-/fresh-0.5.2.tgz",
      "integrity": "sha512-zJ2mQYM18rEFOudeV4GShTGIQ7RbzA7ozbU9I/XBpm7kqgMywgmylMwXHxZJmkVoYkna9d2pVXVXPdYTP9ej8Q==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/fs-extra": {
      "version": "8.1.0",
      "resolved": "https://registry.npmjs.org/fs-extra/-/fs-extra-8.1.0.tgz",
      "integrity": "sha512-yhlQgA6mnOJUKOsRUFsgJdQCvkKhcz8tlZG5HBQfReYZy46OwLcY+Zia0mtdHsOo9y/hP+CxMN0TU9QxoOtG4g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "graceful-fs": "^4.2.0",
        "jsonfile": "^4.0.0",
        "universalify": "^0.1.0"
      },
      "engines": {
        "node": ">=6 <7 || >=8"
      }
    },
    "node_modules/fs-minipass": {
      "version": "3.0.3",
      "resolved": "https://registry.npmjs.org/fs-minipass/-/fs-minipass-3.0.3.tgz",
      "integrity": "sha512-XUBA9XClHbnJWSfBzjkm6RvPsyg3sryZt06BEQoXcF7EK/xpGaQYJgQKDJSUH5SGZ76Y7pFx1QBnXz09rU5Fbw==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "minipass": "^7.0.3"
      },
      "engines": {
        "node": "^14.17.0 || ^16.13.0 || >=18.0.0"
      }
    },
    "node_modules/fs.realpath": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/fs.realpath/-/fs.realpath-1.0.0.tgz",
      "integrity": "sha512-OO0pH2lK6a0hZnAdau5ItzHPI6pUlvI7jMVnxUQRtw4owF2wk8lOSabtGDCTP4Ggrg2MbGnWO9X8K1t4+fGMDw==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/fsevents": {
      "version": "2.3.3",
      "resolved": "https://registry.npmjs.org/fsevents/-/fsevents-2.3.3.tgz",
      "integrity": "sha512-5xoDfX+fL7faATnagmWPpbFtwh/R77WmMMqqHGS65C3vvB0YHrgF+B1YmZ3441tMj5n63k0212XNoJwzlhffQw==",
      "dev": true,
      "hasInstallScript": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": "^8.16.0 || ^10.6.0 || >=11.0.0"
      }
    },
    "node_modules/function-bind": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/function-bind/-/function-bind-1.1.2.tgz",
      "integrity": "sha512-7XHNxH7qX9xG5mIwxkhumTox/MIRNcOgDrxWsMt2pAr23WHp6MrRlN7FBSFpCpr+oVO0F744iUgR82nJMfG2SA==",
      "dev": true,
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/gensync": {
      "version": "1.0.0-beta.2",
      "resolved": "https://registry.npmjs.org/gensync/-/gensync-1.0.0-beta.2.tgz",
      "integrity": "sha512-3hN7NaskYvMDLQY55gnW3NQ+mesEAepTqlg+VEbj7zzqEMBVNhzcGYYeqFo/TlYz6eQiFcp1HcsCZO+nGgS8zg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/get-caller-file": {
      "version": "2.0.5",
      "resolved": "https://registry.npmjs.org/get-caller-file/-/get-caller-file-2.0.5.tgz",
      "integrity": "sha512-DyFP3BM/3YHTQOCUL/w0OZHR0lpKeGrxotcHWcqNEdnltqFwXVfhEBQ94eIo34AfQpo0rGki4cyIiftY06h2Fg==",
      "dev": true,
      "license": "ISC",
      "engines": {
        "node": "6.* || 8.* || >= 10.*"
      }
    },
    "node_modules/get-east-asian-width": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/get-east-asian-width/-/get-east-asian-width-1.4.0.tgz",
      "integrity": "sha512-QZjmEOC+IT1uk6Rx0sX22V6uHWVwbdbxf1faPqJ1QhLdGgsRGCZoyaQBm/piRdJy/D2um6hM1UP7ZEeQ4EkP+Q==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/get-intrinsic": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/get-intrinsic/-/get-intrinsic-1.3.0.tgz",
      "integrity": "sha512-9fSjSaos/fRIVIp+xSJlE6lfwhES7LNtKaCBIamHsjr2na1BiABJPo0mOjjz8GJDURarmCPGqaiVg5mfjb98CQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind-apply-helpers": "^1.0.2",
        "es-define-property": "^1.0.1",
        "es-errors": "^1.3.0",
        "es-object-atoms": "^1.1.1",
        "function-bind": "^1.1.2",
        "get-proto": "^1.0.1",
        "gopd": "^1.2.0",
        "has-symbols": "^1.1.0",
        "hasown": "^2.0.2",
        "math-intrinsics": "^1.1.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/get-proto": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/get-proto/-/get-proto-1.0.1.tgz",
      "integrity": "sha512-sTSfBjoXBp89JvIKIefqw7U2CCebsc74kiY6awiGogKtoSGbgjYE/G/+l9sF3MWFPNc9IcoOC4ODfKHfxFmp0g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "dunder-proto": "^1.0.1",
        "es-object-atoms": "^1.0.0"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/glob": {
      "version": "7.2.3",
      "resolved": "https://registry.npmjs.org/glob/-/glob-7.2.3.tgz",
      "integrity": "sha512-nFR0zLpU2YCaRxwoCJvL6UvCH2JFyFVIvwTLsIf21AuHlMskA1hhTdk+LlYJtOlYt9v6dvszD2BGRqBL+iQK9Q==",
      "deprecated": "Glob versions prior to v9 are no longer supported",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "fs.realpath": "^1.0.0",
        "inflight": "^1.0.4",
        "inherits": "2",
        "minimatch": "^3.1.1",
        "once": "^1.3.0",
        "path-is-absolute": "^1.0.0"
      },
      "engines": {
        "node": "*"
      },
      "funding": {
        "url": "https://github.com/sponsors/isaacs"
      }
    },
    "node_modules/glob-parent": {
      "version": "6.0.2",
      "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-6.0.2.tgz",
      "integrity": "sha512-XxwI8EOhVQgWp6iDL+3b0r86f4d6AX6zSU55HfB4ydCEuXLXc5FcYeOu+nnGftS4TEju/11rt4KJPTMgbfmv4A==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "is-glob": "^4.0.3"
      },
      "engines": {
        "node": ">=10.13.0"
      }
    },
    "node_modules/glob-to-regex.js": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/glob-to-regex.js/-/glob-to-regex.js-1.2.0.tgz",
      "integrity": "sha512-QMwlOQKU/IzqMUOAZWubUOT8Qft+Y0KQWnX9nK3ch0CJg0tTp4TvGZsTfudYKv2NzoQSyPcnA6TYeIQ3jGichQ==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": ">=10.0"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/streamich"
      },
      "peerDependencies": {
        "tslib": "2"
      }
    },
    "node_modules/glob-to-regexp": {
      "version": "0.4.1",
      "resolved": "https://registry.npmjs.org/glob-to-regexp/-/glob-to-regexp-0.4.1.tgz",
      "integrity": "sha512-lkX1HJXwyMcprw/5YUZc2s7DrpAiHB21/V+E1rHUrVNokkvB6bqMzT0VfV6/86ZNabt1k14YOIaT7nDvOX3Iiw==",
      "dev": true,
      "license": "BSD-2-Clause"
    },
    "node_modules/gopd": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/gopd/-/gopd-1.2.0.tgz",
      "integrity": "sha512-ZUKRh6/kUFoAiTAtTYPZJ3hw9wNxx+BIBOijnlG9PnrJsCcSjs1wyyD6vJpaYtgnzDrKYRSqf3OO6Rfa93xsRg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/graceful-fs": {
      "version": "4.2.11",
      "resolved": "https://registry.npmjs.org/graceful-fs/-/graceful-fs-4.2.11.tgz",
      "integrity": "sha512-RbJ5/jmFcNNCcDV5o9eTnBLJ/HszWV0P73bc+Ff4nS/rJj+YaS6IGyiOL0VoBYX+l1Wrl3k63h/KrH+nhJ0XvQ==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/handle-thing": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/handle-thing/-/handle-thing-2.0.1.tgz",
      "integrity": "sha512-9Qn4yBxelxoh2Ow62nP+Ka/kMnOXRi8BXnRaUwezLNhqelnN49xKz4F/dPP8OYLxLxq6JDtZb2i9XznUQbNPTg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/has-flag": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/has-flag/-/has-flag-4.0.0.tgz",
      "integrity": "sha512-EykJT/Q1KjTWctppgIAgfSO0tKVuZUjhgMr17kqTumMl6Afv3EISleU7qZUzoXDFTAHTDC4NOoG/ZxU3EvlMPQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/has-symbols": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/has-symbols/-/has-symbols-1.1.0.tgz",
      "integrity": "sha512-1cDNdwJ2Jaohmb3sg4OmKaMBwuC48sYni5HUw2DvsC8LjGTLK9h+eb1X6RyuOHe4hT0ULCW68iomhjUoKUqlPQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/has-tostringtag": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/has-tostringtag/-/has-tostringtag-1.0.2.tgz",
      "integrity": "sha512-NqADB8VjPFLM2V0VvHUewwwsw0ZWBaIdgo+ieHtK3hasLz4qeCRjYcqfB6AQrBggRKppKF8L52/VqdVsO47Dlw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "has-symbols": "^1.0.3"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/hasown": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/hasown/-/hasown-2.0.2.tgz",
      "integrity": "sha512-0hJU9SCPvmMzIBdZFqNPXWa6dqh7WdH0cII9y+CyS8rG3nL48Bclra9HmKhVVUHyPWNH5Y7xDwAB7bfgSjkUMQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "function-bind": "^1.1.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/hosted-git-info": {
      "version": "9.0.2",
      "resolved": "https://registry.npmjs.org/hosted-git-info/-/hosted-git-info-9.0.2.tgz",
      "integrity": "sha512-M422h7o/BR3rmCQ8UHi7cyyMqKltdP9Uo+J2fXK+RSAY+wTcKOIRyhTuKv4qn+DJf3g+PL890AzId5KZpX+CBg==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "lru-cache": "^11.1.0"
      },
      "engines": {
        "node": "^20.17.0 || >=22.9.0"
      }
    },
    "node_modules/hosted-git-info/node_modules/lru-cache": {
      "version": "11.2.2",
      "resolved": "https://registry.npmjs.org/lru-cache/-/lru-cache-11.2.2.tgz",
      "integrity": "sha512-F9ODfyqML2coTIsQpSkRHnLSZMtkU8Q+mSfcaIyKwy58u+8k5nvAYeiNhsyMARvzNcXJ9QfWVrcPsC9e9rAxtg==",
      "dev": true,
      "license": "ISC",
      "engines": {
        "node": "20 || >=22"
      }
    },
    "node_modules/hpack.js": {
      "version": "2.1.6",
      "resolved": "https://registry.npmjs.org/hpack.js/-/hpack.js-2.1.6.tgz",
      "integrity": "sha512-zJxVehUdMGIKsRaNt7apO2Gqp0BdqW5yaiGHXXmbpvxgBYVZnAql+BJb4RO5ad2MgpbZKn5G6nMnegrH1FcNYQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "inherits": "^2.0.1",
        "obuf": "^1.0.0",
        "readable-stream": "^2.0.1",
        "wbuf": "^1.1.0"
      }
    },
    "node_modules/hpack.js/node_modules/readable-stream": {
      "version": "2.3.8",
      "resolved": "https://registry.npmjs.org/readable-stream/-/readable-stream-2.3.8.tgz",
      "integrity": "sha512-8p0AUk4XODgIewSi0l8Epjs+EVnWiK7NoDIEGU0HhE7+ZyY8D1IMY7odu5lRrFXGg71L15KG8QrPmum45RTtdA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "core-util-is": "~1.0.0",
        "inherits": "~2.0.3",
        "isarray": "~1.0.0",
        "process-nextick-args": "~2.0.0",
        "safe-buffer": "~5.1.1",
        "string_decoder": "~1.1.1",
        "util-deprecate": "~1.0.1"
      }
    },
    "node_modules/hpack.js/node_modules/safe-buffer": {
      "version": "5.1.2",
      "resolved": "https://registry.npmjs.org/safe-buffer/-/safe-buffer-5.1.2.tgz",
      "integrity": "sha512-Gd2UZBJDkXlY7GbJxfsE8/nvKkUEU1G38c1siN6QP6a9PT9MmHB8GnpscSmMJSoF8LOIrt8ud/wPtojys4G6+g==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/hpack.js/node_modules/string_decoder": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/string_decoder/-/string_decoder-1.1.1.tgz",
      "integrity": "sha512-n/ShnvDi6FHbbVfviro+WojiFzv+s8MPMHBczVePfUpDJLwoLT0ht1l4YwBCbi8pJAveEEdnkHyPyTP/mzRfwg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "safe-buffer": "~5.1.0"
      }
    },
    "node_modules/html-escaper": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/html-escaper/-/html-escaper-2.0.2.tgz",
      "integrity": "sha512-H2iMtd0I4Mt5eYiapRdIDjp+XzelXQ0tFE4JS7YFwFevXXMmOp9myNrUvCg0D6ws8iqkRPBfKHgbwig1SmlLfg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/htmlparser2": {
      "version": "10.0.0",
      "resolved": "https://registry.npmjs.org/htmlparser2/-/htmlparser2-10.0.0.tgz",
      "integrity": "sha512-TwAZM+zE5Tq3lrEHvOlvwgj1XLWQCtaaibSN11Q+gGBAS7Y1uZSWwXXRe4iF6OXnaq1riyQAPFOBtYc77Mxq0g==",
      "dev": true,
      "funding": [
        "https://github.com/fb55/htmlparser2?sponsor=1",
        {
          "type": "github",
          "url": "https://github.com/sponsors/fb55"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "domelementtype": "^2.3.0",
        "domhandler": "^5.0.3",
        "domutils": "^3.2.1",
        "entities": "^6.0.0"
      }
    },
    "node_modules/htmlparser2/node_modules/entities": {
      "version": "6.0.1",
      "resolved": "https://registry.npmjs.org/entities/-/entities-6.0.1.tgz",
      "integrity": "sha512-aN97NXWF6AWBTahfVOIrB/NShkzi5H7F9r1s9mD3cDj4Ko5f2qhhVoYMibXF7GlLveb/D2ioWay8lxI97Ven3g==",
      "dev": true,
      "license": "BSD-2-Clause",
      "engines": {
        "node": ">=0.12"
      },
      "funding": {
        "url": "https://github.com/fb55/entities?sponsor=1"
      }
    },
    "node_modules/http-cache-semantics": {
      "version": "4.2.0",
      "resolved": "https://registry.npmjs.org/http-cache-semantics/-/http-cache-semantics-4.2.0.tgz",
      "integrity": "sha512-dTxcvPXqPvXBQpq5dUr6mEMJX4oIEFv6bwom3FDwKRDsuIjjJGANqhBuoAn9c1RQJIdAKav33ED65E2ys+87QQ==",
      "dev": true,
      "license": "BSD-2-Clause"
    },
    "node_modules/http-deceiver": {
      "version": "1.2.7",
      "resolved": "https://registry.npmjs.org/http-deceiver/-/http-deceiver-1.2.7.tgz",
      "integrity": "sha512-LmpOGxTfbpgtGVxJrj5k7asXHCgNZp5nLfp+hWc8QQRqtb7fUy6kRY3BO1h9ddF6yIPYUARgxGOwB42DnxIaNw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/http-errors": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/http-errors/-/http-errors-2.0.0.tgz",
      "integrity": "sha512-FtwrG/euBzaEjYeRqOgly7G0qviiXoJWnvEH2Z1plBdXgbyjv34pHTSb9zoeHMyDy33+DWy5Wt9Wo+TURtOYSQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "depd": "2.0.0",
        "inherits": "2.0.4",
        "setprototypeof": "1.2.0",
        "statuses": "2.0.1",
        "toidentifier": "1.0.1"
      },
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/http-parser-js": {
      "version": "0.5.10",
      "resolved": "https://registry.npmjs.org/http-parser-js/-/http-parser-js-0.5.10.tgz",
      "integrity": "sha512-Pysuw9XpUq5dVc/2SMHpuTY01RFl8fttgcyunjL7eEMhGM3cI4eOmiCycJDVCo/7O7ClfQD3SaI6ftDzqOXYMA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/http-proxy": {
      "version": "1.18.1",
      "resolved": "https://registry.npmjs.org/http-proxy/-/http-proxy-1.18.1.tgz",
      "integrity": "sha512-7mz/721AbnJwIVbnaSv1Cz3Am0ZLT/UBwkC92VlxhXv/k/BBQfM2fXElQNC27BVGr0uwUpplYPQM9LnaBMR5NQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "eventemitter3": "^4.0.0",
        "follow-redirects": "^1.0.0",
        "requires-port": "^1.0.0"
      },
      "engines": {
        "node": ">=8.0.0"
      }
    },
    "node_modules/http-proxy-agent": {
      "version": "7.0.2",
      "resolved": "https://registry.npmjs.org/http-proxy-agent/-/http-proxy-agent-7.0.2.tgz",
      "integrity": "sha512-T1gkAiYYDWYx3V5Bmyu7HcfcvL7mUrTWiM6yOfa3PIphViJ/gFPbvidQ+veqSOHci/PxBcDabeUNCzpOODJZig==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "agent-base": "^7.1.0",
        "debug": "^4.3.4"
      },
      "engines": {
        "node": ">= 14"
      }
    },
    "node_modules/http-proxy-middleware": {
      "version": "3.0.5",
      "resolved": "https://registry.npmjs.org/http-proxy-middleware/-/http-proxy-middleware-3.0.5.tgz",
      "integrity": "sha512-GLZZm1X38BPY4lkXA01jhwxvDoOkkXqjgVyUzVxiEK4iuRu03PZoYHhHRwxnfhQMDuaxi3vVri0YgSro/1oWqg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/http-proxy": "^1.17.15",
        "debug": "^4.3.6",
        "http-proxy": "^1.18.1",
        "is-glob": "^4.0.3",
        "is-plain-object": "^5.0.0",
        "micromatch": "^4.0.8"
      },
      "engines": {
        "node": "^14.15.0 || ^16.10.0 || >=18.0.0"
      }
    },
    "node_modules/https-proxy-agent": {
      "version": "7.0.6",
      "resolved": "https://registry.npmjs.org/https-proxy-agent/-/https-proxy-agent-7.0.6.tgz",
      "integrity": "sha512-vK9P5/iUfdl95AI+JVyUuIcVtd4ofvtrOr3HNtM2yxC9bnMbEdp3x01OhQNnjb8IJYi38VlTE3mBXwcfvywuSw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "agent-base": "^7.1.2",
        "debug": "4"
      },
      "engines": {
        "node": ">= 14"
      }
    },
    "node_modules/hyperdyperid": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/hyperdyperid/-/hyperdyperid-1.2.0.tgz",
      "integrity": "sha512-Y93lCzHYgGWdrJ66yIktxiaGULYc6oGiABxhcO5AufBeOyoIdZF7bIfLaOrbM0iGIOXQQgxxRrFEnb+Y6w1n4A==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=10.18"
      }
    },
    "node_modules/iconv-lite": {
      "version": "0.7.0",
      "resolved": "https://registry.npmjs.org/iconv-lite/-/iconv-lite-0.7.0.tgz",
      "integrity": "sha512-cf6L2Ds3h57VVmkZe+Pn+5APsT7FpqJtEhhieDCvrE2MK5Qk9MyffgQyuxQTm6BChfeZNtcOLHp9IcWRVcIcBQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "safer-buffer": ">= 2.1.2 < 3.0.0"
      },
      "engines": {
        "node": ">=0.10.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/icss-utils": {
      "version": "5.1.0",
      "resolved": "https://registry.npmjs.org/icss-utils/-/icss-utils-5.1.0.tgz",
      "integrity": "sha512-soFhflCVWLfRNOPU3iv5Z9VUdT44xFRbzjLsEzSr5AQmgqPMTHdU3PMT1Cf1ssx8fLNJDA1juftYl+PUcv3MqA==",
      "dev": true,
      "license": "ISC",
      "engines": {
        "node": "^10 || ^12 || >= 14"
      },
      "peerDependencies": {
        "postcss": "^8.1.0"
      }
    },
    "node_modules/ignore-walk": {
      "version": "8.0.0",
      "resolved": "https://registry.npmjs.org/ignore-walk/-/ignore-walk-8.0.0.tgz",
      "integrity": "sha512-FCeMZT4NiRQGh+YkeKMtWrOmBgWjHjMJ26WQWrRQyoyzqevdaGSakUaJW5xQYmjLlUVk2qUnCjYVBax9EKKg8A==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "minimatch": "^10.0.3"
      },
      "engines": {
        "node": "^20.17.0 || >=22.9.0"
      }
    },
    "node_modules/ignore-walk/node_modules/minimatch": {
      "version": "10.0.3",
      "resolved": "https://registry.npmjs.org/minimatch/-/minimatch-10.0.3.tgz",
      "integrity": "sha512-IPZ167aShDZZUMdRk66cyQAW3qr0WzbHkPdMYa8bzZhlHhO3jALbKdxcaak7W9FfT2rZNpQuUu4Od7ILEpXSaw==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "@isaacs/brace-expansion": "^5.0.0"
      },
      "engines": {
        "node": "20 || >=22"
      },
      "funding": {
        "url": "https://github.com/sponsors/isaacs"
      }
    },
    "node_modules/image-size": {
      "version": "0.5.5",
      "resolved": "https://registry.npmjs.org/image-size/-/image-size-0.5.5.tgz",
      "integrity": "sha512-6TDAlDPZxUFCv+fuOkIoXT/V/f3Qbq8e37p+YOiYrUv3v9cc3/6x78VdfPgFVaB9dZYeLUfKgHRebpkm/oP2VQ==",
      "dev": true,
      "license": "MIT",
      "optional": true,
      "bin": {
        "image-size": "bin/image-size.js"
      },
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/immutable": {
      "version": "5.1.4",
      "resolved": "https://registry.npmjs.org/immutable/-/immutable-5.1.4.tgz",
      "integrity": "sha512-p6u1bG3YSnINT5RQmx/yRZBpenIl30kVxkTLDyHLIMk0gict704Q9n+thfDI7lTRm9vXdDYutVzXhzcThxTnXA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/import-fresh": {
      "version": "3.3.1",
      "resolved": "https://registry.npmjs.org/import-fresh/-/import-fresh-3.3.1.tgz",
      "integrity": "sha512-TR3KfrTZTYLPB6jUjfx6MF9WcWrHL9su5TObK4ZkYgBdWKPOFoSoQIdEuTuR82pmtxH2spWG9h6etwfr1pLBqQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "parent-module": "^1.0.0",
        "resolve-from": "^4.0.0"
      },
      "engines": {
        "node": ">=6"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/imurmurhash": {
      "version": "0.1.4",
      "resolved": "https://registry.npmjs.org/imurmurhash/-/imurmurhash-0.1.4.tgz",
      "integrity": "sha512-JmXMZ6wuvDmLiHEml9ykzqO6lwFbof0GG4IkcGaENdCRDDmMVnny7s5HsIgHCbaq0w2MyPhDqkhTUgS2LU2PHA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.8.19"
      }
    },
    "node_modules/inflight": {
      "version": "1.0.6",
      "resolved": "https://registry.npmjs.org/inflight/-/inflight-1.0.6.tgz",
      "integrity": "sha512-k92I/b08q4wvFscXCLvqfsHCrjrF7yiXsQuIVvVE7N82W3+aqpzuUdBbfhWcy/FZR3/4IgflMgKLOsvPDrGCJA==",
      "deprecated": "This module is not supported, and leaks memory. Do not use it. Check out lru-cache if you want a good and tested way to coalesce async requests by a key value, which is much more comprehensive and powerful.",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "once": "^1.3.0",
        "wrappy": "1"
      }
    },
    "node_modules/inherits": {
      "version": "2.0.4",
      "resolved": "https://registry.npmjs.org/inherits/-/inherits-2.0.4.tgz",
      "integrity": "sha512-k/vGaX4/Yla3WzyMCvTQOXYeIHvqOKtnqBduzTHpzpQZzAskKMhZ2K+EnBiSM9zGSoIFeMpXKxa4dYeZIQqewQ==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/ini": {
      "version": "5.0.0",
      "resolved": "https://registry.npmjs.org/ini/-/ini-5.0.0.tgz",
      "integrity": "sha512-+N0ngpO3e7cRUWOJAS7qw0IZIVc6XPrW4MlFBdD066F2L4k1L6ker3hLqSq7iXxU5tgS4WGkIUElWn5vogAEnw==",
      "dev": true,
      "license": "ISC",
      "engines": {
        "node": "^18.17.0 || >=20.5.0"
      }
    },
    "node_modules/ionicons": {
      "version": "8.0.13",
      "resolved": "https://registry.npmjs.org/ionicons/-/ionicons-8.0.13.tgz",
      "integrity": "sha512-2QQVyG2P4wszne79jemMjWYLp0DBbDhr4/yFroPCxvPP1wtMxgdIV3l5n+XZ5E9mgoXU79w7yTWpm2XzJsISxQ==",
      "license": "MIT",
      "dependencies": {
        "@stencil/core": "^4.35.3"
      }
    },
    "node_modules/ip-address": {
      "version": "10.0.1",
      "resolved": "https://registry.npmjs.org/ip-address/-/ip-address-10.0.1.tgz",
      "integrity": "sha512-NWv9YLW4PoW2B7xtzaS3NCot75m6nK7Icdv0o3lfMceJVRfSoQwqD4wEH5rLwoKJwUiZ/rfpiVBhnaF0FK4HoA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 12"
      }
    },
    "node_modules/ipaddr.js": {
      "version": "1.9.1",
      "resolved": "https://registry.npmjs.org/ipaddr.js/-/ipaddr.js-1.9.1.tgz",
      "integrity": "sha512-0KI/607xoxSToH7GjN1FfSbLoU0+btTicjsQSWQlh/hZykN8KpmMf7uYwPW3R+akZ6R/w18ZlXSHBYXiYUPO3g==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.10"
      }
    },
    "node_modules/is-arrayish": {
      "version": "0.2.1",
      "resolved": "https://registry.npmjs.org/is-arrayish/-/is-arrayish-0.2.1.tgz",
      "integrity": "sha512-zz06S8t0ozoDXMG+ube26zeCTNXcKIPJZJi8hBrF4idCLms4CG9QtK7qBl1boi5ODzFpjswb5JPmHCbMpjaYzg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/is-binary-path": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/is-binary-path/-/is-binary-path-2.1.0.tgz",
      "integrity": "sha512-ZMERYes6pDydyuGidse7OsHxtbI7WVeUEozgR/g7rd0xUimYNlvZRE/K2MgZTjWy725IfelLeVcEM97mmtRGXw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "binary-extensions": "^2.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/is-core-module": {
      "version": "2.16.1",
      "resolved": "https://registry.npmjs.org/is-core-module/-/is-core-module-2.16.1.tgz",
      "integrity": "sha512-UfoeMA6fIJ8wTYFEUjelnaGI67v6+N7qXJEvQuIGa99l4xsCruSYOVSQ0uPANn4dAzm8lkYPaKLrrijLq7x23w==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "hasown": "^2.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-docker": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/is-docker/-/is-docker-3.0.0.tgz",
      "integrity": "sha512-eljcgEDlEns/7AXFosB5K/2nCM4P7FQPkGc/DWLy5rmFEWvZayGrik1d9/QIY5nJ4f9YsVvBkA6kJpHn9rISdQ==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "is-docker": "cli.js"
      },
      "engines": {
        "node": "^12.20.0 || ^14.13.1 || >=16.0.0"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/is-extglob": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/is-extglob/-/is-extglob-2.1.1.tgz",
      "integrity": "sha512-SbKbANkN603Vi4jEZv49LeVJMn4yGwsbzZworEoyEiutsN3nJYdbO36zfhGJ6QEDpOZIFkDtnq5JRxmvl3jsoQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/is-fullwidth-code-point": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/is-fullwidth-code-point/-/is-fullwidth-code-point-4.0.0.tgz",
      "integrity": "sha512-O4L094N2/dZ7xqVdrXhh9r1KODPJpFms8B5sGdJLPy664AgvXsreZUyCQQNItZRDlYug4xStLjNp/sz3HvBowQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/is-glob": {
      "version": "4.0.3",
      "resolved": "https://registry.npmjs.org/is-glob/-/is-glob-4.0.3.tgz",
      "integrity": "sha512-xelSayHH36ZgE7ZWhli7pW34hNbNl8Ojv5KVmkJD4hBdD3th8Tfk9vYasLM+mXWOZhFkgZfxhLSnrwRr4elSSg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "is-extglob": "^2.1.1"
      },
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/is-inside-container": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/is-inside-container/-/is-inside-container-1.0.0.tgz",
      "integrity": "sha512-KIYLCCJghfHZxqjYBE7rEy0OBuTd5xCHS7tHVgvCLkx7StIoaxwNW3hCALgEUjFfeRk+MG/Qxmp/vtETEF3tRA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "is-docker": "^3.0.0"
      },
      "bin": {
        "is-inside-container": "cli.js"
      },
      "engines": {
        "node": ">=14.16"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/is-interactive": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/is-interactive/-/is-interactive-2.0.0.tgz",
      "integrity": "sha512-qP1vozQRI+BMOPcjFzrjXuQvdak2pHNUMZoeG2eRbiSqyvbEf/wQtEOTOX1guk6E3t36RkaqiSt8A/6YElNxLQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/is-network-error": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/is-network-error/-/is-network-error-1.3.0.tgz",
      "integrity": "sha512-6oIwpsgRfnDiyEDLMay/GqCl3HoAtH5+RUKW29gYkL0QA+ipzpDLA16yQs7/RHCSu+BwgbJaOUqa4A99qNVQVw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=16"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/is-number": {
      "version": "7.0.0",
      "resolved": "https://registry.npmjs.org/is-number/-/is-number-7.0.0.tgz",
      "integrity": "sha512-41Cifkg6e8TylSpdtTpeLVMqvSBEVzTttHvERD741+pnZ8ANv0004MRL43QKPDlK9cGvNp6NZWZUBlbGXYxxng==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.12.0"
      }
    },
    "node_modules/is-plain-obj": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/is-plain-obj/-/is-plain-obj-3.0.0.tgz",
      "integrity": "sha512-gwsOE28k+23GP1B6vFl1oVh/WOzmawBrKwo5Ev6wMKzPkaXaCDIQKzLnvsA42DRlbVTWorkgTKIviAKCWkfUwA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/is-plain-object": {
      "version": "5.0.0",
      "resolved": "https://registry.npmjs.org/is-plain-object/-/is-plain-object-5.0.0.tgz",
      "integrity": "sha512-VRSzKkbMm5jMDoKLbltAkFQ5Qr7VDiTFGXxYFXXowVj387GeGNOCsOH6Msy00SGZ3Fp84b1Naa1psqgcCIEP5Q==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/is-promise": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/is-promise/-/is-promise-4.0.0.tgz",
      "integrity": "sha512-hvpoI6korhJMnej285dSg6nu1+e6uxs7zG3BYAm5byqDsgJNWwxzM6z6iZiAgQR4TJ30JmBTOwqZUw3WlyH3AQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/is-regex": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/is-regex/-/is-regex-1.2.1.tgz",
      "integrity": "sha512-MjYsKHO5O7mCsmRGxWcLWheFqN9DJ/2TmngvjKXihe6efViPqc274+Fx/4fYj/r03+ESvBdTXK0V6tA3rgez1g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.2",
        "gopd": "^1.2.0",
        "has-tostringtag": "^1.0.2",
        "hasown": "^2.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-unicode-supported": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/is-unicode-supported/-/is-unicode-supported-2.1.0.tgz",
      "integrity": "sha512-mE00Gnza5EEB3Ds0HfMyllZzbBrmLOX3vfWoj9A9PEnTfratQ/BcaJOuMhnkhjXvb2+FkY3VuHqtAGpTPmglFQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/is-what": {
      "version": "3.14.1",
      "resolved": "https://registry.npmjs.org/is-what/-/is-what-3.14.1.tgz",
      "integrity": "sha512-sNxgpk9793nzSs7bA6JQJGeIuRBQhAaNGG77kzYQgMkrID+lS6SlK07K5LaptscDlSaIgH+GPFzf+d75FVxozA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/is-wsl": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/is-wsl/-/is-wsl-3.1.0.tgz",
      "integrity": "sha512-UcVfVfaK4Sc4m7X3dUSoHoozQGBEFeDC+zVo06t98xe8CzHSZZBekNXH+tu0NalHolcJ/QAGqS46Hef7QXBIMw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "is-inside-container": "^1.0.0"
      },
      "engines": {
        "node": ">=16"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/isarray": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/isarray/-/isarray-1.0.0.tgz",
      "integrity": "sha512-VLghIWNM6ELQzo7zwmcg0NmTVyWKYjvIeM83yjp0wRDTmUnrM678fQbcKBo6n2CJEF0szoG//ytg+TKla89ALQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/isbinaryfile": {
      "version": "4.0.10",
      "resolved": "https://registry.npmjs.org/isbinaryfile/-/isbinaryfile-4.0.10.tgz",
      "integrity": "sha512-iHrqe5shvBUcFbmZq9zOQHBoeOhZJu6RQGrDpBgenUm/Am+F3JM2MgQj+rK3Z601fzrL5gLZWtAPH2OBaSVcyw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 8.0.0"
      },
      "funding": {
        "url": "https://github.com/sponsors/gjtorikian/"
      }
    },
    "node_modules/isexe": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/isexe/-/isexe-2.0.0.tgz",
      "integrity": "sha512-RHxMLp9lnKHGHRng9QFhRCMbYAcVpn69smSGcq3f36xjgVVWThj4qqLbTLlq7Ssj8B+fIQ1EuCEGI2lKsyQeIw==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/isobject": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/isobject/-/isobject-3.0.1.tgz",
      "integrity": "sha512-WhB9zCku7EGTj/HQQRz5aUQEUeoQZH2bWcltRErOpymJ4boYE6wL9Tbr23krRPSZ+C5zqNSrSw+Cc7sZZ4b7vg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/istanbul-lib-coverage": {
      "version": "3.2.2",
      "resolved": "https://registry.npmjs.org/istanbul-lib-coverage/-/istanbul-lib-coverage-3.2.2.tgz",
      "integrity": "sha512-O8dpsF+r0WV/8MNRKfnmrtCWhuKjxrq2w+jpzBL5UZKTi2LeVWnWOmWRxFlesJONmc+wLAGvKQZEOanko0LFTg==",
      "dev": true,
      "license": "BSD-3-Clause",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/istanbul-lib-instrument": {
      "version": "6.0.3",
      "resolved": "https://registry.npmjs.org/istanbul-lib-instrument/-/istanbul-lib-instrument-6.0.3.tgz",
      "integrity": "sha512-Vtgk7L/R2JHyyGW07spoFlB8/lpjiOLTjMdms6AFMraYt3BaJauod/NGrfnVG/y4Ix1JEuMRPDPEj2ua+zz1/Q==",
      "dev": true,
      "license": "BSD-3-Clause",
      "dependencies": {
        "@babel/core": "^7.23.9",
        "@babel/parser": "^7.23.9",
        "@istanbuljs/schema": "^0.1.3",
        "istanbul-lib-coverage": "^3.2.0",
        "semver": "^7.5.4"
      },
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/istanbul-lib-report": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/istanbul-lib-report/-/istanbul-lib-report-3.0.1.tgz",
      "integrity": "sha512-GCfE1mtsHGOELCU8e/Z7YWzpmybrx/+dSTfLrvY8qRmaY6zXTKWn6WQIjaAFw069icm6GVMNkgu0NzI4iPZUNw==",
      "dev": true,
      "license": "BSD-3-Clause",
      "dependencies": {
        "istanbul-lib-coverage": "^3.0.0",
        "make-dir": "^4.0.0",
        "supports-color": "^7.1.0"
      },
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/istanbul-lib-source-maps": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/istanbul-lib-source-maps/-/istanbul-lib-source-maps-4.0.1.tgz",
      "integrity": "sha512-n3s8EwkdFIJCG3BPKBYvskgXGoy88ARzvegkitk60NxRdwltLOTaH7CUiMRXvwYorl0Q712iEjcWB+fK/MrWVw==",
      "dev": true,
      "license": "BSD-3-Clause",
      "dependencies": {
        "debug": "^4.1.1",
        "istanbul-lib-coverage": "^3.0.0",
        "source-map": "^0.6.1"
      },
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/istanbul-lib-source-maps/node_modules/source-map": {
      "version": "0.6.1",
      "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.6.1.tgz",
      "integrity": "sha512-UjgapumWlbMhkBgzT7Ykc5YXUT46F0iKu8SGXq0bcwP5dz/h0Plj6enJqjz1Zbq2l5WaqYnrVbwWOWMyF3F47g==",
      "dev": true,
      "license": "BSD-3-Clause",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/istanbul-reports": {
      "version": "3.2.0",
      "resolved": "https://registry.npmjs.org/istanbul-reports/-/istanbul-reports-3.2.0.tgz",
      "integrity": "sha512-HGYWWS/ehqTV3xN10i23tkPkpH46MLCIMFNCaaKNavAXTF1RkqxawEPtnjnGZ6XKSInBKkiOA5BKS+aZiY3AvA==",
      "dev": true,
      "license": "BSD-3-Clause",
      "dependencies": {
        "html-escaper": "^2.0.0",
        "istanbul-lib-report": "^3.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/jackspeak": {
      "version": "3.4.3",
      "resolved": "https://registry.npmjs.org/jackspeak/-/jackspeak-3.4.3.tgz",
      "integrity": "sha512-OGlZQpz2yfahA/Rd1Y8Cd9SIEsqvXkLVoSw/cgwhnhFMDbsQFeZYoJJ7bIZBS9BcamUW96asq/npPWugM+RQBw==",
      "dev": true,
      "license": "BlueOak-1.0.0",
      "dependencies": {
        "@isaacs/cliui": "^8.0.2"
      },
      "funding": {
        "url": "https://github.com/sponsors/isaacs"
      },
      "optionalDependencies": {
        "@pkgjs/parseargs": "^0.11.0"
      }
    },
    "node_modules/jasmine-core": {
      "version": "5.9.0",
      "resolved": "https://registry.npmjs.org/jasmine-core/-/jasmine-core-5.9.0.tgz",
      "integrity": "sha512-OMUvF1iI6+gSRYOhMrH4QYothVLN9C3EJ6wm4g7zLJlnaTl8zbaPOr0bTw70l7QxkoM7sVFOWo83u9B2Fe2Zng==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/jest-worker": {
      "version": "27.5.1",
      "resolved": "https://registry.npmjs.org/jest-worker/-/jest-worker-27.5.1.tgz",
      "integrity": "sha512-7vuh85V5cdDofPyxn58nrPjBktZo0u9x1g8WtjQol+jZDaE+fhN+cIvTj11GndBnMnyfrUOG1sZQxCdjKh+DKg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/node": "*",
        "merge-stream": "^2.0.0",
        "supports-color": "^8.0.0"
      },
      "engines": {
        "node": ">= 10.13.0"
      }
    },
    "node_modules/jest-worker/node_modules/supports-color": {
      "version": "8.1.1",
      "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-8.1.1.tgz",
      "integrity": "sha512-MpUEN2OodtUzxvKQl72cUF7RQ5EiHsGvSsVG0ia9c5RbWGL2CI4C7EpPS8UTBIplnlzZiNuV56w+FuNxy3ty2Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "has-flag": "^4.0.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/chalk/supports-color?sponsor=1"
      }
    },
    "node_modules/jiti": {
      "version": "1.21.7",
      "resolved": "https://registry.npmjs.org/jiti/-/jiti-1.21.7.tgz",
      "integrity": "sha512-/imKNG4EbWNrVjoNC/1H5/9GFy+tqjGBHCaSsN+P2RnPqjsLmv6UD3Ej+Kj8nBWaRAwyk7kK5ZUc+OEatnTR3A==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "jiti": "bin/jiti.js"
      }
    },
    "node_modules/js-tokens": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/js-tokens/-/js-tokens-4.0.0.tgz",
      "integrity": "sha512-RdJUflcE3cUzKiMqQgsCu06FPu9UdIJO0beYbPhHN4k6apgJtifcoCtT9bcxOpYBtpD2kCM6Sbzg4CausW/PKQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/js-yaml": {
      "version": "4.1.0",
      "resolved": "https://registry.npmjs.org/js-yaml/-/js-yaml-4.1.0.tgz",
      "integrity": "sha512-wpxZs9NoxZaJESJGIZTyDEaYpl0FKSA+FB9aJiyemKhMwkxQg63h4T1KJgUGHpTqPDNRcmmYLugrRjJlBtWvRA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "argparse": "^2.0.1"
      },
      "bin": {
        "js-yaml": "bin/js-yaml.js"
      }
    },
    "node_modules/jsesc": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/jsesc/-/jsesc-3.1.0.tgz",
      "integrity": "sha512-/sM3dO2FOzXjKQhJuo0Q173wf2KOo8t4I8vHy6lF9poUp7bKT0/NHE8fPX23PwfhnykfqnC2xRxOnVw5XuGIaA==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "jsesc": "bin/jsesc"
      },
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/json-parse-even-better-errors": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/json-parse-even-better-errors/-/json-parse-even-better-errors-4.0.0.tgz",
      "integrity": "sha512-lR4MXjGNgkJc7tkQ97kb2nuEMnNCyU//XYVH0MKTGcXEiSudQ5MKGKen3C5QubYy0vmq+JGitUg92uuywGEwIA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "^18.17.0 || >=20.5.0"
      }
    },
    "node_modules/json-schema-traverse": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/json-schema-traverse/-/json-schema-traverse-1.0.0.tgz",
      "integrity": "sha512-NM8/P9n3XjXhIZn1lLhkFaACTOURQXjWhV4BA/RnOv8xvgqtqpAX9IO4mRQxSx1Rlo4tqzeqb0sOlruaOy3dug==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/json5": {
      "version": "2.2.3",
      "resolved": "https://registry.npmjs.org/json5/-/json5-2.2.3.tgz",
      "integrity": "sha512-XmOWe7eyHYH14cLdVPoyg+GOH3rYX++KpzrylJwSW98t3Nk+U8XOl8FWKOgwtzdb8lXGf6zYwDUzeHMWfxasyg==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "json5": "lib/cli.js"
      },
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/jsonc-parser": {
      "version": "3.3.1",
      "resolved": "https://registry.npmjs.org/jsonc-parser/-/jsonc-parser-3.3.1.tgz",
      "integrity": "sha512-HUgH65KyejrUFPvHFPbqOY0rsFip3Bo5wb4ngvdi1EpCYWUQDC5V+Y7mZws+DLkr4M//zQJoanu1SP+87Dv1oQ==",
      "license": "MIT"
    },
    "node_modules/jsonfile": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/jsonfile/-/jsonfile-4.0.0.tgz",
      "integrity": "sha512-m6F1R3z8jjlf2imQHS2Qez5sjKWQzbuuhuJ/FKYFRZvPE3PuHcSMVZzfsLhGVOkfd20obL5SWEBew5ShlquNxg==",
      "dev": true,
      "license": "MIT",
      "optionalDependencies": {
        "graceful-fs": "^4.1.6"
      }
    },
    "node_modules/jsonparse": {
      "version": "1.3.1",
      "resolved": "https://registry.npmjs.org/jsonparse/-/jsonparse-1.3.1.tgz",
      "integrity": "sha512-POQXvpdL69+CluYsillJ7SUhKvytYjW9vG/GKpnf+xP8UWgYEM/RaMzHHofbALDiKbbP1W8UEYmgGl39WkPZsg==",
      "dev": true,
      "engines": [
        "node >= 0.2.0"
      ],
      "license": "MIT"
    },
    "node_modules/karma": {
      "version": "6.4.4",
      "resolved": "https://registry.npmjs.org/karma/-/karma-6.4.4.tgz",
      "integrity": "sha512-LrtUxbdvt1gOpo3gxG+VAJlJAEMhbWlM4YrFQgql98FwF7+K8K12LYO4hnDdUkNjeztYrOXEMqgTajSWgmtI/w==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@colors/colors": "1.5.0",
        "body-parser": "^1.19.0",
        "braces": "^3.0.2",
        "chokidar": "^3.5.1",
        "connect": "^3.7.0",
        "di": "^0.0.1",
        "dom-serialize": "^2.2.1",
        "glob": "^7.1.7",
        "graceful-fs": "^4.2.6",
        "http-proxy": "^1.18.1",
        "isbinaryfile": "^4.0.8",
        "lodash": "^4.17.21",
        "log4js": "^6.4.1",
        "mime": "^2.5.2",
        "minimatch": "^3.0.4",
        "mkdirp": "^0.5.5",
        "qjobs": "^1.2.0",
        "range-parser": "^1.2.1",
        "rimraf": "^3.0.2",
        "socket.io": "^4.7.2",
        "source-map": "^0.6.1",
        "tmp": "^0.2.1",
        "ua-parser-js": "^0.7.30",
        "yargs": "^16.1.1"
      },
      "bin": {
        "karma": "bin/karma"
      },
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/karma-chrome-launcher": {
      "version": "3.2.0",
      "resolved": "https://registry.npmjs.org/karma-chrome-launcher/-/karma-chrome-launcher-3.2.0.tgz",
      "integrity": "sha512-rE9RkUPI7I9mAxByQWkGJFXfFD6lE4gC5nPuZdobf/QdTEJI6EU4yIay/cfU/xV4ZxlM5JiTv7zWYgA64NpS5Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "which": "^1.2.1"
      }
    },
    "node_modules/karma-chrome-launcher/node_modules/which": {
      "version": "1.3.1",
      "resolved": "https://registry.npmjs.org/which/-/which-1.3.1.tgz",
      "integrity": "sha512-HxJdYWq1MTIQbJ3nw0cqssHoTNU267KlrDuGZ1WYlxDStUtKUhOaJmh112/TZmHxxUfuJqPXSOm7tDyas0OSIQ==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "isexe": "^2.0.0"
      },
      "bin": {
        "which": "bin/which"
      }
    },
    "node_modules/karma-coverage": {
      "version": "2.2.1",
      "resolved": "https://registry.npmjs.org/karma-coverage/-/karma-coverage-2.2.1.tgz",
      "integrity": "sha512-yj7hbequkQP2qOSb20GuNSIyE//PgJWHwC2IydLE6XRtsnaflv+/OSGNssPjobYUlhVVagy99TQpqUt3vAUG7A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "istanbul-lib-coverage": "^3.2.0",
        "istanbul-lib-instrument": "^5.1.0",
        "istanbul-lib-report": "^3.0.0",
        "istanbul-lib-source-maps": "^4.0.1",
        "istanbul-reports": "^3.0.5",
        "minimatch": "^3.0.4"
      },
      "engines": {
        "node": ">=10.0.0"
      }
    },
    "node_modules/karma-coverage/node_modules/istanbul-lib-instrument": {
      "version": "5.2.1",
      "resolved": "https://registry.npmjs.org/istanbul-lib-instrument/-/istanbul-lib-instrument-5.2.1.tgz",
      "integrity": "sha512-pzqtp31nLv/XFOzXGuvhCb8qhjmTVo5vjVk19XE4CRlSWz0KoeJ3bw9XsA7nOp9YBf4qHjwBxkDzKcME/J29Yg==",
      "dev": true,
      "license": "BSD-3-Clause",
      "dependencies": {
        "@babel/core": "^7.12.3",
        "@babel/parser": "^7.14.7",
        "@istanbuljs/schema": "^0.1.2",
        "istanbul-lib-coverage": "^3.2.0",
        "semver": "^6.3.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/karma-coverage/node_modules/semver": {
      "version": "6.3.1",
      "resolved": "https://registry.npmjs.org/semver/-/semver-6.3.1.tgz",
      "integrity": "sha512-BR7VvDCVHO+q2xBEWskxS6DJE1qRnb7DxzUrogb71CWoSficBxYsiAGd+Kl0mmq/MprG9yArRkyrQxTO6XjMzA==",
      "dev": true,
      "license": "ISC",
      "bin": {
        "semver": "bin/semver.js"
      }
    },
    "node_modules/karma-jasmine": {
      "version": "5.1.0",
      "resolved": "https://registry.npmjs.org/karma-jasmine/-/karma-jasmine-5.1.0.tgz",
      "integrity": "sha512-i/zQLFrfEpRyQoJF9fsCdTMOF5c2dK7C7OmsuKg2D0YSsuZSfQDiLuaiktbuio6F2wiCsZSnSnieIQ0ant/uzQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "jasmine-core": "^4.1.0"
      },
      "engines": {
        "node": ">=12"
      },
      "peerDependencies": {
        "karma": "^6.0.0"
      }
    },
    "node_modules/karma-jasmine-html-reporter": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/karma-jasmine-html-reporter/-/karma-jasmine-html-reporter-2.1.0.tgz",
      "integrity": "sha512-sPQE1+nlsn6Hwb5t+HHwyy0A1FNCVKuL1192b+XNauMYWThz2kweiBVW1DqloRpVvZIJkIoHVB7XRpK78n1xbQ==",
      "dev": true,
      "license": "MIT",
      "peerDependencies": {
        "jasmine-core": "^4.0.0 || ^5.0.0",
        "karma": "^6.0.0",
        "karma-jasmine": "^5.0.0"
      }
    },
    "node_modules/karma-jasmine/node_modules/jasmine-core": {
      "version": "4.6.1",
      "resolved": "https://registry.npmjs.org/jasmine-core/-/jasmine-core-4.6.1.tgz",
      "integrity": "sha512-VYz/BjjmC3klLJlLwA4Kw8ytk0zDSmbbDLNs794VnWmkcCB7I9aAL/D48VNQtmITyPvea2C3jdUMfc3kAoy0PQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/karma-source-map-support": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/karma-source-map-support/-/karma-source-map-support-1.4.0.tgz",
      "integrity": "sha512-RsBECncGO17KAoJCYXjv+ckIz+Ii9NCi+9enk+rq6XC81ezYkb4/RHE6CTXdA7IOJqoF3wcaLfVG0CPmE5ca6A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "source-map-support": "^0.5.5"
      }
    },
    "node_modules/karma/node_modules/ansi-regex": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-5.0.1.tgz",
      "integrity": "sha512-quJQXlTSUGL2LH9SUXo8VwsY4soanhgo6LNSm84E1LBcE8s3O0wpdiRzyR9z/ZZJMlMWv37qOOb9pdJlMUEKFQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/karma/node_modules/ansi-styles": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-4.3.0.tgz",
      "integrity": "sha512-zbB9rCJAT1rbjiVDb2hqKFHNYLxgtk8NURxZ3IZwD3F6NtxbXZQCnnSi1Lkx+IDohdPlFp222wVALIheZJQSEg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "color-convert": "^2.0.1"
      },
      "engines": {
        "node": ">=8"
      },
      "funding": {
        "url": "https://github.com/chalk/ansi-styles?sponsor=1"
      }
    },
    "node_modules/karma/node_modules/chokidar": {
      "version": "3.6.0",
      "resolved": "https://registry.npmjs.org/chokidar/-/chokidar-3.6.0.tgz",
      "integrity": "sha512-7VT13fmjotKpGipCW9JEQAusEPE+Ei8nl6/g4FBAmIm0GOOLMua9NDDo/DWp0ZAxCr3cPq5ZpBqmPAQgDda2Pw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "anymatch": "~3.1.2",
        "braces": "~3.0.2",
        "glob-parent": "~5.1.2",
        "is-binary-path": "~2.1.0",
        "is-glob": "~4.0.1",
        "normalize-path": "~3.0.0",
        "readdirp": "~3.6.0"
      },
      "engines": {
        "node": ">= 8.10.0"
      },
      "funding": {
        "url": "https://paulmillr.com/funding/"
      },
      "optionalDependencies": {
        "fsevents": "~2.3.2"
      }
    },
    "node_modules/karma/node_modules/cliui": {
      "version": "7.0.4",
      "resolved": "https://registry.npmjs.org/cliui/-/cliui-7.0.4.tgz",
      "integrity": "sha512-OcRE68cOsVMXp1Yvonl/fzkQOyjLSu/8bhPDfQt0e0/Eb283TKP20Fs2MqoPsr9SwA595rRCA+QMzYc9nBP+JQ==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "string-width": "^4.2.0",
        "strip-ansi": "^6.0.0",
        "wrap-ansi": "^7.0.0"
      }
    },
    "node_modules/karma/node_modules/emoji-regex": {
      "version": "8.0.0",
      "resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-8.0.0.tgz",
      "integrity": "sha512-MSjYzcWNOA0ewAHpz0MxpYFvwg6yjy1NG3xteoqz644VCo/RPgnr1/GGt+ic3iJTzQ8Eu3TdM14SawnVUmGE6A==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/karma/node_modules/glob-parent": {
      "version": "5.1.2",
      "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-5.1.2.tgz",
      "integrity": "sha512-AOIgSQCepiJYwP3ARnGx+5VnTu2HBYdzbGP45eLw1vr3zB3vZLeyed1sC9hnbcOc9/SrMyM5RPQrkGz4aS9Zow==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "is-glob": "^4.0.1"
      },
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/karma/node_modules/is-fullwidth-code-point": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/is-fullwidth-code-point/-/is-fullwidth-code-point-3.0.0.tgz",
      "integrity": "sha512-zymm5+u+sCsSWyD9qNaejV3DFvhCKclKdizYaJUuHA83RLjb7nSuGnddCHGv0hk+KY7BMAlsWeK4Ueg6EV6XQg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/karma/node_modules/picomatch": {
      "version": "2.3.1",
      "resolved": "https://registry.npmjs.org/picomatch/-/picomatch-2.3.1.tgz",
      "integrity": "sha512-JU3teHTNjmE2VCGFzuY8EXzCDVwEqB2a8fsIvwaStHhAWJEeVd1o1QD80CU6+ZdEXXSLbSsuLwJjkCBWqRQUVA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8.6"
      },
      "funding": {
        "url": "https://github.com/sponsors/jonschlinkert"
      }
    },
    "node_modules/karma/node_modules/readdirp": {
      "version": "3.6.0",
      "resolved": "https://registry.npmjs.org/readdirp/-/readdirp-3.6.0.tgz",
      "integrity": "sha512-hOS089on8RduqdbhvQ5Z37A0ESjsqz6qnRcffsMU3495FuTdqSm+7bhJ29JvIOsBDEEnan5DPu9t3To9VRlMzA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "picomatch": "^2.2.1"
      },
      "engines": {
        "node": ">=8.10.0"
      }
    },
    "node_modules/karma/node_modules/source-map": {
      "version": "0.6.1",
      "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.6.1.tgz",
      "integrity": "sha512-UjgapumWlbMhkBgzT7Ykc5YXUT46F0iKu8SGXq0bcwP5dz/h0Plj6enJqjz1Zbq2l5WaqYnrVbwWOWMyF3F47g==",
      "dev": true,
      "license": "BSD-3-Clause",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/karma/node_modules/string-width": {
      "version": "4.2.3",
      "resolved": "https://registry.npmjs.org/string-width/-/string-width-4.2.3.tgz",
      "integrity": "sha512-wKyQRQpjJ0sIp62ErSZdGsjMJWsap5oRNihHhu6G7JVO/9jIB6UyevL+tXuOqrng8j/cxKTWyWUwvSTriiZz/g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "emoji-regex": "^8.0.0",
        "is-fullwidth-code-point": "^3.0.0",
        "strip-ansi": "^6.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/karma/node_modules/strip-ansi": {
      "version": "6.0.1",
      "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-6.0.1.tgz",
      "integrity": "sha512-Y38VPSHcqkFrCpFnQ9vuSXmquuv5oXOKpGeT6aGrr3o3Gc9AlVa6JBfUSOCnbxGGZF+/0ooI7KrPuUSztUdU5A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ansi-regex": "^5.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/karma/node_modules/wrap-ansi": {
      "version": "7.0.0",
      "resolved": "https://registry.npmjs.org/wrap-ansi/-/wrap-ansi-7.0.0.tgz",
      "integrity": "sha512-YVGIj2kamLSTxw6NsZjoBxfSwsn0ycdesmc4p+Q21c5zPuZ1pl+NfxVdxPtdHvmNVOQ6XSYG4AUtyt/Fi7D16Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ansi-styles": "^4.0.0",
        "string-width": "^4.1.0",
        "strip-ansi": "^6.0.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/chalk/wrap-ansi?sponsor=1"
      }
    },
    "node_modules/karma/node_modules/yargs": {
      "version": "16.2.0",
      "resolved": "https://registry.npmjs.org/yargs/-/yargs-16.2.0.tgz",
      "integrity": "sha512-D1mvvtDG0L5ft/jGWkLpG1+m0eQxOfaBvTNELraWj22wSVUMWxZUvYgJYcKh6jGGIkJFhH4IZPQhR4TKpc8mBw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "cliui": "^7.0.2",
        "escalade": "^3.1.1",
        "get-caller-file": "^2.0.5",
        "require-directory": "^2.1.1",
        "string-width": "^4.2.0",
        "y18n": "^5.0.5",
        "yargs-parser": "^20.2.2"
      },
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/karma/node_modules/yargs-parser": {
      "version": "20.2.9",
      "resolved": "https://registry.npmjs.org/yargs-parser/-/yargs-parser-20.2.9.tgz",
      "integrity": "sha512-y11nGElTIV+CT3Zv9t7VKl+Q3hTQoT9a1Qzezhhl6Rp21gJ/IVTW7Z3y9EWXhuUBC2Shnf+DX0antecpAwSP8w==",
      "dev": true,
      "license": "ISC",
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/kind-of": {
      "version": "6.0.3",
      "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-6.0.3.tgz",
      "integrity": "sha512-dcS1ul+9tmeD95T+x28/ehLgd9mENa3LsvDTtzm3vyBEO7RPptvAD+t44WVXaUjTBRcrpFeFlC8WCruUR456hw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/launch-editor": {
      "version": "2.11.1",
      "resolved": "https://registry.npmjs.org/launch-editor/-/launch-editor-2.11.1.tgz",
      "integrity": "sha512-SEET7oNfgSaB6Ym0jufAdCeo3meJVeCaaDyzRygy0xsp2BFKCprcfHljTq4QkzTLUxEKkFK6OK4811YM2oSrRg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "picocolors": "^1.1.1",
        "shell-quote": "^1.8.3"
      }
    },
    "node_modules/less": {
      "version": "4.4.0",
      "resolved": "https://registry.npmjs.org/less/-/less-4.4.0.tgz",
      "integrity": "sha512-kdTwsyRuncDfjEs0DlRILWNvxhDG/Zij4YLO4TMJgDLW+8OzpfkdPnRgrsRuY1o+oaxJGWsps5f/RVBgGmmN0w==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "copy-anything": "^2.0.1",
        "parse-node-version": "^1.0.1",
        "tslib": "^2.3.0"
      },
      "bin": {
        "lessc": "bin/lessc"
      },
      "engines": {
        "node": ">=14"
      },
      "optionalDependencies": {
        "errno": "^0.1.1",
        "graceful-fs": "^4.1.2",
        "image-size": "~0.5.0",
        "make-dir": "^2.1.0",
        "mime": "^1.4.1",
        "needle": "^3.1.0",
        "source-map": "~0.6.0"
      }
    },
    "node_modules/less-loader": {
      "version": "12.3.0",
      "resolved": "https://registry.npmjs.org/less-loader/-/less-loader-12.3.0.tgz",
      "integrity": "sha512-0M6+uYulvYIWs52y0LqN4+QM9TqWAohYSNTo4htE8Z7Cn3G/qQMEmktfHmyJT23k+20kU9zHH2wrfFXkxNLtVw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 18.12.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/webpack"
      },
      "peerDependencies": {
        "@rspack/core": "0.x || 1.x",
        "less": "^3.5.0 || ^4.0.0",
        "webpack": "^5.0.0"
      },
      "peerDependenciesMeta": {
        "@rspack/core": {
          "optional": true
        },
        "webpack": {
          "optional": true
        }
      }
    },
    "node_modules/less/node_modules/make-dir": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/make-dir/-/make-dir-2.1.0.tgz",
      "integrity": "sha512-LS9X+dc8KLxXCb8dni79fLIIUA5VyZoyjSMCwTluaXA0o27cCK0bhXkpgw+sTXVpPy/lSO57ilRixqk0vDmtRA==",
      "dev": true,
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "pify": "^4.0.1",
        "semver": "^5.6.0"
      },
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/less/node_modules/mime": {
      "version": "1.6.0",
      "resolved": "https://registry.npmjs.org/mime/-/mime-1.6.0.tgz",
      "integrity": "sha512-x0Vn8spI+wuJ1O6S7gnbaQg8Pxh4NNHb7KSINmEWKiPE4RKOplvijn+NkmYmmRgP68mc70j2EbeTFRsrswaQeg==",
      "dev": true,
      "license": "MIT",
      "optional": true,
      "bin": {
        "mime": "cli.js"
      },
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/less/node_modules/semver": {
      "version": "5.7.2",
      "resolved": "https://registry.npmjs.org/semver/-/semver-5.7.2.tgz",
      "integrity": "sha512-cBznnQ9KjJqU67B52RMC65CMarK2600WFnbkcaiwWq3xy/5haFJlshgnpjovMVJ+Hff49d8GEn0b87C5pDQ10g==",
      "dev": true,
      "license": "ISC",
      "optional": true,
      "bin": {
        "semver": "bin/semver"
      }
    },
    "node_modules/less/node_modules/source-map": {
      "version": "0.6.1",
      "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.6.1.tgz",
      "integrity": "sha512-UjgapumWlbMhkBgzT7Ykc5YXUT46F0iKu8SGXq0bcwP5dz/h0Plj6enJqjz1Zbq2l5WaqYnrVbwWOWMyF3F47g==",
      "dev": true,
      "license": "BSD-3-Clause",
      "optional": true,
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/license-webpack-plugin": {
      "version": "4.0.2",
      "resolved": "https://registry.npmjs.org/license-webpack-plugin/-/license-webpack-plugin-4.0.2.tgz",
      "integrity": "sha512-771TFWFD70G1wLTC4oU2Cw4qvtmNrIw+wRvBtn+okgHl7slJVi7zfNcdmqDL72BojM30VNJ2UHylr1o77U37Jw==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "webpack-sources": "^3.0.0"
      },
      "peerDependenciesMeta": {
        "webpack": {
          "optional": true
        },
        "webpack-sources": {
          "optional": true
        }
      }
    },
    "node_modules/lines-and-columns": {
      "version": "1.2.4",
      "resolved": "https://registry.npmjs.org/lines-and-columns/-/lines-and-columns-1.2.4.tgz",
      "integrity": "sha512-7ylylesZQ/PV29jhEDl3Ufjo6ZX7gCqJr5F7PKrqc93v7fzSymt1BpwEU8nAUXs8qzzvqhbjhK5QZg6Mt/HkBg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/listr2": {
      "version": "9.0.1",
      "resolved": "https://registry.npmjs.org/listr2/-/listr2-9.0.1.tgz",
      "integrity": "sha512-SL0JY3DaxylDuo/MecFeiC+7pedM0zia33zl0vcjgwcq1q1FWWF1To9EIauPbl8GbMCU0R2e0uJ8bZunhYKD2g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "cli-truncate": "^4.0.0",
        "colorette": "^2.0.20",
        "eventemitter3": "^5.0.1",
        "log-update": "^6.1.0",
        "rfdc": "^1.4.1",
        "wrap-ansi": "^9.0.0"
      },
      "engines": {
        "node": ">=20.0.0"
      }
    },
    "node_modules/listr2/node_modules/eventemitter3": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/eventemitter3/-/eventemitter3-5.0.1.tgz",
      "integrity": "sha512-GWkBvjiSZK87ELrYOSESUYeVIc9mvLLf/nXalMOS5dYrgZq9o5OVkbZAVM06CVxYsCwH9BDZFPlQTlPA1j4ahA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/listr2/node_modules/wrap-ansi": {
      "version": "9.0.2",
      "resolved": "https://registry.npmjs.org/wrap-ansi/-/wrap-ansi-9.0.2.tgz",
      "integrity": "sha512-42AtmgqjV+X1VpdOfyTGOYRi0/zsoLqtXQckTmqTeybT+BDIbM/Guxo7x3pE2vtpr1ok6xRqM9OpBe+Jyoqyww==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ansi-styles": "^6.2.1",
        "string-width": "^7.0.0",
        "strip-ansi": "^7.1.0"
      },
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/chalk/wrap-ansi?sponsor=1"
      }
    },
    "node_modules/lmdb": {
      "version": "3.4.2",
      "resolved": "https://registry.npmjs.org/lmdb/-/lmdb-3.4.2.tgz",
      "integrity": "sha512-nwVGUfTBUwJKXd6lRV8pFNfnrCC1+l49ESJRM19t/tFb/97QfJEixe5DYRvug5JO7DSFKoKaVy7oGMt5rVqZvg==",
      "dev": true,
      "hasInstallScript": true,
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "msgpackr": "^1.11.2",
        "node-addon-api": "^6.1.0",
        "node-gyp-build-optional-packages": "5.2.2",
        "ordered-binary": "^1.5.3",
        "weak-lru-cache": "^1.2.2"
      },
      "bin": {
        "download-lmdb-prebuilds": "bin/download-prebuilds.js"
      },
      "optionalDependencies": {
        "@lmdb/lmdb-darwin-arm64": "3.4.2",
        "@lmdb/lmdb-darwin-x64": "3.4.2",
        "@lmdb/lmdb-linux-arm": "3.4.2",
        "@lmdb/lmdb-linux-arm64": "3.4.2",
        "@lmdb/lmdb-linux-x64": "3.4.2",
        "@lmdb/lmdb-win32-arm64": "3.4.2",
        "@lmdb/lmdb-win32-x64": "3.4.2"
      }
    },
    "node_modules/loader-runner": {
      "version": "4.3.1",
      "resolved": "https://registry.npmjs.org/loader-runner/-/loader-runner-4.3.1.tgz",
      "integrity": "sha512-IWqP2SCPhyVFTBtRcgMHdzlf9ul25NwaFx4wCEH/KjAXuuHY4yNjvPXsBokp8jCB936PyWRaPKUNh8NvylLp2Q==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.11.5"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/webpack"
      }
    },
    "node_modules/loader-utils": {
      "version": "3.3.1",
      "resolved": "https://registry.npmjs.org/loader-utils/-/loader-utils-3.3.1.tgz",
      "integrity": "sha512-FMJTLMXfCLMLfJxcX9PFqX5qD88Z5MRGaZCVzfuqeZSPsyiBzs+pahDQjbIWz2QIzPZz0NX9Zy4FX3lmK6YHIg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 12.13.0"
      }
    },
    "node_modules/locate-path": {
      "version": "6.0.0",
      "resolved": "https://registry.npmjs.org/locate-path/-/locate-path-6.0.0.tgz",
      "integrity": "sha512-iPZK6eYjbxRu3uB4/WZ3EsEIMJFMqAoopl3R+zuq0UjcAm/MO6KCweDgPfP3elTztoKP3KtnVHxTn2NHBSDVUw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "p-locate": "^5.0.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/lodash": {
      "version": "4.17.21",
      "resolved": "https://registry.npmjs.org/lodash/-/lodash-4.17.21.tgz",
      "integrity": "sha512-v2kDEe57lecTulaDIuNTPy3Ry4gLGJ6Z1O3vE1krgXZNrsQ+LFTGHVxVjcXPs17LhbZVGedAJv8XZ1tvj5FvSg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/lodash.debounce": {
      "version": "4.0.8",
      "resolved": "https://registry.npmjs.org/lodash.debounce/-/lodash.debounce-4.0.8.tgz",
      "integrity": "sha512-FT1yDzDYEoYWhnSGnpE/4Kj1fLZkDFyqRb7fNt6FdYOSxlUWAtp42Eh6Wb0rGIv/m9Bgo7x4GhQbm5Ys4SG5ow==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/log-symbols": {
      "version": "6.0.0",
      "resolved": "https://registry.npmjs.org/log-symbols/-/log-symbols-6.0.0.tgz",
      "integrity": "sha512-i24m8rpwhmPIS4zscNzK6MSEhk0DUWa/8iYQWxhffV8jkI4Phvs3F+quL5xvS0gdQR0FyTCMMH33Y78dDTzzIw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "chalk": "^5.3.0",
        "is-unicode-supported": "^1.3.0"
      },
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/log-symbols/node_modules/is-unicode-supported": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/is-unicode-supported/-/is-unicode-supported-1.3.0.tgz",
      "integrity": "sha512-43r2mRvz+8JRIKnWJ+3j8JtjRKZ6GmjzfaE/qiBJnikNnYv/6bagRJ1kUhNk8R5EX/GkobD+r+sfxCPJsiKBLQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/log-update": {
      "version": "6.1.0",
      "resolved": "https://registry.npmjs.org/log-update/-/log-update-6.1.0.tgz",
      "integrity": "sha512-9ie8ItPR6tjY5uYJh8K/Zrv/RMZ5VOlOWvtZdEHYSTFKZfIBPQa9tOAEeAWhd+AnIneLJ22w5fjOYtoutpWq5w==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ansi-escapes": "^7.0.0",
        "cli-cursor": "^5.0.0",
        "slice-ansi": "^7.1.0",
        "strip-ansi": "^7.1.0",
        "wrap-ansi": "^9.0.0"
      },
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/log-update/node_modules/is-fullwidth-code-point": {
      "version": "5.1.0",
      "resolved": "https://registry.npmjs.org/is-fullwidth-code-point/-/is-fullwidth-code-point-5.1.0.tgz",
      "integrity": "sha512-5XHYaSyiqADb4RnZ1Bdad6cPp8Toise4TzEjcOYDHZkTCbKgiUl7WTUCpNWHuxmDt91wnsZBc9xinNzopv3JMQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "get-east-asian-width": "^1.3.1"
      },
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/log-update/node_modules/slice-ansi": {
      "version": "7.1.2",
      "resolved": "https://registry.npmjs.org/slice-ansi/-/slice-ansi-7.1.2.tgz",
      "integrity": "sha512-iOBWFgUX7caIZiuutICxVgX1SdxwAVFFKwt1EvMYYec/NWO5meOJ6K5uQxhrYBdQJne4KxiqZc+KptFOWFSI9w==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ansi-styles": "^6.2.1",
        "is-fullwidth-code-point": "^5.0.0"
      },
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/chalk/slice-ansi?sponsor=1"
      }
    },
    "node_modules/log-update/node_modules/wrap-ansi": {
      "version": "9.0.2",
      "resolved": "https://registry.npmjs.org/wrap-ansi/-/wrap-ansi-9.0.2.tgz",
      "integrity": "sha512-42AtmgqjV+X1VpdOfyTGOYRi0/zsoLqtXQckTmqTeybT+BDIbM/Guxo7x3pE2vtpr1ok6xRqM9OpBe+Jyoqyww==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ansi-styles": "^6.2.1",
        "string-width": "^7.0.0",
        "strip-ansi": "^7.1.0"
      },
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/chalk/wrap-ansi?sponsor=1"
      }
    },
    "node_modules/log4js": {
      "version": "6.9.1",
      "resolved": "https://registry.npmjs.org/log4js/-/log4js-6.9.1.tgz",
      "integrity": "sha512-1somDdy9sChrr9/f4UlzhdaGfDR2c/SaD2a4T7qEkG4jTS57/B3qmnjLYePwQ8cqWnUHZI0iAKxMBpCZICiZ2g==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "date-format": "^4.0.14",
        "debug": "^4.3.4",
        "flatted": "^3.2.7",
        "rfdc": "^1.3.0",
        "streamroller": "^3.1.5"
      },
      "engines": {
        "node": ">=8.0"
      }
    },
    "node_modules/lru-cache": {
      "version": "5.1.1",
      "resolved": "https://registry.npmjs.org/lru-cache/-/lru-cache-5.1.1.tgz",
      "integrity": "sha512-KpNARQA3Iwv+jTA0utUVVbrh+Jlrr1Fv0e56GGzAFOXN7dk/FviaDW8LHmK52DlcH4WP2n6gI8vN1aesBFgo9w==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "yallist": "^3.0.2"
      }
    },
    "node_modules/magic-string": {
      "version": "0.30.17",
      "resolved": "https://registry.npmjs.org/magic-string/-/magic-string-0.30.17.tgz",
      "integrity": "sha512-sNPKHvyjVf7gyjwS4xGTaW/mCnF8wnjtifKBEhxfZ7E/S8tQ0rssrwGNn6q8JH/ohItJfSQp9mBtQYuTlH5QnA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/sourcemap-codec": "^1.5.0"
      }
    },
    "node_modules/make-dir": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/make-dir/-/make-dir-4.0.0.tgz",
      "integrity": "sha512-hXdUTZYIVOt1Ex//jAQi+wTZZpUpwBj/0QsOzqegb3rGMMeJiSEu5xLHnYfBrRV4RH2+OCSOO95Is/7x1WJ4bw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "semver": "^7.5.3"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/make-fetch-happen": {
      "version": "14.0.3",
      "resolved": "https://registry.npmjs.org/make-fetch-happen/-/make-fetch-happen-14.0.3.tgz",
      "integrity": "sha512-QMjGbFTP0blj97EeidG5hk/QhKQ3T4ICckQGLgz38QF7Vgbk6e6FTARN8KhKxyBbWn8R0HU+bnw8aSoFPD4qtQ==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "@npmcli/agent": "^3.0.0",
        "cacache": "^19.0.1",
        "http-cache-semantics": "^4.1.1",
        "minipass": "^7.0.2",
        "minipass-fetch": "^4.0.0",
        "minipass-flush": "^1.0.5",
        "minipass-pipeline": "^1.2.4",
        "negotiator": "^1.0.0",
        "proc-log": "^5.0.0",
        "promise-retry": "^2.0.1",
        "ssri": "^12.0.0"
      },
      "engines": {
        "node": "^18.17.0 || >=20.5.0"
      }
    },
    "node_modules/math-intrinsics": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/math-intrinsics/-/math-intrinsics-1.1.0.tgz",
      "integrity": "sha512-/IXtbwEk5HTPyEwyKX6hGkYXxM9nbj64B+ilVJnC/R6B0pH5G4V3b0pVbL7DBj4tkhBAppbQUlf6F6Xl9LHu1g==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/media-typer": {
      "version": "0.3.0",
      "resolved": "https://registry.npmjs.org/media-typer/-/media-typer-0.3.0.tgz",
      "integrity": "sha512-dq+qelQ9akHpcOl/gUVRTxVIOkAJ1wR3QAvb4RsVjS8oVoFjDGTc679wJYmUmknUF5HwMLOgb5O+a3KxfWapPQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/memfs": {
      "version": "4.49.0",
      "resolved": "https://registry.npmjs.org/memfs/-/memfs-4.49.0.tgz",
      "integrity": "sha512-L9uC9vGuc4xFybbdOpRLoOAOq1YEBBsocCs5NVW32DfU+CZWWIn3OVF+lB8Gp4ttBVSMazwrTrjv8ussX/e3VQ==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@jsonjoy.com/json-pack": "^1.11.0",
        "@jsonjoy.com/util": "^1.9.0",
        "glob-to-regex.js": "^1.0.1",
        "thingies": "^2.5.0",
        "tree-dump": "^1.0.3",
        "tslib": "^2.0.0"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/streamich"
      }
    },
    "node_modules/merge-descriptors": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/merge-descriptors/-/merge-descriptors-1.0.3.tgz",
      "integrity": "sha512-gaNvAS7TZ897/rVaZ0nMtAyxNyi/pdbjbAwUpFQpN70GqnVfOiXpeUUMKRBmzXaSQ8DdTX4/0ms62r2K+hE6mQ==",
      "dev": true,
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/merge-stream": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/merge-stream/-/merge-stream-2.0.0.tgz",
      "integrity": "sha512-abv/qOcuPfk3URPfDzmZU1LKmuw8kT+0nIHvKrKgFrwifol/doWcdA4ZqsWQ8ENrFKkd67Mfpo/LovbIUsbt3w==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/merge2": {
      "version": "1.4.1",
      "resolved": "https://registry.npmjs.org/merge2/-/merge2-1.4.1.tgz",
      "integrity": "sha512-8q7VEgMJW4J8tcfVPy8g09NcQwZdbwFEqhe/WZkoIzjn/3TGDwtOCYtXGxA3O8tPzpczCCDgv+P2P5y00ZJOOg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/methods": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/methods/-/methods-1.1.2.tgz",
      "integrity": "sha512-iclAHeNqNm68zFtnZ0e+1L2yUIdvzNoauKU4WBA3VvH/vPFieF7qfRlwUZU+DA9P9bPXIS90ulxoUoCH23sV2w==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/micromatch": {
      "version": "4.0.8",
      "resolved": "https://registry.npmjs.org/micromatch/-/micromatch-4.0.8.tgz",
      "integrity": "sha512-PXwfBhYu0hBCPw8Dn0E+WDYb7af3dSLVWKi3HGv84IdF4TyFoC0ysxFd0Goxw7nSv4T/PzEJQxsYsEiFCKo2BA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "braces": "^3.0.3",
        "picomatch": "^2.3.1"
      },
      "engines": {
        "node": ">=8.6"
      }
    },
    "node_modules/micromatch/node_modules/picomatch": {
      "version": "2.3.1",
      "resolved": "https://registry.npmjs.org/picomatch/-/picomatch-2.3.1.tgz",
      "integrity": "sha512-JU3teHTNjmE2VCGFzuY8EXzCDVwEqB2a8fsIvwaStHhAWJEeVd1o1QD80CU6+ZdEXXSLbSsuLwJjkCBWqRQUVA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8.6"
      },
      "funding": {
        "url": "https://github.com/sponsors/jonschlinkert"
      }
    },
    "node_modules/mime": {
      "version": "2.6.0",
      "resolved": "https://registry.npmjs.org/mime/-/mime-2.6.0.tgz",
      "integrity": "sha512-USPkMeET31rOMiarsBNIHZKLGgvKc/LrjofAnBlOttf5ajRvqiRA8QsenbcooctK6d6Ts6aqZXBA+XbkKthiQg==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "mime": "cli.js"
      },
      "engines": {
        "node": ">=4.0.0"
      }
    },
    "node_modules/mime-db": {
      "version": "1.54.0",
      "resolved": "https://registry.npmjs.org/mime-db/-/mime-db-1.54.0.tgz",
      "integrity": "sha512-aU5EJuIN2WDemCcAp2vFBfp/m4EAhWJnUNSSw0ixs7/kXbd6Pg64EmwJkNdFhB8aWt1sH2CTXrLxo/iAGV3oPQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/mime-types": {
      "version": "2.1.35",
      "resolved": "https://registry.npmjs.org/mime-types/-/mime-types-2.1.35.tgz",
      "integrity": "sha512-ZDY+bPm5zTTF+YpCrAU9nK0UgICYPT0QtT1NZWFv4s++TNkcgVaT0g6+4R2uI4MjQjzysHB1zxuWL50hzaeXiw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "mime-db": "1.52.0"
      },
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/mime-types/node_modules/mime-db": {
      "version": "1.52.0",
      "resolved": "https://registry.npmjs.org/mime-db/-/mime-db-1.52.0.tgz",
      "integrity": "sha512-sPU4uV7dYlvtWJxwwxHD0PuihVNiE7TyAbQ5SWxDCB9mUYvOgroQOwYQQOKPJ8CIbE+1ETVlOoK1UC2nU3gYvg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/mimic-function": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/mimic-function/-/mimic-function-5.0.1.tgz",
      "integrity": "sha512-VP79XUPxV2CigYP3jWwAUFSku2aKqBH7uTAapFWCBqutsbmDo96KY5o8uh6U+/YSIn5OxJnXp73beVkpqMIGhA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/mini-css-extract-plugin": {
      "version": "2.9.4",
      "resolved": "https://registry.npmjs.org/mini-css-extract-plugin/-/mini-css-extract-plugin-2.9.4.tgz",
      "integrity": "sha512-ZWYT7ln73Hptxqxk2DxPU9MmapXRhxkJD6tkSR04dnQxm8BGu2hzgKLugK5yySD97u/8yy7Ma7E76k9ZdvtjkQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "schema-utils": "^4.0.0",
        "tapable": "^2.2.1"
      },
      "engines": {
        "node": ">= 12.13.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/webpack"
      },
      "peerDependencies": {
        "webpack": "^5.0.0"
      }
    },
    "node_modules/minimalistic-assert": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/minimalistic-assert/-/minimalistic-assert-1.0.1.tgz",
      "integrity": "sha512-UtJcAD4yEaGtjPezWuO9wC4nwUnVH/8/Im3yEHQP4b67cXlD/Qr9hdITCU1xDbSEXg2XKNaP8jsReV7vQd00/A==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/minimatch": {
      "version": "3.1.2",
      "resolved": "https://registry.npmjs.org/minimatch/-/minimatch-3.1.2.tgz",
      "integrity": "sha512-J7p63hRiAjw1NDEww1W7i37+ByIrOWO5XQQAzZ3VOcL0PNybwpfmV/N05zFAzwQ9USyEcX6t3UO+K5aqBQOIHw==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "brace-expansion": "^1.1.7"
      },
      "engines": {
        "node": "*"
      }
    },
    "node_modules/minimist": {
      "version": "1.2.8",
      "resolved": "https://registry.npmjs.org/minimist/-/minimist-1.2.8.tgz",
      "integrity": "sha512-2yyAR8qBkN3YuheJanUpWC5U3bb5osDywNB8RzDVlDwDHbocAJveqqj1u8+SVD7jkWT4yvsHCpWqqWqAxb0zCA==",
      "dev": true,
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/minipass": {
      "version": "7.1.2",
      "resolved": "https://registry.npmjs.org/minipass/-/minipass-7.1.2.tgz",
      "integrity": "sha512-qOOzS1cBTWYF4BH8fVePDBOO9iptMnGUEZwNc/cMWnTV2nVLZ7VoNWEPHkYczZA0pdoA7dl6e7FL659nX9S2aw==",
      "dev": true,
      "license": "ISC",
      "engines": {
        "node": ">=16 || 14 >=14.17"
      }
    },
    "node_modules/minipass-collect": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/minipass-collect/-/minipass-collect-2.0.1.tgz",
      "integrity": "sha512-D7V8PO9oaz7PWGLbCACuI1qEOsq7UKfLotx/C0Aet43fCUB/wfQ7DYeq2oR/svFJGYDHPr38SHATeaj/ZoKHKw==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "minipass": "^7.0.3"
      },
      "engines": {
        "node": ">=16 || 14 >=14.17"
      }
    },
    "node_modules/minipass-fetch": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/minipass-fetch/-/minipass-fetch-4.0.1.tgz",
      "integrity": "sha512-j7U11C5HXigVuutxebFadoYBbd7VSdZWggSe64NVdvWNBqGAiXPL2QVCehjmw7lY1oF9gOllYbORh+hiNgfPgQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "minipass": "^7.0.3",
        "minipass-sized": "^1.0.3",
        "minizlib": "^3.0.1"
      },
      "engines": {
        "node": "^18.17.0 || >=20.5.0"
      },
      "optionalDependencies": {
        "encoding": "^0.1.13"
      }
    },
    "node_modules/minipass-flush": {
      "version": "1.0.5",
      "resolved": "https://registry.npmjs.org/minipass-flush/-/minipass-flush-1.0.5.tgz",
      "integrity": "sha512-JmQSYYpPUqX5Jyn1mXaRwOda1uQ8HP5KAT/oDSLCzt1BYRhQU0/hDtsB1ufZfEEzMZ9aAVmsBw8+FWsIXlClWw==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "minipass": "^3.0.0"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/minipass-flush/node_modules/minipass": {
      "version": "3.3.6",
      "resolved": "https://registry.npmjs.org/minipass/-/minipass-3.3.6.tgz",
      "integrity": "sha512-DxiNidxSEK+tHG6zOIklvNOwm3hvCrbUrdtzY74U6HKTJxvIDfOUL5W5P2Ghd3DTkhhKPYGqeNUIh5qcM4YBfw==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "yallist": "^4.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/minipass-flush/node_modules/yallist": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/yallist/-/yallist-4.0.0.tgz",
      "integrity": "sha512-3wdGidZyq5PB084XLES5TpOSRA3wjXAlIWMhum2kRcv/41Sn2emQ0dycQW4uZXLejwKvg6EsvbdlVL+FYEct7A==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/minipass-pipeline": {
      "version": "1.2.4",
      "resolved": "https://registry.npmjs.org/minipass-pipeline/-/minipass-pipeline-1.2.4.tgz",
      "integrity": "sha512-xuIq7cIOt09RPRJ19gdi4b+RiNvDFYe5JH+ggNvBqGqpQXcru3PcRmOZuHBKWK1Txf9+cQ+HMVN4d6z46LZP7A==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "minipass": "^3.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/minipass-pipeline/node_modules/minipass": {
      "version": "3.3.6",
      "resolved": "https://registry.npmjs.org/minipass/-/minipass-3.3.6.tgz",
      "integrity": "sha512-DxiNidxSEK+tHG6zOIklvNOwm3hvCrbUrdtzY74U6HKTJxvIDfOUL5W5P2Ghd3DTkhhKPYGqeNUIh5qcM4YBfw==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "yallist": "^4.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/minipass-pipeline/node_modules/yallist": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/yallist/-/yallist-4.0.0.tgz",
      "integrity": "sha512-3wdGidZyq5PB084XLES5TpOSRA3wjXAlIWMhum2kRcv/41Sn2emQ0dycQW4uZXLejwKvg6EsvbdlVL+FYEct7A==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/minipass-sized": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/minipass-sized/-/minipass-sized-1.0.3.tgz",
      "integrity": "sha512-MbkQQ2CTiBMlA2Dm/5cY+9SWFEN8pzzOXi6rlM5Xxq0Yqbda5ZQy9sU75a673FE9ZK0Zsbr6Y5iP6u9nktfg2g==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "minipass": "^3.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/minipass-sized/node_modules/minipass": {
      "version": "3.3.6",
      "resolved": "https://registry.npmjs.org/minipass/-/minipass-3.3.6.tgz",
      "integrity": "sha512-DxiNidxSEK+tHG6zOIklvNOwm3hvCrbUrdtzY74U6HKTJxvIDfOUL5W5P2Ghd3DTkhhKPYGqeNUIh5qcM4YBfw==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "yallist": "^4.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/minipass-sized/node_modules/yallist": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/yallist/-/yallist-4.0.0.tgz",
      "integrity": "sha512-3wdGidZyq5PB084XLES5TpOSRA3wjXAlIWMhum2kRcv/41Sn2emQ0dycQW4uZXLejwKvg6EsvbdlVL+FYEct7A==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/minizlib": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/minizlib/-/minizlib-3.1.0.tgz",
      "integrity": "sha512-KZxYo1BUkWD2TVFLr0MQoM8vUUigWD3LlD83a/75BqC+4qE0Hb1Vo5v1FgcfaNXvfXzr+5EhQ6ing/CaBijTlw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "minipass": "^7.1.2"
      },
      "engines": {
        "node": ">= 18"
      }
    },
    "node_modules/mkdirp": {
      "version": "0.5.6",
      "resolved": "https://registry.npmjs.org/mkdirp/-/mkdirp-0.5.6.tgz",
      "integrity": "sha512-FP+p8RB8OWpF3YZBCrP5gtADmtXApB5AMLn+vdyA+PyxCjrCs00mjyUozssO33cwDeT3wNGdLxJ5M//YqtHAJw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "minimist": "^1.2.6"
      },
      "bin": {
        "mkdirp": "bin/cmd.js"
      }
    },
    "node_modules/mrmime": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/mrmime/-/mrmime-2.0.1.tgz",
      "integrity": "sha512-Y3wQdFg2Va6etvQ5I82yUhGdsKrcYox6p7FfL1LbK2J4V01F9TGlepTIhnK24t7koZibmg82KGglhA1XK5IsLQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/ms": {
      "version": "2.1.3",
      "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.3.tgz",
      "integrity": "sha512-6FlzubTLZG3J2a/NVCAleEhjzq5oxgHyaCU9yYXvcLsvoVaHJq/s5xXI6/XXP6tz7R9xAOtHnSO/tXtF3WRTlA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/msgpackr": {
      "version": "1.11.5",
      "resolved": "https://registry.npmjs.org/msgpackr/-/msgpackr-1.11.5.tgz",
      "integrity": "sha512-UjkUHN0yqp9RWKy0Lplhh+wlpdt9oQBYgULZOiFhV3VclSF1JnSQWZ5r9gORQlNYaUKQoR8itv7g7z1xDDuACA==",
      "dev": true,
      "license": "MIT",
      "optional": true,
      "optionalDependencies": {
        "msgpackr-extract": "^3.0.2"
      }
    },
    "node_modules/msgpackr-extract": {
      "version": "3.0.3",
      "resolved": "https://registry.npmjs.org/msgpackr-extract/-/msgpackr-extract-3.0.3.tgz",
      "integrity": "sha512-P0efT1C9jIdVRefqjzOQ9Xml57zpOXnIuS+csaB4MdZbTdmGDLo8XhzBG1N7aO11gKDDkJvBLULeFTo46wwreA==",
      "dev": true,
      "hasInstallScript": true,
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "node-gyp-build-optional-packages": "5.2.2"
      },
      "bin": {
        "download-msgpackr-prebuilds": "bin/download-prebuilds.js"
      },
      "optionalDependencies": {
        "@msgpackr-extract/msgpackr-extract-darwin-arm64": "3.0.3",
        "@msgpackr-extract/msgpackr-extract-darwin-x64": "3.0.3",
        "@msgpackr-extract/msgpackr-extract-linux-arm": "3.0.3",
        "@msgpackr-extract/msgpackr-extract-linux-arm64": "3.0.3",
        "@msgpackr-extract/msgpackr-extract-linux-x64": "3.0.3",
        "@msgpackr-extract/msgpackr-extract-win32-x64": "3.0.3"
      }
    },
    "node_modules/multicast-dns": {
      "version": "7.2.5",
      "resolved": "https://registry.npmjs.org/multicast-dns/-/multicast-dns-7.2.5.tgz",
      "integrity": "sha512-2eznPJP8z2BFLX50tf0LuODrpINqP1RVIm/CObbTcBRITQgmC/TjcREF1NeTBzIcR5XO/ukWo+YHOjBbFwIupg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "dns-packet": "^5.2.2",
        "thunky": "^1.0.2"
      },
      "bin": {
        "multicast-dns": "cli.js"
      }
    },
    "node_modules/mute-stream": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/mute-stream/-/mute-stream-2.0.0.tgz",
      "integrity": "sha512-WWdIxpyjEn+FhQJQQv9aQAYlHoNVdzIzUySNV1gHUPDSdZJ3yZn7pAAbQcV7B56Mvu881q9FZV+0Vx2xC44VWA==",
      "dev": true,
      "license": "ISC",
      "engines": {
        "node": "^18.17.0 || >=20.5.0"
      }
    },
    "node_modules/nanoid": {
      "version": "3.3.11",
      "resolved": "https://registry.npmjs.org/nanoid/-/nanoid-3.3.11.tgz",
      "integrity": "sha512-N8SpfPUnUp1bK+PMYW8qSWdl9U+wwNWI4QKxOYDy9JAro3WMX7p2OeVRF9v+347pnakNevPmiHhNmZ2HbFA76w==",
      "dev": true,
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "bin": {
        "nanoid": "bin/nanoid.cjs"
      },
      "engines": {
        "node": "^10 || ^12 || ^13.7 || ^14 || >=15.0.1"
      }
    },
    "node_modules/needle": {
      "version": "3.3.1",
      "resolved": "https://registry.npmjs.org/needle/-/needle-3.3.1.tgz",
      "integrity": "sha512-6k0YULvhpw+RoLNiQCRKOl09Rv1dPLr8hHnVjHqdolKwDrdNyk+Hmrthi4lIGPPz3r39dLx0hsF5s40sZ3Us4Q==",
      "dev": true,
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "iconv-lite": "^0.6.3",
        "sax": "^1.2.4"
      },
      "bin": {
        "needle": "bin/needle"
      },
      "engines": {
        "node": ">= 4.4.x"
      }
    },
    "node_modules/needle/node_modules/iconv-lite": {
      "version": "0.6.3",
      "resolved": "https://registry.npmjs.org/iconv-lite/-/iconv-lite-0.6.3.tgz",
      "integrity": "sha512-4fCk79wshMdzMp2rH06qWrJE4iolqLhCUH+OiuIgU++RB0+94NlDL81atO7GX55uUKueo0txHNtvEyI6D7WdMw==",
      "dev": true,
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "safer-buffer": ">= 2.1.2 < 3.0.0"
      },
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/negotiator": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/negotiator/-/negotiator-1.0.0.tgz",
      "integrity": "sha512-8Ofs/AUQh8MaEcrlq5xOX0CQ9ypTF5dl78mjlMNfOK08fzpgTHQRQPBxcPlEtIw0yRpws+Zo/3r+5WRby7u3Gg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/neo-async": {
      "version": "2.6.2",
      "resolved": "https://registry.npmjs.org/neo-async/-/neo-async-2.6.2.tgz",
      "integrity": "sha512-Yd3UES5mWCSqR+qNT93S3UoYUkqAZ9lLg8a7g9rimsWmYGK8cVToA4/sF3RrshdyV3sAGMXVUmpMYOw+dLpOuw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/node-addon-api": {
      "version": "6.1.0",
      "resolved": "https://registry.npmjs.org/node-addon-api/-/node-addon-api-6.1.0.tgz",
      "integrity": "sha512-+eawOlIgy680F0kBzPUNFhMZGtJ1YmqM6l4+Crf4IkImjYrO/mqPwRMh352g23uIaQKFItcQ64I7KMaJxHgAVA==",
      "dev": true,
      "license": "MIT",
      "optional": true
    },
    "node_modules/node-forge": {
      "version": "1.3.1",
      "resolved": "https://registry.npmjs.org/node-forge/-/node-forge-1.3.1.tgz",
      "integrity": "sha512-dPEtOeMvF9VMcYV/1Wb8CPoVAXtp6MKMlcbAt4ddqmGqUJ6fQZFXkNZNkNlfevtNkGtaSoXf/vNNNSvgrdXwtA==",
      "dev": true,
      "license": "(BSD-3-Clause OR GPL-2.0)",
      "engines": {
        "node": ">= 6.13.0"
      }
    },
    "node_modules/node-gyp": {
      "version": "11.5.0",
      "resolved": "https://registry.npmjs.org/node-gyp/-/node-gyp-11.5.0.tgz",
      "integrity": "sha512-ra7Kvlhxn5V9Slyus0ygMa2h+UqExPqUIkfk7Pc8QTLT956JLSy51uWFwHtIYy0vI8cB4BDhc/S03+880My/LQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "env-paths": "^2.2.0",
        "exponential-backoff": "^3.1.1",
        "graceful-fs": "^4.2.6",
        "make-fetch-happen": "^14.0.3",
        "nopt": "^8.0.0",
        "proc-log": "^5.0.0",
        "semver": "^7.3.5",
        "tar": "^7.4.3",
        "tinyglobby": "^0.2.12",
        "which": "^5.0.0"
      },
      "bin": {
        "node-gyp": "bin/node-gyp.js"
      },
      "engines": {
        "node": "^18.17.0 || >=20.5.0"
      }
    },
    "node_modules/node-gyp-build-optional-packages": {
      "version": "5.2.2",
      "resolved": "https://registry.npmjs.org/node-gyp-build-optional-packages/-/node-gyp-build-optional-packages-5.2.2.tgz",
      "integrity": "sha512-s+w+rBWnpTMwSFbaE0UXsRlg7hU4FjekKU4eyAih5T8nJuNZT1nNsskXpxmeqSK9UzkBl6UgRlnKc8hz8IEqOw==",
      "dev": true,
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "detect-libc": "^2.0.1"
      },
      "bin": {
        "node-gyp-build-optional-packages": "bin.js",
        "node-gyp-build-optional-packages-optional": "optional.js",
        "node-gyp-build-optional-packages-test": "build-test.js"
      }
    },
    "node_modules/node-gyp/node_modules/chownr": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/chownr/-/chownr-3.0.0.tgz",
      "integrity": "sha512-+IxzY9BZOQd/XuYPRmrvEVjF/nqj5kgT4kEq7VofrDoM1MxoRjEWkrCC3EtLi59TVawxTAn+orJwFQcrqEN1+g==",
      "dev": true,
      "license": "BlueOak-1.0.0",
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/node-gyp/node_modules/isexe": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/isexe/-/isexe-3.1.1.tgz",
      "integrity": "sha512-LpB/54B+/2J5hqQ7imZHfdU31OlgQqx7ZicVlkm9kzg9/w8GKLEcFfJl/t7DCEDueOyBAD6zCCwTO6Fzs0NoEQ==",
      "dev": true,
      "license": "ISC",
      "engines": {
        "node": ">=16"
      }
    },
    "node_modules/node-gyp/node_modules/tar": {
      "version": "7.5.1",
      "resolved": "https://registry.npmjs.org/tar/-/tar-7.5.1.tgz",
      "integrity": "sha512-nlGpxf+hv0v7GkWBK2V9spgactGOp0qvfWRxUMjqHyzrt3SgwE48DIv/FhqPHJYLHpgW1opq3nERbz5Anq7n1g==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "@isaacs/fs-minipass": "^4.0.0",
        "chownr": "^3.0.0",
        "minipass": "^7.1.2",
        "minizlib": "^3.1.0",
        "yallist": "^5.0.0"
      },
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/node-gyp/node_modules/which": {
      "version": "5.0.0",
      "resolved": "https://registry.npmjs.org/which/-/which-5.0.0.tgz",
      "integrity": "sha512-JEdGzHwwkrbWoGOlIHqQ5gtprKGOenpDHpxE9zVR1bWbOtYRyPPHMe9FaP6x61CmNaTThSkb0DAJte5jD+DmzQ==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "isexe": "^3.1.1"
      },
      "bin": {
        "node-which": "bin/which.js"
      },
      "engines": {
        "node": "^18.17.0 || >=20.5.0"
      }
    },
    "node_modules/node-gyp/node_modules/yallist": {
      "version": "5.0.0",
      "resolved": "https://registry.npmjs.org/yallist/-/yallist-5.0.0.tgz",
      "integrity": "sha512-YgvUTfwqyc7UXVMrB+SImsVYSmTS8X/tSrtdNZMImM+n7+QTriRXyXim0mBrTXNeqzVF0KWGgHPeiyViFFrNDw==",
      "dev": true,
      "license": "BlueOak-1.0.0",
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/node-releases": {
      "version": "2.0.26",
      "resolved": "https://registry.npmjs.org/node-releases/-/node-releases-2.0.26.tgz",
      "integrity": "sha512-S2M9YimhSjBSvYnlr5/+umAnPHE++ODwt5e2Ij6FoX45HA/s4vHdkDx1eax2pAPeAOqu4s9b7ppahsyEFdVqQA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/nopt": {
      "version": "8.1.0",
      "resolved": "https://registry.npmjs.org/nopt/-/nopt-8.1.0.tgz",
      "integrity": "sha512-ieGu42u/Qsa4TFktmaKEwM6MQH0pOWnaB3htzh0JRtx84+Mebc0cbZYN5bC+6WTZ4+77xrL9Pn5m7CV6VIkV7A==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "abbrev": "^3.0.0"
      },
      "bin": {
        "nopt": "bin/nopt.js"
      },
      "engines": {
        "node": "^18.17.0 || >=20.5.0"
      }
    },
    "node_modules/normalize-path": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/normalize-path/-/normalize-path-3.0.0.tgz",
      "integrity": "sha512-6eZs5Ls3WtCisHWp9S2GUy8dqkpGi4BVSz3GaqiE6ezub0512ESztXUwUB6C6IKbQkY2Pnb/mD4WYojCRwcwLA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/normalize-range": {
      "version": "0.1.2",
      "resolved": "https://registry.npmjs.org/normalize-range/-/normalize-range-0.1.2.tgz",
      "integrity": "sha512-bdok/XvKII3nUpklnV6P2hxtMNrCboOjAcyBuQnWEhO665FwrSNRxU+AqpsyvO6LgGYPspN+lu5CLtw4jPRKNA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/npm-bundled": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/npm-bundled/-/npm-bundled-4.0.0.tgz",
      "integrity": "sha512-IxaQZDMsqfQ2Lz37VvyyEtKLe8FsRZuysmedy/N06TU1RyVppYKXrO4xIhR0F+7ubIBox6Q7nir6fQI3ej39iA==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "npm-normalize-package-bin": "^4.0.0"
      },
      "engines": {
        "node": "^18.17.0 || >=20.5.0"
      }
    },
    "node_modules/npm-install-checks": {
      "version": "7.1.2",
      "resolved": "https://registry.npmjs.org/npm-install-checks/-/npm-install-checks-7.1.2.tgz",
      "integrity": "sha512-z9HJBCYw9Zr8BqXcllKIs5nI+QggAImbBdHphOzVYrz2CB4iQ6FzWyKmlqDZua+51nAu7FcemlbTc9VgQN5XDQ==",
      "dev": true,
      "license": "BSD-2-Clause",
      "dependencies": {
        "semver": "^7.1.1"
      },
      "engines": {
        "node": "^18.17.0 || >=20.5.0"
      }
    },
    "node_modules/npm-normalize-package-bin": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/npm-normalize-package-bin/-/npm-normalize-package-bin-4.0.0.tgz",
      "integrity": "sha512-TZKxPvItzai9kN9H/TkmCtx/ZN/hvr3vUycjlfmH0ootY9yFBzNOpiXAdIn1Iteqsvk4lQn6B5PTrt+n6h8k/w==",
      "dev": true,
      "license": "ISC",
      "engines": {
        "node": "^18.17.0 || >=20.5.0"
      }
    },
    "node_modules/npm-package-arg": {
      "version": "13.0.0",
      "resolved": "https://registry.npmjs.org/npm-package-arg/-/npm-package-arg-13.0.0.tgz",
      "integrity": "sha512-+t2etZAGcB7TbbLHfDwooV9ppB2LhhcT6A+L9cahsf9mEUAoQ6CktLEVvEnpD0N5CkX7zJqnPGaFtoQDy9EkHQ==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "hosted-git-info": "^9.0.0",
        "proc-log": "^5.0.0",
        "semver": "^7.3.5",
        "validate-npm-package-name": "^6.0.0"
      },
      "engines": {
        "node": "^20.17.0 || >=22.9.0"
      }
    },
    "node_modules/npm-packlist": {
      "version": "10.0.2",
      "resolved": "https://registry.npmjs.org/npm-packlist/-/npm-packlist-10.0.2.tgz",
      "integrity": "sha512-DrIWNiWT0FTdDRjGOYfEEZUNe1IzaSZ+up7qBTKnrQDySpdmuOQvytrqQlpK5QrCA4IThMvL4wTumqaa1ZvVIQ==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "ignore-walk": "^8.0.0",
        "proc-log": "^5.0.0"
      },
      "engines": {
        "node": "^20.17.0 || >=22.9.0"
      }
    },
    "node_modules/npm-pick-manifest": {
      "version": "10.0.0",
      "resolved": "https://registry.npmjs.org/npm-pick-manifest/-/npm-pick-manifest-10.0.0.tgz",
      "integrity": "sha512-r4fFa4FqYY8xaM7fHecQ9Z2nE9hgNfJR+EmoKv0+chvzWkBcORX3r0FpTByP+CbOVJDladMXnPQGVN8PBLGuTQ==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "npm-install-checks": "^7.1.0",
        "npm-normalize-package-bin": "^4.0.0",
        "npm-package-arg": "^12.0.0",
        "semver": "^7.3.5"
      },
      "engines": {
        "node": "^18.17.0 || >=20.5.0"
      }
    },
    "node_modules/npm-pick-manifest/node_modules/hosted-git-info": {
      "version": "8.1.0",
      "resolved": "https://registry.npmjs.org/hosted-git-info/-/hosted-git-info-8.1.0.tgz",
      "integrity": "sha512-Rw/B2DNQaPBICNXEm8balFz9a6WpZrkCGpcWFpy7nCj+NyhSdqXipmfvtmWt9xGfp0wZnBxB+iVpLmQMYt47Tw==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "lru-cache": "^10.0.1"
      },
      "engines": {
        "node": "^18.17.0 || >=20.5.0"
      }
    },
    "node_modules/npm-pick-manifest/node_modules/lru-cache": {
      "version": "10.4.3",
      "resolved": "https://registry.npmjs.org/lru-cache/-/lru-cache-10.4.3.tgz",
      "integrity": "sha512-JNAzZcXrCt42VGLuYz0zfAzDfAvJWW6AfYlDBQyDV5DClI2m5sAmK+OIO7s59XfsRsWHp02jAJrRadPRGTt6SQ==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/npm-pick-manifest/node_modules/npm-package-arg": {
      "version": "12.0.2",
      "resolved": "https://registry.npmjs.org/npm-package-arg/-/npm-package-arg-12.0.2.tgz",
      "integrity": "sha512-f1NpFjNI9O4VbKMOlA5QoBq/vSQPORHcTZ2feJpFkTHJ9eQkdlmZEKSjcAhxTGInC7RlEyScT9ui67NaOsjFWA==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "hosted-git-info": "^8.0.0",
        "proc-log": "^5.0.0",
        "semver": "^7.3.5",
        "validate-npm-package-name": "^6.0.0"
      },
      "engines": {
        "node": "^18.17.0 || >=20.5.0"
      }
    },
    "node_modules/npm-registry-fetch": {
      "version": "18.0.2",
      "resolved": "https://registry.npmjs.org/npm-registry-fetch/-/npm-registry-fetch-18.0.2.tgz",
      "integrity": "sha512-LeVMZBBVy+oQb5R6FDV9OlJCcWDU+al10oKpe+nsvcHnG24Z3uM3SvJYKfGJlfGjVU8v9liejCrUR/M5HO5NEQ==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "@npmcli/redact": "^3.0.0",
        "jsonparse": "^1.3.1",
        "make-fetch-happen": "^14.0.0",
        "minipass": "^7.0.2",
        "minipass-fetch": "^4.0.0",
        "minizlib": "^3.0.1",
        "npm-package-arg": "^12.0.0",
        "proc-log": "^5.0.0"
      },
      "engines": {
        "node": "^18.17.0 || >=20.5.0"
      }
    },
    "node_modules/npm-registry-fetch/node_modules/hosted-git-info": {
      "version": "8.1.0",
      "resolved": "https://registry.npmjs.org/hosted-git-info/-/hosted-git-info-8.1.0.tgz",
      "integrity": "sha512-Rw/B2DNQaPBICNXEm8balFz9a6WpZrkCGpcWFpy7nCj+NyhSdqXipmfvtmWt9xGfp0wZnBxB+iVpLmQMYt47Tw==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "lru-cache": "^10.0.1"
      },
      "engines": {
        "node": "^18.17.0 || >=20.5.0"
      }
    },
    "node_modules/npm-registry-fetch/node_modules/lru-cache": {
      "version": "10.4.3",
      "resolved": "https://registry.npmjs.org/lru-cache/-/lru-cache-10.4.3.tgz",
      "integrity": "sha512-JNAzZcXrCt42VGLuYz0zfAzDfAvJWW6AfYlDBQyDV5DClI2m5sAmK+OIO7s59XfsRsWHp02jAJrRadPRGTt6SQ==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/npm-registry-fetch/node_modules/npm-package-arg": {
      "version": "12.0.2",
      "resolved": "https://registry.npmjs.org/npm-package-arg/-/npm-package-arg-12.0.2.tgz",
      "integrity": "sha512-f1NpFjNI9O4VbKMOlA5QoBq/vSQPORHcTZ2feJpFkTHJ9eQkdlmZEKSjcAhxTGInC7RlEyScT9ui67NaOsjFWA==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "hosted-git-info": "^8.0.0",
        "proc-log": "^5.0.0",
        "semver": "^7.3.5",
        "validate-npm-package-name": "^6.0.0"
      },
      "engines": {
        "node": "^18.17.0 || >=20.5.0"
      }
    },
    "node_modules/nth-check": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/nth-check/-/nth-check-2.1.1.tgz",
      "integrity": "sha512-lqjrjmaOoAnWfMmBPL+XNnynZh2+swxiX3WUE0s4yEHI6m+AwrK2UZOimIRl3X/4QctVqS8AiZjFqyOGrMXb/w==",
      "dev": true,
      "license": "BSD-2-Clause",
      "dependencies": {
        "boolbase": "^1.0.0"
      },
      "funding": {
        "url": "https://github.com/fb55/nth-check?sponsor=1"
      }
    },
    "node_modules/object-assign": {
      "version": "4.1.1",
      "resolved": "https://registry.npmjs.org/object-assign/-/object-assign-4.1.1.tgz",
      "integrity": "sha512-rJgTQnkUnH1sFw8yT6VSU3zD3sWmu6sZhIseY8VX+GRu3P6F7Fu+JNDoXfklElbLJSnc3FUQHVe4cU5hj+BcUg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/object-inspect": {
      "version": "1.13.4",
      "resolved": "https://registry.npmjs.org/object-inspect/-/object-inspect-1.13.4.tgz",
      "integrity": "sha512-W67iLl4J2EXEGTbfeHCffrjDfitvLANg0UlX3wFUUSTx92KXRFegMHUVgSqE+wvhAbi4WqjGg9czysTV2Epbew==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/obuf": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/obuf/-/obuf-1.1.2.tgz",
      "integrity": "sha512-PX1wu0AmAdPqOL1mWhqmlOd8kOIZQwGZw6rh7uby9fTc5lhaOWFLX3I6R1hrF9k3zUY40e6igsLGkDXK92LJNg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/on-finished": {
      "version": "2.4.1",
      "resolved": "https://registry.npmjs.org/on-finished/-/on-finished-2.4.1.tgz",
      "integrity": "sha512-oVlzkg3ENAhCk2zdv7IJwd/QUD4z2RxRwpkcGY8psCVcCYZNq4wYnVWALHM+brtuJjePWiYF/ClmuDr8Ch5+kg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ee-first": "1.1.1"
      },
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/on-headers": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/on-headers/-/on-headers-1.1.0.tgz",
      "integrity": "sha512-737ZY3yNnXy37FHkQxPzt4UZ2UWPWiCZWLvFZ4fu5cueciegX0zGPnrlY6bwRg4FdQOe9YU8MkmJwGhoMybl8A==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/once": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/once/-/once-1.4.0.tgz",
      "integrity": "sha512-lNaJgI+2Q5URQBkccEKHTQOPaXdUxnZZElQTZY0MFUAuaEqe1E+Nyvgdz/aIyNi6Z9MzO5dv1H8n58/GELp3+w==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "wrappy": "1"
      }
    },
    "node_modules/onetime": {
      "version": "7.0.0",
      "resolved": "https://registry.npmjs.org/onetime/-/onetime-7.0.0.tgz",
      "integrity": "sha512-VXJjc87FScF88uafS3JllDgvAm+c/Slfz06lorj2uAY34rlUu0Nt+v8wreiImcrgAjjIHp1rXpTDlLOGw29WwQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "mimic-function": "^5.0.0"
      },
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/open": {
      "version": "10.2.0",
      "resolved": "https://registry.npmjs.org/open/-/open-10.2.0.tgz",
      "integrity": "sha512-YgBpdJHPyQ2UE5x+hlSXcnejzAvD0b22U2OuAP+8OnlJT+PjWPxtgmGqKKc+RgTM63U9gN0YzrYc71R2WT/hTA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "default-browser": "^5.2.1",
        "define-lazy-prop": "^3.0.0",
        "is-inside-container": "^1.0.0",
        "wsl-utils": "^0.1.0"
      },
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/ora": {
      "version": "8.2.0",
      "resolved": "https://registry.npmjs.org/ora/-/ora-8.2.0.tgz",
      "integrity": "sha512-weP+BZ8MVNnlCm8c0Qdc1WSWq4Qn7I+9CJGm7Qali6g44e/PUzbjNqJX5NJ9ljlNMosfJvg1fKEGILklK9cwnw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "chalk": "^5.3.0",
        "cli-cursor": "^5.0.0",
        "cli-spinners": "^2.9.2",
        "is-interactive": "^2.0.0",
        "is-unicode-supported": "^2.0.0",
        "log-symbols": "^6.0.0",
        "stdin-discarder": "^0.2.2",
        "string-width": "^7.2.0",
        "strip-ansi": "^7.1.0"
      },
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/ordered-binary": {
      "version": "1.6.0",
      "resolved": "https://registry.npmjs.org/ordered-binary/-/ordered-binary-1.6.0.tgz",
      "integrity": "sha512-IQh2aMfMIDbPjI/8a3Edr+PiOpcsB7yo8NdW7aHWVaoR/pcDldunMvnnwbk/auPGqmKeAdxtZl7MHX/QmPwhvQ==",
      "dev": true,
      "license": "MIT",
      "optional": true
    },
    "node_modules/p-limit": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/p-limit/-/p-limit-3.1.0.tgz",
      "integrity": "sha512-TYOanM3wGwNGsZN2cVTYPArw454xnXj5qmWF1bEoAc4+cU/ol7GVh7odevjp1FNHduHc3KZMcFduxU5Xc6uJRQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "yocto-queue": "^0.1.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/p-locate": {
      "version": "5.0.0",
      "resolved": "https://registry.npmjs.org/p-locate/-/p-locate-5.0.0.tgz",
      "integrity": "sha512-LaNjtRWUBY++zB5nE/NwcaoMylSPk+S+ZHNB1TzdbMJMny6dynpAGt7X/tl/QYq3TIeE6nxHppbo2LGymrG5Pw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "p-limit": "^3.0.2"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/p-map": {
      "version": "7.0.3",
      "resolved": "https://registry.npmjs.org/p-map/-/p-map-7.0.3.tgz",
      "integrity": "sha512-VkndIv2fIB99swvQoA65bm+fsmt6UNdGeIB0oxBs+WhAhdh08QA04JXpI7rbB9r08/nkbysKoya9rtDERYOYMA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/p-retry": {
      "version": "6.2.1",
      "resolved": "https://registry.npmjs.org/p-retry/-/p-retry-6.2.1.tgz",
      "integrity": "sha512-hEt02O4hUct5wtwg4H4KcWgDdm+l1bOaEy/hWzd8xtXB9BqxTWBBhb+2ImAtH4Cv4rPjV76xN3Zumqk3k3AhhQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/retry": "0.12.2",
        "is-network-error": "^1.0.0",
        "retry": "^0.13.1"
      },
      "engines": {
        "node": ">=16.17"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/p-retry/node_modules/retry": {
      "version": "0.13.1",
      "resolved": "https://registry.npmjs.org/retry/-/retry-0.13.1.tgz",
      "integrity": "sha512-XQBQ3I8W1Cge0Seh+6gjj03LbmRFWuoszgK9ooCpwYIrhhoO80pfq4cUkU5DkknwfOfFteRwlZ56PYOGYyFWdg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 4"
      }
    },
    "node_modules/package-json-from-dist": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/package-json-from-dist/-/package-json-from-dist-1.0.1.tgz",
      "integrity": "sha512-UEZIS3/by4OC8vL3P2dTXRETpebLI2NiI5vIrjaD/5UtrkFX/tNbwjTSRAGC/+7CAo2pIcBaRgWmcBBHcsaCIw==",
      "dev": true,
      "license": "BlueOak-1.0.0"
    },
    "node_modules/pacote": {
      "version": "21.0.0",
      "resolved": "https://registry.npmjs.org/pacote/-/pacote-21.0.0.tgz",
      "integrity": "sha512-lcqexq73AMv6QNLo7SOpz0JJoaGdS3rBFgF122NZVl1bApo2mfu+XzUBU/X/XsiJu+iUmKpekRayqQYAs+PhkA==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "@npmcli/git": "^6.0.0",
        "@npmcli/installed-package-contents": "^3.0.0",
        "@npmcli/package-json": "^6.0.0",
        "@npmcli/promise-spawn": "^8.0.0",
        "@npmcli/run-script": "^9.0.0",
        "cacache": "^19.0.0",
        "fs-minipass": "^3.0.0",
        "minipass": "^7.0.2",
        "npm-package-arg": "^12.0.0",
        "npm-packlist": "^10.0.0",
        "npm-pick-manifest": "^10.0.0",
        "npm-registry-fetch": "^18.0.0",
        "proc-log": "^5.0.0",
        "promise-retry": "^2.0.1",
        "sigstore": "^3.0.0",
        "ssri": "^12.0.0",
        "tar": "^6.1.11"
      },
      "bin": {
        "pacote": "bin/index.js"
      },
      "engines": {
        "node": "^20.17.0 || >=22.9.0"
      }
    },
    "node_modules/pacote/node_modules/hosted-git-info": {
      "version": "8.1.0",
      "resolved": "https://registry.npmjs.org/hosted-git-info/-/hosted-git-info-8.1.0.tgz",
      "integrity": "sha512-Rw/B2DNQaPBICNXEm8balFz9a6WpZrkCGpcWFpy7nCj+NyhSdqXipmfvtmWt9xGfp0wZnBxB+iVpLmQMYt47Tw==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "lru-cache": "^10.0.1"
      },
      "engines": {
        "node": "^18.17.0 || >=20.5.0"
      }
    },
    "node_modules/pacote/node_modules/lru-cache": {
      "version": "10.4.3",
      "resolved": "https://registry.npmjs.org/lru-cache/-/lru-cache-10.4.3.tgz",
      "integrity": "sha512-JNAzZcXrCt42VGLuYz0zfAzDfAvJWW6AfYlDBQyDV5DClI2m5sAmK+OIO7s59XfsRsWHp02jAJrRadPRGTt6SQ==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/pacote/node_modules/npm-package-arg": {
      "version": "12.0.2",
      "resolved": "https://registry.npmjs.org/npm-package-arg/-/npm-package-arg-12.0.2.tgz",
      "integrity": "sha512-f1NpFjNI9O4VbKMOlA5QoBq/vSQPORHcTZ2feJpFkTHJ9eQkdlmZEKSjcAhxTGInC7RlEyScT9ui67NaOsjFWA==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "hosted-git-info": "^8.0.0",
        "proc-log": "^5.0.0",
        "semver": "^7.3.5",
        "validate-npm-package-name": "^6.0.0"
      },
      "engines": {
        "node": "^18.17.0 || >=20.5.0"
      }
    },
    "node_modules/parent-module": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/parent-module/-/parent-module-1.0.1.tgz",
      "integrity": "sha512-GQ2EWRpQV8/o+Aw8YqtfZZPfNRWZYkbidE9k5rpl/hC3vtHHBfGm2Ifi6qWV+coDGkrUKZAxE3Lot5kcsRlh+g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "callsites": "^3.0.0"
      },
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/parse-json": {
      "version": "5.2.0",
      "resolved": "https://registry.npmjs.org/parse-json/-/parse-json-5.2.0.tgz",
      "integrity": "sha512-ayCKvm/phCGxOkYRSCM82iDwct8/EonSEgCSxWxD7ve6jHggsFl4fZVQBPRNgQoKiuV/odhFrGzQXZwbifC8Rg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/code-frame": "^7.0.0",
        "error-ex": "^1.3.1",
        "json-parse-even-better-errors": "^2.3.0",
        "lines-and-columns": "^1.1.6"
      },
      "engines": {
        "node": ">=8"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/parse-json/node_modules/json-parse-even-better-errors": {
      "version": "2.3.1",
      "resolved": "https://registry.npmjs.org/json-parse-even-better-errors/-/json-parse-even-better-errors-2.3.1.tgz",
      "integrity": "sha512-xyFwyhro/JEof6Ghe2iz2NcXoj2sloNsWr/XsERDK/oiPCfaNhl5ONfp+jQdAZRQQ0IJWNzH9zIZF7li91kh2w==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/parse-node-version": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/parse-node-version/-/parse-node-version-1.0.1.tgz",
      "integrity": "sha512-3YHlOa/JgH6Mnpr05jP9eDG254US9ek25LyIxZlDItp2iJtwyaXQb57lBYLdT3MowkUFYEV2XXNAYIPlESvJlA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.10"
      }
    },
    "node_modules/parse5": {
      "version": "8.0.0",
      "resolved": "https://registry.npmjs.org/parse5/-/parse5-8.0.0.tgz",
      "integrity": "sha512-9m4m5GSgXjL4AjumKzq1Fgfp3Z8rsvjRNbnkVwfu2ImRqE5D0LnY2QfDen18FSY9C573YU5XxSapdHZTZ2WolA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "entities": "^6.0.0"
      },
      "funding": {
        "url": "https://github.com/inikulin/parse5?sponsor=1"
      }
    },
    "node_modules/parse5-html-rewriting-stream": {
      "version": "8.0.0",
      "resolved": "https://registry.npmjs.org/parse5-html-rewriting-stream/-/parse5-html-rewriting-stream-8.0.0.tgz",
      "integrity": "sha512-wzh11mj8KKkno1pZEu+l2EVeWsuKDfR5KNWZOTsslfUX8lPDZx77m9T0kIoAVkFtD1nx6YF8oh4BnPHvxMtNMw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "entities": "^6.0.0",
        "parse5": "^8.0.0",
        "parse5-sax-parser": "^8.0.0"
      },
      "funding": {
        "url": "https://github.com/inikulin/parse5?sponsor=1"
      }
    },
    "node_modules/parse5-html-rewriting-stream/node_modules/entities": {
      "version": "6.0.1",
      "resolved": "https://registry.npmjs.org/entities/-/entities-6.0.1.tgz",
      "integrity": "sha512-aN97NXWF6AWBTahfVOIrB/NShkzi5H7F9r1s9mD3cDj4Ko5f2qhhVoYMibXF7GlLveb/D2ioWay8lxI97Ven3g==",
      "dev": true,
      "license": "BSD-2-Clause",
      "engines": {
        "node": ">=0.12"
      },
      "funding": {
        "url": "https://github.com/fb55/entities?sponsor=1"
      }
    },
    "node_modules/parse5-sax-parser": {
      "version": "8.0.0",
      "resolved": "https://registry.npmjs.org/parse5-sax-parser/-/parse5-sax-parser-8.0.0.tgz",
      "integrity": "sha512-/dQ8UzHZwnrzs3EvDj6IkKrD/jIZyTlB+8XrHJvcjNgRdmWruNdN9i9RK/JtxakmlUdPwKubKPTCqvbTgzGhrw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "parse5": "^8.0.0"
      },
      "funding": {
        "url": "https://github.com/inikulin/parse5?sponsor=1"
      }
    },
    "node_modules/parse5/node_modules/entities": {
      "version": "6.0.1",
      "resolved": "https://registry.npmjs.org/entities/-/entities-6.0.1.tgz",
      "integrity": "sha512-aN97NXWF6AWBTahfVOIrB/NShkzi5H7F9r1s9mD3cDj4Ko5f2qhhVoYMibXF7GlLveb/D2ioWay8lxI97Ven3g==",
      "dev": true,
      "license": "BSD-2-Clause",
      "engines": {
        "node": ">=0.12"
      },
      "funding": {
        "url": "https://github.com/fb55/entities?sponsor=1"
      }
    },
    "node_modules/parseurl": {
      "version": "1.3.3",
      "resolved": "https://registry.npmjs.org/parseurl/-/parseurl-1.3.3.tgz",
      "integrity": "sha512-CiyeOxFT/JZyN5m0z9PfXw4SCBJ6Sygz1Dpl0wqjlhDEGGBP1GnsUVEL0p63hoG1fcj3fHynXi9NYO4nWOL+qQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/path-exists": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/path-exists/-/path-exists-4.0.0.tgz",
      "integrity": "sha512-ak9Qy5Q7jYb2Wwcey5Fpvg2KoAc/ZIhLSLOSBmRmygPsGwkVVt0fZa0qrtMz+m6tJTAHfZQ8FnmB4MG4LWy7/w==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/path-is-absolute": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/path-is-absolute/-/path-is-absolute-1.0.1.tgz",
      "integrity": "sha512-AVbw3UJ2e9bq64vSaS9Am0fje1Pa8pbGqTTsmXfaIiMpnr5DlDhfJOuLj9Sf95ZPVDAUerDfEk88MPmPe7UCQg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/path-key": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/path-key/-/path-key-3.1.1.tgz",
      "integrity": "sha512-ojmeN0qd+y0jszEtoY48r0Peq5dwMEkIlCOu6Q5f41lfkswXuKtYrhgoTpLnyIcHm24Uhqx+5Tqm2InSwLhE6Q==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/path-parse": {
      "version": "1.0.7",
      "resolved": "https://registry.npmjs.org/path-parse/-/path-parse-1.0.7.tgz",
      "integrity": "sha512-LDJzPVEEEPR+y48z93A0Ed0yXb8pAByGWo/k5YYdYgpY2/2EsOsksJrq7lOHxryrVOn1ejG6oAp8ahvOIQD8sw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/path-scurry": {
      "version": "1.11.1",
      "resolved": "https://registry.npmjs.org/path-scurry/-/path-scurry-1.11.1.tgz",
      "integrity": "sha512-Xa4Nw17FS9ApQFJ9umLiJS4orGjm7ZzwUrwamcGQuHSzDyth9boKDaycYdDcZDuqYATXw4HFXgaqWTctW/v1HA==",
      "dev": true,
      "license": "BlueOak-1.0.0",
      "dependencies": {
        "lru-cache": "^10.2.0",
        "minipass": "^5.0.0 || ^6.0.2 || ^7.0.0"
      },
      "engines": {
        "node": ">=16 || 14 >=14.18"
      },
      "funding": {
        "url": "https://github.com/sponsors/isaacs"
      }
    },
    "node_modules/path-scurry/node_modules/lru-cache": {
      "version": "10.4.3",
      "resolved": "https://registry.npmjs.org/lru-cache/-/lru-cache-10.4.3.tgz",
      "integrity": "sha512-JNAzZcXrCt42VGLuYz0zfAzDfAvJWW6AfYlDBQyDV5DClI2m5sAmK+OIO7s59XfsRsWHp02jAJrRadPRGTt6SQ==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/path-to-regexp": {
      "version": "0.1.12",
      "resolved": "https://registry.npmjs.org/path-to-regexp/-/path-to-regexp-0.1.12.tgz",
      "integrity": "sha512-RA1GjUVMnvYFxuqovrEqZoxxW5NUZqbwKtYz/Tt7nXerk0LbLblQmrsgdeOxV5SFHf0UDggjS/bSeOZwt1pmEQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/picocolors": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/picocolors/-/picocolors-1.1.1.tgz",
      "integrity": "sha512-xceH2snhtb5M9liqDsmEw56le376mTZkEX/jEb/RxNFyegNul7eNslCXP9FDj/Lcu0X8KEyMceP2ntpaHrDEVA==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/picomatch": {
      "version": "4.0.3",
      "resolved": "https://registry.npmjs.org/picomatch/-/picomatch-4.0.3.tgz",
      "integrity": "sha512-5gTmgEY/sqK6gFXLIsQNH19lWb4ebPDLA4SdLP7dsWkIXHWlG66oPuVvXSGFPppYZz8ZDZq0dYYrbHfBCVUb1Q==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/sponsors/jonschlinkert"
      }
    },
    "node_modules/pify": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/pify/-/pify-4.0.1.tgz",
      "integrity": "sha512-uB80kBFb/tfd68bVleG9T5GGsGPjJrLAUpR5PZIrhBnIaRTQRjqdJSsIKkOP6OAIFbj7GOrcudc5pNjZ+geV2g==",
      "dev": true,
      "license": "MIT",
      "optional": true,
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/piscina": {
      "version": "5.1.3",
      "resolved": "https://registry.npmjs.org/piscina/-/piscina-5.1.3.tgz",
      "integrity": "sha512-0u3N7H4+hbr40KjuVn2uNhOcthu/9usKhnw5vT3J7ply79v3D3M8naI00el9Klcy16x557VsEkkUQaHCWFXC/g==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=20.x"
      },
      "optionalDependencies": {
        "@napi-rs/nice": "^1.0.4"
      }
    },
    "node_modules/pkce-challenge": {
      "version": "5.0.0",
      "resolved": "https://registry.npmjs.org/pkce-challenge/-/pkce-challenge-5.0.0.tgz",
      "integrity": "sha512-ueGLflrrnvwB3xuo/uGob5pd5FN7l0MsLf0Z87o/UQmRtwjvfylfc9MurIxRAWywCYTgrvpXBcqjV4OfCYGCIQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=16.20.0"
      }
    },
    "node_modules/postcss": {
      "version": "8.5.6",
      "resolved": "https://registry.npmjs.org/postcss/-/postcss-8.5.6.tgz",
      "integrity": "sha512-3Ybi1tAuwAP9s0r1UQ2J4n5Y0G05bJkpUIO0/bI9MhwmD70S5aTWbXGBwxHrelT+XM1k6dM0pk+SwNkpTRN7Pg==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/postcss"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "nanoid": "^3.3.11",
        "picocolors": "^1.1.1",
        "source-map-js": "^1.2.1"
      },
      "engines": {
        "node": "^10 || ^12 || >=14"
      }
    },
    "node_modules/postcss-loader": {
      "version": "8.1.1",
      "resolved": "https://registry.npmjs.org/postcss-loader/-/postcss-loader-8.1.1.tgz",
      "integrity": "sha512-0IeqyAsG6tYiDRCYKQJLAmgQr47DX6N7sFSWvQxt6AcupX8DIdmykuk/o/tx0Lze3ErGHJEp5OSRxrelC6+NdQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "cosmiconfig": "^9.0.0",
        "jiti": "^1.20.0",
        "semver": "^7.5.4"
      },
      "engines": {
        "node": ">= 18.12.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/webpack"
      },
      "peerDependencies": {
        "@rspack/core": "0.x || 1.x",
        "postcss": "^7.0.0 || ^8.0.1",
        "webpack": "^5.0.0"
      },
      "peerDependenciesMeta": {
        "@rspack/core": {
          "optional": true
        },
        "webpack": {
          "optional": true
        }
      }
    },
    "node_modules/postcss-media-query-parser": {
      "version": "0.2.3",
      "resolved": "https://registry.npmjs.org/postcss-media-query-parser/-/postcss-media-query-parser-0.2.3.tgz",
      "integrity": "sha512-3sOlxmbKcSHMjlUXQZKQ06jOswE7oVkXPxmZdoB1r5l0q6gTFTQSHxNxOrCccElbW7dxNytifNEo8qidX2Vsig==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/postcss-modules-extract-imports": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/postcss-modules-extract-imports/-/postcss-modules-extract-imports-3.1.0.tgz",
      "integrity": "sha512-k3kNe0aNFQDAZGbin48pL2VNidTF0w4/eASDsxlyspobzU3wZQLOGj7L9gfRe0Jo9/4uud09DsjFNH7winGv8Q==",
      "dev": true,
      "license": "ISC",
      "engines": {
        "node": "^10 || ^12 || >= 14"
      },
      "peerDependencies": {
        "postcss": "^8.1.0"
      }
    },
    "node_modules/postcss-modules-local-by-default": {
      "version": "4.2.0",
      "resolved": "https://registry.npmjs.org/postcss-modules-local-by-default/-/postcss-modules-local-by-default-4.2.0.tgz",
      "integrity": "sha512-5kcJm/zk+GJDSfw+V/42fJ5fhjL5YbFDl8nVdXkJPLLW+Vf9mTD5Xe0wqIaDnLuL2U6cDNpTr+UQ+v2HWIBhzw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "icss-utils": "^5.0.0",
        "postcss-selector-parser": "^7.0.0",
        "postcss-value-parser": "^4.1.0"
      },
      "engines": {
        "node": "^10 || ^12 || >= 14"
      },
      "peerDependencies": {
        "postcss": "^8.1.0"
      }
    },
    "node_modules/postcss-modules-scope": {
      "version": "3.2.1",
      "resolved": "https://registry.npmjs.org/postcss-modules-scope/-/postcss-modules-scope-3.2.1.tgz",
      "integrity": "sha512-m9jZstCVaqGjTAuny8MdgE88scJnCiQSlSrOWcTQgM2t32UBe+MUmFSO5t7VMSfAf/FJKImAxBav8ooCHJXCJA==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "postcss-selector-parser": "^7.0.0"
      },
      "engines": {
        "node": "^10 || ^12 || >= 14"
      },
      "peerDependencies": {
        "postcss": "^8.1.0"
      }
    },
    "node_modules/postcss-modules-values": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/postcss-modules-values/-/postcss-modules-values-4.0.0.tgz",
      "integrity": "sha512-RDxHkAiEGI78gS2ofyvCsu7iycRv7oqw5xMWn9iMoR0N/7mf9D50ecQqUo5BZ9Zh2vH4bCUR/ktCqbB9m8vJjQ==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "icss-utils": "^5.0.0"
      },
      "engines": {
        "node": "^10 || ^12 || >= 14"
      },
      "peerDependencies": {
        "postcss": "^8.1.0"
      }
    },
    "node_modules/postcss-selector-parser": {
      "version": "7.1.0",
      "resolved": "https://registry.npmjs.org/postcss-selector-parser/-/postcss-selector-parser-7.1.0.tgz",
      "integrity": "sha512-8sLjZwK0R+JlxlYcTuVnyT2v+htpdrjDOKuMcOVdYjt52Lh8hWRYpxBPoKx/Zg+bcjc3wx6fmQevMmUztS/ccA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "cssesc": "^3.0.0",
        "util-deprecate": "^1.0.2"
      },
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/postcss-value-parser": {
      "version": "4.2.0",
      "resolved": "https://registry.npmjs.org/postcss-value-parser/-/postcss-value-parser-4.2.0.tgz",
      "integrity": "sha512-1NNCs6uurfkVbeXG4S8JFT9t19m45ICnif8zWLd5oPSZ50QnwMfK+H3jv408d4jw/7Bttv5axS5IiHoLaVNHeQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/proc-log": {
      "version": "5.0.0",
      "resolved": "https://registry.npmjs.org/proc-log/-/proc-log-5.0.0.tgz",
      "integrity": "sha512-Azwzvl90HaF0aCz1JrDdXQykFakSSNPaPoiZ9fm5qJIMHioDZEi7OAdRwSm6rSoPtY3Qutnm3L7ogmg3dc+wbQ==",
      "dev": true,
      "license": "ISC",
      "engines": {
        "node": "^18.17.0 || >=20.5.0"
      }
    },
    "node_modules/process-nextick-args": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/process-nextick-args/-/process-nextick-args-2.0.1.tgz",
      "integrity": "sha512-3ouUOpQhtgrbOa17J7+uxOTpITYWaGP7/AhoR3+A+/1e9skrzelGi/dXzEYyvbxubEF6Wn2ypscTKiKJFFn1ag==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/promise-retry": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/promise-retry/-/promise-retry-2.0.1.tgz",
      "integrity": "sha512-y+WKFlBR8BGXnsNlIHFGPZmyDf3DFMoLhaflAnyZgV6rG6xu+JwesTo2Q9R6XwYmtmwAFCkAk3e35jEdoeh/3g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "err-code": "^2.0.2",
        "retry": "^0.12.0"
      },
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/proxy-addr": {
      "version": "2.0.7",
      "resolved": "https://registry.npmjs.org/proxy-addr/-/proxy-addr-2.0.7.tgz",
      "integrity": "sha512-llQsMLSUDUPT44jdrU/O37qlnifitDP+ZwrmmZcoSKyLKvtZxpyV0n2/bD/N4tBAAZ/gJEdZU7KMraoK1+XYAg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "forwarded": "0.2.0",
        "ipaddr.js": "1.9.1"
      },
      "engines": {
        "node": ">= 0.10"
      }
    },
    "node_modules/prr": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/prr/-/prr-1.0.1.tgz",
      "integrity": "sha512-yPw4Sng1gWghHQWj0B3ZggWUm4qVbPwPFcRG8KyxiU7J2OHFSoEHKS+EZ3fv5l1t9CyCiop6l/ZYeWbrgoQejw==",
      "dev": true,
      "license": "MIT",
      "optional": true
    },
    "node_modules/punycode": {
      "version": "1.4.1",
      "resolved": "https://registry.npmjs.org/punycode/-/punycode-1.4.1.tgz",
      "integrity": "sha512-jmYNElW7yvO7TV33CjSmvSiE2yco3bV2czu/OzDKdMNVZQWfxCblURLhf+47syQRBntjfLdd/H0egrzIG+oaFQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/qjobs": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/qjobs/-/qjobs-1.2.0.tgz",
      "integrity": "sha512-8YOJEHtxpySA3fFDyCRxA+UUV+fA+rTWnuWvylOK/NCjhY+b4ocCtmu8TtsWb+mYeU+GCHf/S66KZF/AsteKHg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.9"
      }
    },
    "node_modules/qs": {
      "version": "6.13.0",
      "resolved": "https://registry.npmjs.org/qs/-/qs-6.13.0.tgz",
      "integrity": "sha512-+38qI9SOr8tfZ4QmJNplMUxqjbe7LKvvZgWdExBOmd+egZTtjLB67Gu0HRX3u/XOq7UU2Nx6nsjvS16Z9uwfpg==",
      "dev": true,
      "license": "BSD-3-Clause",
      "dependencies": {
        "side-channel": "^1.0.6"
      },
      "engines": {
        "node": ">=0.6"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/queue-microtask": {
      "version": "1.2.3",
      "resolved": "https://registry.npmjs.org/queue-microtask/-/queue-microtask-1.2.3.tgz",
      "integrity": "sha512-NuaNSa6flKT5JaSYQzJok04JzTL1CA6aGhv5rfLW3PgqA+M2ChpZQnAC8h8i4ZFkBS8X5RqkDBHA7r4hej3K9A==",
      "dev": true,
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/feross"
        },
        {
          "type": "patreon",
          "url": "https://www.patreon.com/feross"
        },
        {
          "type": "consulting",
          "url": "https://feross.org/support"
        }
      ],
      "license": "MIT"
    },
    "node_modules/randombytes": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/randombytes/-/randombytes-2.1.0.tgz",
      "integrity": "sha512-vYl3iOX+4CKUWuxGi9Ukhie6fsqXqS9FE2Zaic4tNFD2N2QQaXOMFbuKK4QmDHC0JO6B1Zp41J0LpT0oR68amQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "safe-buffer": "^5.1.0"
      }
    },
    "node_modules/range-parser": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/range-parser/-/range-parser-1.2.1.tgz",
      "integrity": "sha512-Hrgsx+orqoygnmhFbKaHE6c296J+HTAQXoxEF6gNupROmmGJRoyzfG3ccAveqCBrwr/2yxQ5BVd/GTl5agOwSg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/raw-body": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/raw-body/-/raw-body-3.0.1.tgz",
      "integrity": "sha512-9G8cA+tuMS75+6G/TzW8OtLzmBDMo8p1JRxN5AZ+LAp8uxGA8V8GZm4GQ4/N5QNQEnLmg6SS7wyuSmbKepiKqA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "bytes": "3.1.2",
        "http-errors": "2.0.0",
        "iconv-lite": "0.7.0",
        "unpipe": "1.0.0"
      },
      "engines": {
        "node": ">= 0.10"
      }
    },
    "node_modules/readable-stream": {
      "version": "3.6.2",
      "resolved": "https://registry.npmjs.org/readable-stream/-/readable-stream-3.6.2.tgz",
      "integrity": "sha512-9u/sniCrY3D5WdsERHzHE4G2YCXqoG5FTHUiCC4SIbr6XcLZBY05ya9EKjYek9O5xOAwjGq+1JdGBAS7Q9ScoA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "inherits": "^2.0.3",
        "string_decoder": "^1.1.1",
        "util-deprecate": "^1.0.1"
      },
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/readdirp": {
      "version": "4.1.2",
      "resolved": "https://registry.npmjs.org/readdirp/-/readdirp-4.1.2.tgz",
      "integrity": "sha512-GDhwkLfywWL2s6vEjyhri+eXmfH6j1L7JE27WhqLeYzoh/A3DBaYGEj2H/HFZCn/kMfim73FXxEJTw06WtxQwg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 14.18.0"
      },
      "funding": {
        "type": "individual",
        "url": "https://paulmillr.com/funding/"
      }
    },
    "node_modules/reflect-metadata": {
      "version": "0.2.2",
      "resolved": "https://registry.npmjs.org/reflect-metadata/-/reflect-metadata-0.2.2.tgz",
      "integrity": "sha512-urBwgfrvVP/eAyXx4hluJivBKzuEbSQs9rKWCrCkbSxNv8mxPcUZKeuoF3Uy4mJl3Lwprp6yy5/39VWigZ4K6Q==",
      "dev": true,
      "license": "Apache-2.0"
    },
    "node_modules/regenerate": {
      "version": "1.4.2",
      "resolved": "https://registry.npmjs.org/regenerate/-/regenerate-1.4.2.tgz",
      "integrity": "sha512-zrceR/XhGYU/d/opr2EKO7aRHUeiBI8qjtfHqADTwZd6Szfy16la6kqD0MIUs5z5hx6AaKa+PixpPrR289+I0A==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/regenerate-unicode-properties": {
      "version": "10.2.2",
      "resolved": "https://registry.npmjs.org/regenerate-unicode-properties/-/regenerate-unicode-properties-10.2.2.tgz",
      "integrity": "sha512-m03P+zhBeQd1RGnYxrGyDAPpWX/epKirLrp8e3qevZdVkKtnCrjjWczIbYc8+xd6vcTStVlqfycTx1KR4LOr0g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "regenerate": "^1.4.2"
      },
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/regex-parser": {
      "version": "2.3.1",
      "resolved": "https://registry.npmjs.org/regex-parser/-/regex-parser-2.3.1.tgz",
      "integrity": "sha512-yXLRqatcCuKtVHsWrNg0JL3l1zGfdXeEvDa0bdu4tCDQw0RpMDZsqbkyRTUnKMR0tXF627V2oEWjBEaEdqTwtQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/regexpu-core": {
      "version": "6.4.0",
      "resolved": "https://registry.npmjs.org/regexpu-core/-/regexpu-core-6.4.0.tgz",
      "integrity": "sha512-0ghuzq67LI9bLXpOX/ISfve/Mq33a4aFRzoQYhnnok1JOFpmE/A2TBGkNVenOGEeSBCjIiWcc6MVOG5HEQv0sA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "regenerate": "^1.4.2",
        "regenerate-unicode-properties": "^10.2.2",
        "regjsgen": "^0.8.0",
        "regjsparser": "^0.13.0",
        "unicode-match-property-ecmascript": "^2.0.0",
        "unicode-match-property-value-ecmascript": "^2.2.1"
      },
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/regjsgen": {
      "version": "0.8.0",
      "resolved": "https://registry.npmjs.org/regjsgen/-/regjsgen-0.8.0.tgz",
      "integrity": "sha512-RvwtGe3d7LvWiDQXeQw8p5asZUmfU1G/l6WbUXeHta7Y2PEIvBTwH6E2EfmYUK8pxcxEdEmaomqyp0vZZ7C+3Q==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/regjsparser": {
      "version": "0.13.0",
      "resolved": "https://registry.npmjs.org/regjsparser/-/regjsparser-0.13.0.tgz",
      "integrity": "sha512-NZQZdC5wOE/H3UT28fVGL+ikOZcEzfMGk/c3iN9UGxzWHMa1op7274oyiUVrAG4B2EuFhus8SvkaYnhvW92p9Q==",
      "dev": true,
      "license": "BSD-2-Clause",
      "dependencies": {
        "jsesc": "~3.1.0"
      },
      "bin": {
        "regjsparser": "bin/parser"
      }
    },
    "node_modules/require-directory": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/require-directory/-/require-directory-2.1.1.tgz",
      "integrity": "sha512-fGxEI7+wsG9xrvdjsrlmL22OMTTiHRwAMroiEeMgq8gzoLC/PQr7RsRDSTLUg/bZAZtF+TVIkHc6/4RIKrui+Q==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/require-from-string": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/require-from-string/-/require-from-string-2.0.2.tgz",
      "integrity": "sha512-Xf0nWe6RseziFMu+Ap9biiUbmplq6S9/p+7w7YXP/JBHhrUDDUhwa+vANyubuqfZWTveU//DYVGsDG7RKL/vEw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/requires-port": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/requires-port/-/requires-port-1.0.0.tgz",
      "integrity": "sha512-KigOCHcocU3XODJxsu8i/j8T9tzT4adHiecwORRQ0ZZFcp7ahwXuRU1m+yuO90C5ZUyGeGfocHDI14M3L3yDAQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/resolve": {
      "version": "1.22.10",
      "resolved": "https://registry.npmjs.org/resolve/-/resolve-1.22.10.tgz",
      "integrity": "sha512-NPRy+/ncIMeDlTAsuqwKIiferiawhefFJtkNSW0qZJEqMEb+qBt/77B/jGeeek+F0uOeN05CDa6HXbbIgtVX4w==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "is-core-module": "^2.16.0",
        "path-parse": "^1.0.7",
        "supports-preserve-symlinks-flag": "^1.0.0"
      },
      "bin": {
        "resolve": "bin/resolve"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/resolve-from": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/resolve-from/-/resolve-from-4.0.0.tgz",
      "integrity": "sha512-pb/MYmXstAkysRFx8piNI1tGFNQIFA3vkE3Gq4EuA1dF6gHp/+vgZqsCGJapvy8N3Q+4o7FwvquPJcnZ7RYy4g==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/resolve-url-loader": {
      "version": "5.0.0",
      "resolved": "https://registry.npmjs.org/resolve-url-loader/-/resolve-url-loader-5.0.0.tgz",
      "integrity": "sha512-uZtduh8/8srhBoMx//5bwqjQ+rfYOUq8zC9NrMUGtjBiGTtFJM42s58/36+hTqeqINcnYe08Nj3LkK9lW4N8Xg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "adjust-sourcemap-loader": "^4.0.0",
        "convert-source-map": "^1.7.0",
        "loader-utils": "^2.0.0",
        "postcss": "^8.2.14",
        "source-map": "0.6.1"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/resolve-url-loader/node_modules/loader-utils": {
      "version": "2.0.4",
      "resolved": "https://registry.npmjs.org/loader-utils/-/loader-utils-2.0.4.tgz",
      "integrity": "sha512-xXqpXoINfFhgua9xiqD8fPFHgkoq1mmmpE92WlDbm9rNRd/EbRb+Gqf908T2DMfuHjjJlksiK2RbHVOdD/MqSw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "big.js": "^5.2.2",
        "emojis-list": "^3.0.0",
        "json5": "^2.1.2"
      },
      "engines": {
        "node": ">=8.9.0"
      }
    },
    "node_modules/resolve-url-loader/node_modules/source-map": {
      "version": "0.6.1",
      "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.6.1.tgz",
      "integrity": "sha512-UjgapumWlbMhkBgzT7Ykc5YXUT46F0iKu8SGXq0bcwP5dz/h0Plj6enJqjz1Zbq2l5WaqYnrVbwWOWMyF3F47g==",
      "dev": true,
      "license": "BSD-3-Clause",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/restore-cursor": {
      "version": "5.1.0",
      "resolved": "https://registry.npmjs.org/restore-cursor/-/restore-cursor-5.1.0.tgz",
      "integrity": "sha512-oMA2dcrw6u0YfxJQXm342bFKX/E4sG9rbTzO9ptUcR/e8A33cHuvStiYOwH7fszkZlZ1z/ta9AAoPk2F4qIOHA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "onetime": "^7.0.0",
        "signal-exit": "^4.1.0"
      },
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/retry": {
      "version": "0.12.0",
      "resolved": "https://registry.npmjs.org/retry/-/retry-0.12.0.tgz",
      "integrity": "sha512-9LkiTwjUh6rT555DtE9rTX+BKByPfrMzEAtnlEtdEwr3Nkffwiihqe2bWADg+OQRjt9gl6ICdmB/ZFDCGAtSow==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 4"
      }
    },
    "node_modules/reusify": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/reusify/-/reusify-1.1.0.tgz",
      "integrity": "sha512-g6QUff04oZpHs0eG5p83rFLhHeV00ug/Yf9nZM6fLeUrPguBTkTQOdpAWWspMh55TZfVQDPaN3NQJfbVRAxdIw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "iojs": ">=1.0.0",
        "node": ">=0.10.0"
      }
    },
    "node_modules/rfdc": {
      "version": "1.4.1",
      "resolved": "https://registry.npmjs.org/rfdc/-/rfdc-1.4.1.tgz",
      "integrity": "sha512-q1b3N5QkRUWUl7iyylaaj3kOpIT0N2i9MqIEQXP73GVsN9cw3fdx8X63cEmWhJGi2PPCF23Ijp7ktmd39rawIA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/rimraf": {
      "version": "3.0.2",
      "resolved": "https://registry.npmjs.org/rimraf/-/rimraf-3.0.2.tgz",
      "integrity": "sha512-JZkJMZkAGFFPP2YqXZXPbMlMBgsxzE8ILs4lMIX/2o0L9UBw9O/Y3o6wFw/i9YLapcUJWwqbi3kdxIPdC62TIA==",
      "deprecated": "Rimraf versions prior to v4 are no longer supported",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "glob": "^7.1.3"
      },
      "bin": {
        "rimraf": "bin.js"
      },
      "funding": {
        "url": "https://github.com/sponsors/isaacs"
      }
    },
    "node_modules/rollup": {
      "version": "4.52.3",
      "resolved": "https://registry.npmjs.org/rollup/-/rollup-4.52.3.tgz",
      "integrity": "sha512-RIDh866U8agLgiIcdpB+COKnlCreHJLfIhWC3LVflku5YHfpnsIKigRZeFfMfCc4dVcqNVfQQ5gO/afOck064A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/estree": "1.0.8"
      },
      "bin": {
        "rollup": "dist/bin/rollup"
      },
      "engines": {
        "node": ">=18.0.0",
        "npm": ">=8.0.0"
      },
      "optionalDependencies": {
        "@rollup/rollup-android-arm-eabi": "4.52.3",
        "@rollup/rollup-android-arm64": "4.52.3",
        "@rollup/rollup-darwin-arm64": "4.52.3",
        "@rollup/rollup-darwin-x64": "4.52.3",
        "@rollup/rollup-freebsd-arm64": "4.52.3",
        "@rollup/rollup-freebsd-x64": "4.52.3",
        "@rollup/rollup-linux-arm-gnueabihf": "4.52.3",
        "@rollup/rollup-linux-arm-musleabihf": "4.52.3",
        "@rollup/rollup-linux-arm64-gnu": "4.52.3",
        "@rollup/rollup-linux-arm64-musl": "4.52.3",
        "@rollup/rollup-linux-loong64-gnu": "4.52.3",
        "@rollup/rollup-linux-ppc64-gnu": "4.52.3",
        "@rollup/rollup-linux-riscv64-gnu": "4.52.3",
        "@rollup/rollup-linux-riscv64-musl": "4.52.3",
        "@rollup/rollup-linux-s390x-gnu": "4.52.3",
        "@rollup/rollup-linux-x64-gnu": "4.52.3",
        "@rollup/rollup-linux-x64-musl": "4.52.3",
        "@rollup/rollup-openharmony-arm64": "4.52.3",
        "@rollup/rollup-win32-arm64-msvc": "4.52.3",
        "@rollup/rollup-win32-ia32-msvc": "4.52.3",
        "@rollup/rollup-win32-x64-gnu": "4.52.3",
        "@rollup/rollup-win32-x64-msvc": "4.52.3",
        "fsevents": "~2.3.2"
      }
    },
    "node_modules/rollup/node_modules/@rollup/rollup-darwin-arm64": {
      "version": "4.52.3",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-darwin-arm64/-/rollup-darwin-arm64-4.52.3.tgz",
      "integrity": "sha512-lj9ViATR1SsqycwFkJCtYfQTheBdvlWJqzqxwc9f2qrcVrQaF/gCuBRTiTolkRWS6KvNxSk4KHZWG7tDktLgjg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ]
    },
    "node_modules/rollup/node_modules/@rollup/rollup-darwin-x64": {
      "version": "4.52.3",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-darwin-x64/-/rollup-darwin-x64-4.52.3.tgz",
      "integrity": "sha512-+Dyo7O1KUmIsbzx1l+4V4tvEVnVQqMOIYtrxK7ncLSknl1xnMHLgn7gddJVrYPNZfEB8CIi3hK8gq8bDhb3h5A==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ]
    },
    "node_modules/rollup/node_modules/@rollup/rollup-linux-arm64-gnu": {
      "version": "4.52.3",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-arm64-gnu/-/rollup-linux-arm64-gnu-4.52.3.tgz",
      "integrity": "sha512-NcViG7A0YtuFDA6xWSgmFb6iPFzHlf5vcqb2p0lGEbT+gjrEEz8nC/EeDHvx6mnGXnGCC1SeVV+8u+smj0CeGQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/rollup/node_modules/@rollup/rollup-linux-arm64-musl": {
      "version": "4.52.3",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-arm64-musl/-/rollup-linux-arm64-musl-4.52.3.tgz",
      "integrity": "sha512-d3pY7LWno6SYNXRm6Ebsq0DJGoiLXTb83AIPCXl9fmtIQs/rXoS8SJxxUNtFbJ5MiOvs+7y34np77+9l4nfFMw==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/rollup/node_modules/@rollup/rollup-linux-x64-gnu": {
      "version": "4.52.3",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-x64-gnu/-/rollup-linux-x64-gnu-4.52.3.tgz",
      "integrity": "sha512-tPgGd6bY2M2LJTA1uGq8fkSPK8ZLYjDjY+ZLK9WHncCnfIz29LIXIqUgzCR0hIefzy6Hpbe8Th5WOSwTM8E7LA==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/rollup/node_modules/@rollup/rollup-linux-x64-musl": {
      "version": "4.52.3",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-x64-musl/-/rollup-linux-x64-musl-4.52.3.tgz",
      "integrity": "sha512-BCFkJjgk+WFzP+tcSMXq77ymAPIxsX9lFJWs+2JzuZTLtksJ2o5hvgTdIcZ5+oKzUDMwI0PfWzRBYAydAHF2Mw==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/rollup/node_modules/@rollup/rollup-win32-arm64-msvc": {
      "version": "4.52.3",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-win32-arm64-msvc/-/rollup-win32-arm64-msvc-4.52.3.tgz",
      "integrity": "sha512-+zteHZdoUYLkyYKObGHieibUFLbttX2r+58l27XZauq0tcWYYuKUwY2wjeCN9oK1Um2YgH2ibd6cnX/wFD7DuA==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/rollup/node_modules/@rollup/rollup-win32-x64-msvc": {
      "version": "4.52.3",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-win32-x64-msvc/-/rollup-win32-x64-msvc-4.52.3.tgz",
      "integrity": "sha512-zGIbEVVXVtauFgl3MRwGWEN36P5ZGenHRMgNw88X5wEhEBpq0XrMEZwOn07+ICrwM17XO5xfMZqh0OldCH5VTA==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/router": {
      "version": "2.2.0",
      "resolved": "https://registry.npmjs.org/router/-/router-2.2.0.tgz",
      "integrity": "sha512-nLTrUKm2UyiL7rlhapu/Zl45FwNgkZGaCpZbIHajDYgwlJCOzLSk+cIPAnsEqV955GjILJnKbdQC1nVPz+gAYQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "debug": "^4.4.0",
        "depd": "^2.0.0",
        "is-promise": "^4.0.0",
        "parseurl": "^1.3.3",
        "path-to-regexp": "^8.0.0"
      },
      "engines": {
        "node": ">= 18"
      }
    },
    "node_modules/router/node_modules/path-to-regexp": {
      "version": "8.3.0",
      "resolved": "https://registry.npmjs.org/path-to-regexp/-/path-to-regexp-8.3.0.tgz",
      "integrity": "sha512-7jdwVIRtsP8MYpdXSwOS0YdD0Du+qOoF/AEPIt88PcCFrZCzx41oxku1jD88hZBwbNUIEfpqvuhjFaMAqMTWnA==",
      "dev": true,
      "license": "MIT",
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/run-applescript": {
      "version": "7.1.0",
      "resolved": "https://registry.npmjs.org/run-applescript/-/run-applescript-7.1.0.tgz",
      "integrity": "sha512-DPe5pVFaAsinSaV6QjQ6gdiedWDcRCbUuiQfQa2wmWV7+xC9bGulGI8+TdRmoFkAPaBXk8CrAbnlY2ISniJ47Q==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/run-parallel": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/run-parallel/-/run-parallel-1.2.0.tgz",
      "integrity": "sha512-5l4VyZR86LZ/lDxZTR6jqL8AFE2S0IFLMP26AbjsLVADxHdhB/c0GUsH+y39UfCi3dzz8OlQuPmnaJOMoDHQBA==",
      "dev": true,
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/feross"
        },
        {
          "type": "patreon",
          "url": "https://www.patreon.com/feross"
        },
        {
          "type": "consulting",
          "url": "https://feross.org/support"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "queue-microtask": "^1.2.2"
      }
    },
    "node_modules/rxjs": {
      "version": "7.8.2",
      "resolved": "https://registry.npmjs.org/rxjs/-/rxjs-7.8.2.tgz",
      "integrity": "sha512-dhKf903U/PQZY6boNNtAGdWbG85WAbjT/1xYoZIC7FAY0yWapOBQVsVrDl58W86//e1VpMNBtRV4MaXfdMySFA==",
      "license": "Apache-2.0",
      "dependencies": {
        "tslib": "^2.1.0"
      }
    },
    "node_modules/safe-buffer": {
      "version": "5.2.1",
      "resolved": "https://registry.npmjs.org/safe-buffer/-/safe-buffer-5.2.1.tgz",
      "integrity": "sha512-rp3So07KcdmmKbGvgaNxQSJr7bGVSVk5S9Eq1F+ppbRo70+YeaDxkw5Dd8NPN+GD6bjnYm2VuPuCXmpuYvmCXQ==",
      "dev": true,
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/feross"
        },
        {
          "type": "patreon",
          "url": "https://www.patreon.com/feross"
        },
        {
          "type": "consulting",
          "url": "https://feross.org/support"
        }
      ],
      "license": "MIT"
    },
    "node_modules/safe-regex-test": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/safe-regex-test/-/safe-regex-test-1.1.0.tgz",
      "integrity": "sha512-x/+Cz4YrimQxQccJf5mKEbIa1NzeCRNI5Ecl/ekmlYaampdNLPalVyIcCZNNH3MvmqBugV5TMYZXv0ljslUlaw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.2",
        "es-errors": "^1.3.0",
        "is-regex": "^1.2.1"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/safer-buffer": {
      "version": "2.1.2",
      "resolved": "https://registry.npmjs.org/safer-buffer/-/safer-buffer-2.1.2.tgz",
      "integrity": "sha512-YZo3K82SD7Riyi0E1EQPojLz7kpepnSQI9IyPbHHg1XXXevb5dJI7tpyN2ADxGcQbHG7vcyRHk0cbwqcQriUtg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/sass": {
      "version": "1.90.0",
      "resolved": "https://registry.npmjs.org/sass/-/sass-1.90.0.tgz",
      "integrity": "sha512-9GUyuksjw70uNpb1MTYWsH9MQHOHY6kwfnkafC24+7aOMZn9+rVMBxRbLvw756mrBFbIsFg6Xw9IkR2Fnn3k+Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "chokidar": "^4.0.0",
        "immutable": "^5.0.2",
        "source-map-js": ">=0.6.2 <2.0.0"
      },
      "bin": {
        "sass": "sass.js"
      },
      "engines": {
        "node": ">=14.0.0"
      },
      "optionalDependencies": {
        "@parcel/watcher": "^2.4.1"
      }
    },
    "node_modules/sass-loader": {
      "version": "16.0.5",
      "resolved": "https://registry.npmjs.org/sass-loader/-/sass-loader-16.0.5.tgz",
      "integrity": "sha512-oL+CMBXrj6BZ/zOq4os+UECPL+bWqt6OAC6DWS8Ln8GZRcMDjlJ4JC3FBDuHJdYaFWIdKNIBYmtZtK2MaMkNIw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "neo-async": "^2.6.2"
      },
      "engines": {
        "node": ">= 18.12.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/webpack"
      },
      "peerDependencies": {
        "@rspack/core": "0.x || 1.x",
        "node-sass": "^4.0.0 || ^5.0.0 || ^6.0.0 || ^7.0.0 || ^8.0.0 || ^9.0.0",
        "sass": "^1.3.0",
        "sass-embedded": "*",
        "webpack": "^5.0.0"
      },
      "peerDependenciesMeta": {
        "@rspack/core": {
          "optional": true
        },
        "node-sass": {
          "optional": true
        },
        "sass": {
          "optional": true
        },
        "sass-embedded": {
          "optional": true
        },
        "webpack": {
          "optional": true
        }
      }
    },
    "node_modules/sax": {
      "version": "1.4.1",
      "resolved": "https://registry.npmjs.org/sax/-/sax-1.4.1.tgz",
      "integrity": "sha512-+aWOz7yVScEGoKNd4PA10LZ8sk0A/z5+nXQG5giUO5rprX9jgYsTdov9qCchZiPIZezbZH+jRut8nPodFAX4Jg==",
      "dev": true,
      "license": "ISC",
      "optional": true
    },
    "node_modules/schema-utils": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/schema-utils/-/schema-utils-4.3.3.tgz",
      "integrity": "sha512-eflK8wEtyOE6+hsaRVPxvUKYCpRgzLqDTb8krvAsRIwOGlHoSgYLgBXoubGgLd2fT41/OUYdb48v4k4WWHQurA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/json-schema": "^7.0.9",
        "ajv": "^8.9.0",
        "ajv-formats": "^2.1.1",
        "ajv-keywords": "^5.1.0"
      },
      "engines": {
        "node": ">= 10.13.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/webpack"
      }
    },
    "node_modules/schema-utils/node_modules/ajv-formats": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/ajv-formats/-/ajv-formats-2.1.1.tgz",
      "integrity": "sha512-Wx0Kx52hxE7C18hkMEggYlEifqWZtYaRgouJor+WMdPnQyEK13vgEWyVNup7SoeeoLMsr4kf5h6dOW11I15MUA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ajv": "^8.0.0"
      },
      "peerDependencies": {
        "ajv": "^8.0.0"
      },
      "peerDependenciesMeta": {
        "ajv": {
          "optional": true
        }
      }
    },
    "node_modules/select-hose": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/select-hose/-/select-hose-2.0.0.tgz",
      "integrity": "sha512-mEugaLK+YfkijB4fx0e6kImuJdCIt2LxCRcbEYPqRGCs4F2ogyfZU5IAZRdjCP8JPq2AtdNoC/Dux63d9Kiryg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/selfsigned": {
      "version": "2.4.1",
      "resolved": "https://registry.npmjs.org/selfsigned/-/selfsigned-2.4.1.tgz",
      "integrity": "sha512-th5B4L2U+eGLq1TVh7zNRGBapioSORUeymIydxgFpwww9d2qyKvtuPU2jJuHvYAwwqi2Y596QBL3eEqcPEYL8Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/node-forge": "^1.3.0",
        "node-forge": "^1"
      },
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/semver": {
      "version": "7.7.2",
      "resolved": "https://registry.npmjs.org/semver/-/semver-7.7.2.tgz",
      "integrity": "sha512-RF0Fw+rO5AMf9MAyaRXI4AV0Ulj5lMHqVxxdSgiVbixSCXoEmmX/jk0CuJw4+3SqroYO9VoUh+HcuJivvtJemA==",
      "dev": true,
      "license": "ISC",
      "bin": {
        "semver": "bin/semver.js"
      },
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/send": {
      "version": "0.19.0",
      "resolved": "https://registry.npmjs.org/send/-/send-0.19.0.tgz",
      "integrity": "sha512-dW41u5VfLXu8SJh5bwRmyYUbAoSB3c9uQh6L8h/KtsFREPWpbX1lrljJo186Jc4nmci/sGUZ9a0a0J2zgfq2hw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "debug": "2.6.9",
        "depd": "2.0.0",
        "destroy": "1.2.0",
        "encodeurl": "~1.0.2",
        "escape-html": "~1.0.3",
        "etag": "~1.8.1",
        "fresh": "0.5.2",
        "http-errors": "2.0.0",
        "mime": "1.6.0",
        "ms": "2.1.3",
        "on-finished": "2.4.1",
        "range-parser": "~1.2.1",
        "statuses": "2.0.1"
      },
      "engines": {
        "node": ">= 0.8.0"
      }
    },
    "node_modules/send/node_modules/debug": {
      "version": "2.6.9",
      "resolved": "https://registry.npmjs.org/debug/-/debug-2.6.9.tgz",
      "integrity": "sha512-bC7ElrdJaJnPbAP+1EotYvqZsb3ecl5wi6Bfi6BJTUcNowp6cvspg0jXznRTKDjm/E7AdgFBVeAPVMNcKGsHMA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ms": "2.0.0"
      }
    },
    "node_modules/send/node_modules/debug/node_modules/ms": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/ms/-/ms-2.0.0.tgz",
      "integrity": "sha512-Tpp60P6IUJDTuOq/5Z8cdskzJujfwqfOTkrwIwj7IRISpnkJnT6SyJ4PCPnGMoFjC9ddhal5KVIYtAt97ix05A==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/send/node_modules/encodeurl": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/encodeurl/-/encodeurl-1.0.2.tgz",
      "integrity": "sha512-TPJXq8JqFaVYm2CWmPvnP2Iyo4ZSM7/QKcSmuMLDObfpH5fi7RUGmd/rTDf+rut/saiDiQEeVTNgAmJEdAOx0w==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/send/node_modules/mime": {
      "version": "1.6.0",
      "resolved": "https://registry.npmjs.org/mime/-/mime-1.6.0.tgz",
      "integrity": "sha512-x0Vn8spI+wuJ1O6S7gnbaQg8Pxh4NNHb7KSINmEWKiPE4RKOplvijn+NkmYmmRgP68mc70j2EbeTFRsrswaQeg==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "mime": "cli.js"
      },
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/serialize-javascript": {
      "version": "6.0.2",
      "resolved": "https://registry.npmjs.org/serialize-javascript/-/serialize-javascript-6.0.2.tgz",
      "integrity": "sha512-Saa1xPByTTq2gdeFZYLLo+RFE35NHZkAbqZeWNd3BpzppeVisAqpDjcp8dyf6uIvEqJRd46jemmyA4iFIeVk8g==",
      "dev": true,
      "license": "BSD-3-Clause",
      "dependencies": {
        "randombytes": "^2.1.0"
      }
    },
    "node_modules/serve-index": {
      "version": "1.9.1",
      "resolved": "https://registry.npmjs.org/serve-index/-/serve-index-1.9.1.tgz",
      "integrity": "sha512-pXHfKNP4qujrtteMrSBb0rc8HJ9Ms/GrXwcUtUtD5s4ewDJI8bT3Cz2zTVRMKtri49pLx2e0Ya8ziP5Ya2pZZw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "accepts": "~1.3.4",
        "batch": "0.6.1",
        "debug": "2.6.9",
        "escape-html": "~1.0.3",
        "http-errors": "~1.6.2",
        "mime-types": "~2.1.17",
        "parseurl": "~1.3.2"
      },
      "engines": {
        "node": ">= 0.8.0"
      }
    },
    "node_modules/serve-index/node_modules/debug": {
      "version": "2.6.9",
      "resolved": "https://registry.npmjs.org/debug/-/debug-2.6.9.tgz",
      "integrity": "sha512-bC7ElrdJaJnPbAP+1EotYvqZsb3ecl5wi6Bfi6BJTUcNowp6cvspg0jXznRTKDjm/E7AdgFBVeAPVMNcKGsHMA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ms": "2.0.0"
      }
    },
    "node_modules/serve-index/node_modules/depd": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/depd/-/depd-1.1.2.tgz",
      "integrity": "sha512-7emPTl6Dpo6JRXOXjLRxck+FlLRX5847cLKEn00PLAgc3g2hTZZgr+e4c2v6QpSmLeFP3n5yUo7ft6avBK/5jQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/serve-index/node_modules/http-errors": {
      "version": "1.6.3",
      "resolved": "https://registry.npmjs.org/http-errors/-/http-errors-1.6.3.tgz",
      "integrity": "sha512-lks+lVC8dgGyh97jxvxeYTWQFvh4uw4yC12gVl63Cg30sjPX4wuGcdkICVXDAESr6OJGjqGA8Iz5mkeN6zlD7A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "depd": "~1.1.2",
        "inherits": "2.0.3",
        "setprototypeof": "1.1.0",
        "statuses": ">= 1.4.0 < 2"
      },
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/serve-index/node_modules/inherits": {
      "version": "2.0.3",
      "resolved": "https://registry.npmjs.org/inherits/-/inherits-2.0.3.tgz",
      "integrity": "sha512-x00IRNXNy63jwGkJmzPigoySHbaqpNuzKbBOmzK+g2OdZpQ9w+sxCN+VSB3ja7IAge2OP2qpfxTjeNcyjmW1uw==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/serve-index/node_modules/ms": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/ms/-/ms-2.0.0.tgz",
      "integrity": "sha512-Tpp60P6IUJDTuOq/5Z8cdskzJujfwqfOTkrwIwj7IRISpnkJnT6SyJ4PCPnGMoFjC9ddhal5KVIYtAt97ix05A==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/serve-index/node_modules/setprototypeof": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/setprototypeof/-/setprototypeof-1.1.0.tgz",
      "integrity": "sha512-BvE/TwpZX4FXExxOxZyRGQQv651MSwmWKZGqvmPcRIjDqWub67kTKuIMx43cZZrS/cBBzwBcNDWoFxt2XEFIpQ==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/serve-index/node_modules/statuses": {
      "version": "1.5.0",
      "resolved": "https://registry.npmjs.org/statuses/-/statuses-1.5.0.tgz",
      "integrity": "sha512-OpZ3zP+jT1PI7I8nemJX4AKmAX070ZkYPVWV/AaKTJl+tXCTGyVdC1a4SL8RUQYEwk/f34ZX8UTykN68FwrqAA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/serve-static": {
      "version": "1.16.2",
      "resolved": "https://registry.npmjs.org/serve-static/-/serve-static-1.16.2.tgz",
      "integrity": "sha512-VqpjJZKadQB/PEbEwvFdO43Ax5dFBZ2UECszz8bQ7pi7wt//PWe1P6MN7eCnjsatYtBT6EuiClbjSWP2WrIoTw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "encodeurl": "~2.0.0",
        "escape-html": "~1.0.3",
        "parseurl": "~1.3.3",
        "send": "0.19.0"
      },
      "engines": {
        "node": ">= 0.8.0"
      }
    },
    "node_modules/setprototypeof": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/setprototypeof/-/setprototypeof-1.2.0.tgz",
      "integrity": "sha512-E5LDX7Wrp85Kil5bhZv46j8jOeboKq5JMmYM3gVGdGH8xFpPWXUMsNrlODCrkoxMEeNi/XZIwuRvY4XNwYMJpw==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/shallow-clone": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/shallow-clone/-/shallow-clone-3.0.1.tgz",
      "integrity": "sha512-/6KqX+GVUdqPuPPd2LxDDxzX6CAbjJehAAOKlNpqqUpAqPM6HeL8f+o3a+JsyGjn2lv0WY8UsTgUJjU9Ok55NA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "kind-of": "^6.0.2"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/shebang-command": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/shebang-command/-/shebang-command-2.0.0.tgz",
      "integrity": "sha512-kHxr2zZpYtdmrN1qDjrrX/Z1rR1kG8Dx+gkpK1G4eXmvXswmcE1hTWBWYUzlraYw1/yZp6YuDY77YtvbN0dmDA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "shebang-regex": "^3.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/shebang-regex": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/shebang-regex/-/shebang-regex-3.0.0.tgz",
      "integrity": "sha512-7++dFhtcx3353uBaq8DDR4NuxBetBzC7ZQOhmTQInHEd6bSrXdiEyzCvG07Z44UYdLShWUyXt5M/yhz8ekcb1A==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/shell-quote": {
      "version": "1.8.3",
      "resolved": "https://registry.npmjs.org/shell-quote/-/shell-quote-1.8.3.tgz",
      "integrity": "sha512-ObmnIF4hXNg1BqhnHmgbDETF8dLPCggZWBjkQfhZpbszZnYur5DUljTcCHii5LC3J5E0yeO/1LIMyH+UvHQgyw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/side-channel": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/side-channel/-/side-channel-1.1.0.tgz",
      "integrity": "sha512-ZX99e6tRweoUXqR+VBrslhda51Nh5MTQwou5tnUDgbtyM0dBgmhEDtWGP/xbKn6hqfPRHujUNwz5fy/wbbhnpw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "object-inspect": "^1.13.3",
        "side-channel-list": "^1.0.0",
        "side-channel-map": "^1.0.1",
        "side-channel-weakmap": "^1.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/side-channel-list": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/side-channel-list/-/side-channel-list-1.0.0.tgz",
      "integrity": "sha512-FCLHtRD/gnpCiCHEiJLOwdmFP+wzCmDEkc9y7NsYxeF4u7Btsn1ZuwgwJGxImImHicJArLP4R0yX4c2KCrMrTA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "object-inspect": "^1.13.3"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/side-channel-map": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/side-channel-map/-/side-channel-map-1.0.1.tgz",
      "integrity": "sha512-VCjCNfgMsby3tTdo02nbjtM/ewra6jPHmpThenkTYh8pG9ucZ/1P8So4u4FGBek/BjpOVsDCMoLA/iuBKIFXRA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.2",
        "es-errors": "^1.3.0",
        "get-intrinsic": "^1.2.5",
        "object-inspect": "^1.13.3"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/side-channel-weakmap": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/side-channel-weakmap/-/side-channel-weakmap-1.0.2.tgz",
      "integrity": "sha512-WPS/HvHQTYnHisLo9McqBHOJk2FkHO/tlpvldyrnem4aeQp4hai3gythswg6p01oSoTl58rcpiFAjF2br2Ak2A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.2",
        "es-errors": "^1.3.0",
        "get-intrinsic": "^1.2.5",
        "object-inspect": "^1.13.3",
        "side-channel-map": "^1.0.1"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/signal-exit": {
      "version": "4.1.0",
      "resolved": "https://registry.npmjs.org/signal-exit/-/signal-exit-4.1.0.tgz",
      "integrity": "sha512-bzyZ1e88w9O1iNJbKnOlvYTrWPDl46O1bG0D3XInv+9tkPrxrN8jUUTiFlDkkmKWgn1M6CfIA13SuGqOa9Korw==",
      "dev": true,
      "license": "ISC",
      "engines": {
        "node": ">=14"
      },
      "funding": {
        "url": "https://github.com/sponsors/isaacs"
      }
    },
    "node_modules/sigstore": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/sigstore/-/sigstore-3.1.0.tgz",
      "integrity": "sha512-ZpzWAFHIFqyFE56dXqgX/DkDRZdz+rRcjoIk/RQU4IX0wiCv1l8S7ZrXDHcCc+uaf+6o7w3h2l3g6GYG5TKN9Q==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@sigstore/bundle": "^3.1.0",
        "@sigstore/core": "^2.0.0",
        "@sigstore/protobuf-specs": "^0.4.0",
        "@sigstore/sign": "^3.1.0",
        "@sigstore/tuf": "^3.1.0",
        "@sigstore/verify": "^2.1.0"
      },
      "engines": {
        "node": "^18.17.0 || >=20.5.0"
      }
    },
    "node_modules/slice-ansi": {
      "version": "5.0.0",
      "resolved": "https://registry.npmjs.org/slice-ansi/-/slice-ansi-5.0.0.tgz",
      "integrity": "sha512-FC+lgizVPfie0kkhqUScwRu1O/lF6NOgJmlCgK+/LYxDCTk8sGelYaHDhFcDN+Sn3Cv+3VSa4Byeo+IMCzpMgQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ansi-styles": "^6.0.0",
        "is-fullwidth-code-point": "^4.0.0"
      },
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/chalk/slice-ansi?sponsor=1"
      }
    },
    "node_modules/smart-buffer": {
      "version": "4.2.0",
      "resolved": "https://registry.npmjs.org/smart-buffer/-/smart-buffer-4.2.0.tgz",
      "integrity": "sha512-94hK0Hh8rPqQl2xXc3HsaBoOXKV20MToPkcXvwbISWLEs+64sBq5kFgn2kJDHb1Pry9yrP0dxrCI9RRci7RXKg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 6.0.0",
        "npm": ">= 3.0.0"
      }
    },
    "node_modules/socket.io": {
      "version": "4.8.1",
      "resolved": "https://registry.npmjs.org/socket.io/-/socket.io-4.8.1.tgz",
      "integrity": "sha512-oZ7iUCxph8WYRHHcjBEc9unw3adt5CmSNlppj/5Q4k2RIrhl8Z5yY2Xr4j9zj0+wzVZ0bxmYoGSzKJnRl6A4yg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "accepts": "~1.3.4",
        "base64id": "~2.0.0",
        "cors": "~2.8.5",
        "debug": "~4.3.2",
        "engine.io": "~6.6.0",
        "socket.io-adapter": "~2.5.2",
        "socket.io-parser": "~4.2.4"
      },
      "engines": {
        "node": ">=10.2.0"
      }
    },
    "node_modules/socket.io-adapter": {
      "version": "2.5.5",
      "resolved": "https://registry.npmjs.org/socket.io-adapter/-/socket.io-adapter-2.5.5.tgz",
      "integrity": "sha512-eLDQas5dzPgOWCk9GuuJC2lBqItuhKI4uxGgo9aIV7MYbk2h9Q6uULEh8WBzThoI7l+qU9Ast9fVUmkqPP9wYg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "debug": "~4.3.4",
        "ws": "~8.17.1"
      }
    },
    "node_modules/socket.io-adapter/node_modules/debug": {
      "version": "4.3.7",
      "resolved": "https://registry.npmjs.org/debug/-/debug-4.3.7.tgz",
      "integrity": "sha512-Er2nc/H7RrMXZBFCEim6TCmMk02Z8vLC2Rbi1KEBggpo0fS6l0S1nnapwmIi3yW/+GOJap1Krg4w0Hg80oCqgQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ms": "^2.1.3"
      },
      "engines": {
        "node": ">=6.0"
      },
      "peerDependenciesMeta": {
        "supports-color": {
          "optional": true
        }
      }
    },
    "node_modules/socket.io-parser": {
      "version": "4.2.4",
      "resolved": "https://registry.npmjs.org/socket.io-parser/-/socket.io-parser-4.2.4.tgz",
      "integrity": "sha512-/GbIKmo8ioc+NIWIhwdecY0ge+qVBSMdgxGygevmdHj24bsfgtCmcUUcQ5ZzcylGFHsN3k4HB4Cgkl96KVnuew==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@socket.io/component-emitter": "~3.1.0",
        "debug": "~4.3.1"
      },
      "engines": {
        "node": ">=10.0.0"
      }
    },
    "node_modules/socket.io-parser/node_modules/debug": {
      "version": "4.3.7",
      "resolved": "https://registry.npmjs.org/debug/-/debug-4.3.7.tgz",
      "integrity": "sha512-Er2nc/H7RrMXZBFCEim6TCmMk02Z8vLC2Rbi1KEBggpo0fS6l0S1nnapwmIi3yW/+GOJap1Krg4w0Hg80oCqgQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ms": "^2.1.3"
      },
      "engines": {
        "node": ">=6.0"
      },
      "peerDependenciesMeta": {
        "supports-color": {
          "optional": true
        }
      }
    },
    "node_modules/socket.io/node_modules/debug": {
      "version": "4.3.7",
      "resolved": "https://registry.npmjs.org/debug/-/debug-4.3.7.tgz",
      "integrity": "sha512-Er2nc/H7RrMXZBFCEim6TCmMk02Z8vLC2Rbi1KEBggpo0fS6l0S1nnapwmIi3yW/+GOJap1Krg4w0Hg80oCqgQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ms": "^2.1.3"
      },
      "engines": {
        "node": ">=6.0"
      },
      "peerDependenciesMeta": {
        "supports-color": {
          "optional": true
        }
      }
    },
    "node_modules/sockjs": {
      "version": "0.3.24",
      "resolved": "https://registry.npmjs.org/sockjs/-/sockjs-0.3.24.tgz",
      "integrity": "sha512-GJgLTZ7vYb/JtPSSZ10hsOYIvEYsjbNU+zPdIHcUaWVNUEPivzxku31865sSSud0Da0W4lEeOPlmw93zLQchuQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "faye-websocket": "^0.11.3",
        "uuid": "^8.3.2",
        "websocket-driver": "^0.7.4"
      }
    },
    "node_modules/socks": {
      "version": "2.8.7",
      "resolved": "https://registry.npmjs.org/socks/-/socks-2.8.7.tgz",
      "integrity": "sha512-HLpt+uLy/pxB+bum/9DzAgiKS8CX1EvbWxI4zlmgGCExImLdiad2iCwXT5Z4c9c3Eq8rP2318mPW2c+QbtjK8A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ip-address": "^10.0.1",
        "smart-buffer": "^4.2.0"
      },
      "engines": {
        "node": ">= 10.0.0",
        "npm": ">= 3.0.0"
      }
    },
    "node_modules/socks-proxy-agent": {
      "version": "8.0.5",
      "resolved": "https://registry.npmjs.org/socks-proxy-agent/-/socks-proxy-agent-8.0.5.tgz",
      "integrity": "sha512-HehCEsotFqbPW9sJ8WVYB6UbmIMv7kUUORIF2Nncq4VQvBfNBLibW9YZR5dlYCSUhwcD628pRllm7n+E+YTzJw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "agent-base": "^7.1.2",
        "debug": "^4.3.4",
        "socks": "^2.8.3"
      },
      "engines": {
        "node": ">= 14"
      }
    },
    "node_modules/source-map": {
      "version": "0.7.6",
      "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.7.6.tgz",
      "integrity": "sha512-i5uvt8C3ikiWeNZSVZNWcfZPItFQOsYTUAOkcUPGd8DqDy1uOUikjt5dG+uRlwyvR108Fb9DOd4GvXfT0N2/uQ==",
      "dev": true,
      "license": "BSD-3-Clause",
      "engines": {
        "node": ">= 12"
      }
    },
    "node_modules/source-map-js": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/source-map-js/-/source-map-js-1.2.1.tgz",
      "integrity": "sha512-UXWMKhLOwVKb728IUtQPXxfYU+usdybtUrK/8uGE8CQMvrhOpwvzDBwj0QhSL7MQc7vIsISBG8VQ8+IDQxpfQA==",
      "dev": true,
      "license": "BSD-3-Clause",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/source-map-loader": {
      "version": "5.0.0",
      "resolved": "https://registry.npmjs.org/source-map-loader/-/source-map-loader-5.0.0.tgz",
      "integrity": "sha512-k2Dur7CbSLcAH73sBcIkV5xjPV4SzqO1NJ7+XaQl8if3VODDUj3FNchNGpqgJSKbvUfJuhVdv8K2Eu8/TNl2eA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "iconv-lite": "^0.6.3",
        "source-map-js": "^1.0.2"
      },
      "engines": {
        "node": ">= 18.12.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/webpack"
      },
      "peerDependencies": {
        "webpack": "^5.72.1"
      }
    },
    "node_modules/source-map-loader/node_modules/iconv-lite": {
      "version": "0.6.3",
      "resolved": "https://registry.npmjs.org/iconv-lite/-/iconv-lite-0.6.3.tgz",
      "integrity": "sha512-4fCk79wshMdzMp2rH06qWrJE4iolqLhCUH+OiuIgU++RB0+94NlDL81atO7GX55uUKueo0txHNtvEyI6D7WdMw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "safer-buffer": ">= 2.1.2 < 3.0.0"
      },
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/source-map-support": {
      "version": "0.5.21",
      "resolved": "https://registry.npmjs.org/source-map-support/-/source-map-support-0.5.21.tgz",
      "integrity": "sha512-uBHU3L3czsIyYXKX88fdrGovxdSCoTGDRZ6SYXtSRxLZUzHg5P/66Ht6uoUlHu9EZod+inXhKo3qQgwXUT/y1w==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "buffer-from": "^1.0.0",
        "source-map": "^0.6.0"
      }
    },
    "node_modules/source-map-support/node_modules/source-map": {
      "version": "0.6.1",
      "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.6.1.tgz",
      "integrity": "sha512-UjgapumWlbMhkBgzT7Ykc5YXUT46F0iKu8SGXq0bcwP5dz/h0Plj6enJqjz1Zbq2l5WaqYnrVbwWOWMyF3F47g==",
      "dev": true,
      "license": "BSD-3-Clause",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/spdx-correct": {
      "version": "3.2.0",
      "resolved": "https://registry.npmjs.org/spdx-correct/-/spdx-correct-3.2.0.tgz",
      "integrity": "sha512-kN9dJbvnySHULIluDHy32WHRUu3Og7B9sbY7tsFLctQkIqnMh3hErYgdMjTYuqmcXX+lK5T1lnUt3G7zNswmZA==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "spdx-expression-parse": "^3.0.0",
        "spdx-license-ids": "^3.0.0"
      }
    },
    "node_modules/spdx-exceptions": {
      "version": "2.5.0",
      "resolved": "https://registry.npmjs.org/spdx-exceptions/-/spdx-exceptions-2.5.0.tgz",
      "integrity": "sha512-PiU42r+xO4UbUS1buo3LPJkjlO7430Xn5SVAhdpzzsPHsjbYVflnnFdATgabnLude+Cqu25p6N+g2lw/PFsa4w==",
      "dev": true,
      "license": "CC-BY-3.0"
    },
    "node_modules/spdx-expression-parse": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/spdx-expression-parse/-/spdx-expression-parse-3.0.1.tgz",
      "integrity": "sha512-cbqHunsQWnJNE6KhVSMsMeH5H/L9EpymbzqTQ3uLwNCLZ1Q481oWaofqH7nO6V07xlXwY6PhQdQ2IedWx/ZK4Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "spdx-exceptions": "^2.1.0",
        "spdx-license-ids": "^3.0.0"
      }
    },
    "node_modules/spdx-license-ids": {
      "version": "3.0.22",
      "resolved": "https://registry.npmjs.org/spdx-license-ids/-/spdx-license-ids-3.0.22.tgz",
      "integrity": "sha512-4PRT4nh1EImPbt2jASOKHX7PB7I+e4IWNLvkKFDxNhJlfjbYlleYQh285Z/3mPTHSAK/AvdMmw5BNNuYH8ShgQ==",
      "dev": true,
      "license": "CC0-1.0"
    },
    "node_modules/spdy": {
      "version": "4.0.2",
      "resolved": "https://registry.npmjs.org/spdy/-/spdy-4.0.2.tgz",
      "integrity": "sha512-r46gZQZQV+Kl9oItvl1JZZqJKGr+oEkB08A6BzkiR7593/7IbtuncXHd2YoYeTsG4157ZssMu9KYvUHLcjcDoA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "debug": "^4.1.0",
        "handle-thing": "^2.0.0",
        "http-deceiver": "^1.2.7",
        "select-hose": "^2.0.0",
        "spdy-transport": "^3.0.0"
      },
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/spdy-transport": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/spdy-transport/-/spdy-transport-3.0.0.tgz",
      "integrity": "sha512-hsLVFE5SjA6TCisWeJXFKniGGOpBgMLmerfO2aCyCU5s7nJ/rpAepqmFifv/GCbSbueEeAJJnmSQ2rKC/g8Fcw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "debug": "^4.1.0",
        "detect-node": "^2.0.4",
        "hpack.js": "^2.1.6",
        "obuf": "^1.1.2",
        "readable-stream": "^3.0.6",
        "wbuf": "^1.7.3"
      }
    },
    "node_modules/ssri": {
      "version": "12.0.0",
      "resolved": "https://registry.npmjs.org/ssri/-/ssri-12.0.0.tgz",
      "integrity": "sha512-S7iGNosepx9RadX82oimUkvr0Ct7IjJbEbs4mJcTxst8um95J3sDYU1RBEOvdu6oL1Wek2ODI5i4MAw+dZ6cAQ==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "minipass": "^7.0.3"
      },
      "engines": {
        "node": "^18.17.0 || >=20.5.0"
      }
    },
    "node_modules/statuses": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/statuses/-/statuses-2.0.1.tgz",
      "integrity": "sha512-RwNA9Z/7PrK06rYLIzFMlaF+l73iwpzsqRIFgbMLbTcLD6cOao82TaWefPXQvB2fOC4AjuYSEndS7N/mTCbkdQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/stdin-discarder": {
      "version": "0.2.2",
      "resolved": "https://registry.npmjs.org/stdin-discarder/-/stdin-discarder-0.2.2.tgz",
      "integrity": "sha512-UhDfHmA92YAlNnCfhmq0VeNL5bDbiZGg7sZ2IvPsXubGkiNa9EC+tUTsjBRsYUAz87btI6/1wf4XoVvQ3uRnmQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/streamroller": {
      "version": "3.1.5",
      "resolved": "https://registry.npmjs.org/streamroller/-/streamroller-3.1.5.tgz",
      "integrity": "sha512-KFxaM7XT+irxvdqSP1LGLgNWbYN7ay5owZ3r/8t77p+EtSUAfUgtl7be3xtqtOmGUl9K9YPO2ca8133RlTjvKw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "date-format": "^4.0.14",
        "debug": "^4.3.4",
        "fs-extra": "^8.1.0"
      },
      "engines": {
        "node": ">=8.0"
      }
    },
    "node_modules/string_decoder": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/string_decoder/-/string_decoder-1.3.0.tgz",
      "integrity": "sha512-hkRX8U1WjJFd8LsDJ2yQ/wWWxaopEsABU1XfkM8A+j0+85JAGppt16cr1Whg6KIbb4okU6Mql6BOj+uup/wKeA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "safe-buffer": "~5.2.0"
      }
    },
    "node_modules/string-width": {
      "version": "7.2.0",
      "resolved": "https://registry.npmjs.org/string-width/-/string-width-7.2.0.tgz",
      "integrity": "sha512-tsaTIkKW9b4N+AEj+SVA+WhJzV7/zMhcSu78mLKWSk7cXMOSHsBKFWUs0fWwq8QyK3MgJBQRX6Gbi4kYbdvGkQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "emoji-regex": "^10.3.0",
        "get-east-asian-width": "^1.0.0",
        "strip-ansi": "^7.1.0"
      },
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/string-width-cjs": {
      "name": "string-width",
      "version": "4.2.3",
      "resolved": "https://registry.npmjs.org/string-width/-/string-width-4.2.3.tgz",
      "integrity": "sha512-wKyQRQpjJ0sIp62ErSZdGsjMJWsap5oRNihHhu6G7JVO/9jIB6UyevL+tXuOqrng8j/cxKTWyWUwvSTriiZz/g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "emoji-regex": "^8.0.0",
        "is-fullwidth-code-point": "^3.0.0",
        "strip-ansi": "^6.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/string-width-cjs/node_modules/ansi-regex": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-5.0.1.tgz",
      "integrity": "sha512-quJQXlTSUGL2LH9SUXo8VwsY4soanhgo6LNSm84E1LBcE8s3O0wpdiRzyR9z/ZZJMlMWv37qOOb9pdJlMUEKFQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/string-width-cjs/node_modules/emoji-regex": {
      "version": "8.0.0",
      "resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-8.0.0.tgz",
      "integrity": "sha512-MSjYzcWNOA0ewAHpz0MxpYFvwg6yjy1NG3xteoqz644VCo/RPgnr1/GGt+ic3iJTzQ8Eu3TdM14SawnVUmGE6A==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/string-width-cjs/node_modules/is-fullwidth-code-point": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/is-fullwidth-code-point/-/is-fullwidth-code-point-3.0.0.tgz",
      "integrity": "sha512-zymm5+u+sCsSWyD9qNaejV3DFvhCKclKdizYaJUuHA83RLjb7nSuGnddCHGv0hk+KY7BMAlsWeK4Ueg6EV6XQg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/string-width-cjs/node_modules/strip-ansi": {
      "version": "6.0.1",
      "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-6.0.1.tgz",
      "integrity": "sha512-Y38VPSHcqkFrCpFnQ9vuSXmquuv5oXOKpGeT6aGrr3o3Gc9AlVa6JBfUSOCnbxGGZF+/0ooI7KrPuUSztUdU5A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ansi-regex": "^5.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/strip-ansi": {
      "version": "7.1.2",
      "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-7.1.2.tgz",
      "integrity": "sha512-gmBGslpoQJtgnMAvOVqGZpEz9dyoKTCzy2nfz/n8aIFhN/jCE/rCmcxabB6jOOHV+0WNnylOxaxBQPSvcWklhA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ansi-regex": "^6.0.1"
      },
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/chalk/strip-ansi?sponsor=1"
      }
    },
    "node_modules/strip-ansi-cjs": {
      "name": "strip-ansi",
      "version": "6.0.1",
      "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-6.0.1.tgz",
      "integrity": "sha512-Y38VPSHcqkFrCpFnQ9vuSXmquuv5oXOKpGeT6aGrr3o3Gc9AlVa6JBfUSOCnbxGGZF+/0ooI7KrPuUSztUdU5A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ansi-regex": "^5.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/strip-ansi-cjs/node_modules/ansi-regex": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-5.0.1.tgz",
      "integrity": "sha512-quJQXlTSUGL2LH9SUXo8VwsY4soanhgo6LNSm84E1LBcE8s3O0wpdiRzyR9z/ZZJMlMWv37qOOb9pdJlMUEKFQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/supports-color": {
      "version": "7.2.0",
      "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-7.2.0.tgz",
      "integrity": "sha512-qpCAvRl9stuOHveKsn7HncJRvv501qIacKzQlO/+Lwxc9+0q2wLyv4Dfvt80/DPn2pqOBsJdDiogXGR9+OvwRw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "has-flag": "^4.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/supports-preserve-symlinks-flag": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/supports-preserve-symlinks-flag/-/supports-preserve-symlinks-flag-1.0.0.tgz",
      "integrity": "sha512-ot0WnXS9fgdkgIcePe6RHNk1WA8+muPa6cSjeR3V8K27q9BB1rTE3R1p7Hv0z1ZyAc8s6Vvv8DIyWf681MAt0w==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/tapable": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/tapable/-/tapable-2.3.0.tgz",
      "integrity": "sha512-g9ljZiwki/LfxmQADO3dEY1CbpmXT5Hm2fJ+QaGKwSXUylMybePR7/67YW7jOrrvjEgL1Fmz5kzyAjWVWLlucg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/webpack"
      }
    },
    "node_modules/tar": {
      "version": "6.2.1",
      "resolved": "https://registry.npmjs.org/tar/-/tar-6.2.1.tgz",
      "integrity": "sha512-DZ4yORTwrbTj/7MZYq2w+/ZFdI6OZ/f9SFHR+71gIVUZhOQPHzVCLpvRnPgyaMpfWxxk/4ONva3GQSyNIKRv6A==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "chownr": "^2.0.0",
        "fs-minipass": "^2.0.0",
        "minipass": "^5.0.0",
        "minizlib": "^2.1.1",
        "mkdirp": "^1.0.3",
        "yallist": "^4.0.0"
      },
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/tar/node_modules/fs-minipass": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/fs-minipass/-/fs-minipass-2.1.0.tgz",
      "integrity": "sha512-V/JgOLFCS+R6Vcq0slCuaeWEdNC3ouDlJMNIsacH2VtALiu9mV4LPrHc5cDl8k5aw6J8jwgWWpiTo5RYhmIzvg==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "minipass": "^3.0.0"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/tar/node_modules/fs-minipass/node_modules/minipass": {
      "version": "3.3.6",
      "resolved": "https://registry.npmjs.org/minipass/-/minipass-3.3.6.tgz",
      "integrity": "sha512-DxiNidxSEK+tHG6zOIklvNOwm3hvCrbUrdtzY74U6HKTJxvIDfOUL5W5P2Ghd3DTkhhKPYGqeNUIh5qcM4YBfw==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "yallist": "^4.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/tar/node_modules/minipass": {
      "version": "5.0.0",
      "resolved": "https://registry.npmjs.org/minipass/-/minipass-5.0.0.tgz",
      "integrity": "sha512-3FnjYuehv9k6ovOEbyOswadCDPX1piCfhV8ncmYtHOjuPwylVWsghTLo7rabjC3Rx5xD4HDx8Wm1xnMF7S5qFQ==",
      "dev": true,
      "license": "ISC",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/tar/node_modules/minizlib": {
      "version": "2.1.2",
      "resolved": "https://registry.npmjs.org/minizlib/-/minizlib-2.1.2.tgz",
      "integrity": "sha512-bAxsR8BVfj60DWXHE3u30oHzfl4G7khkSuPW+qvpd7jFRHm7dLxOjUk1EHACJ/hxLY8phGJ0YhYHZo7jil7Qdg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "minipass": "^3.0.0",
        "yallist": "^4.0.0"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/tar/node_modules/minizlib/node_modules/minipass": {
      "version": "3.3.6",
      "resolved": "https://registry.npmjs.org/minipass/-/minipass-3.3.6.tgz",
      "integrity": "sha512-DxiNidxSEK+tHG6zOIklvNOwm3hvCrbUrdtzY74U6HKTJxvIDfOUL5W5P2Ghd3DTkhhKPYGqeNUIh5qcM4YBfw==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "yallist": "^4.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/tar/node_modules/mkdirp": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/mkdirp/-/mkdirp-1.0.4.tgz",
      "integrity": "sha512-vVqVZQyf3WLx2Shd0qJ9xuvqgAyKPLAiqITEtqW0oIUjzo3PePDd6fW9iFz30ef7Ysp/oiWqbhszeGWW2T6Gzw==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "mkdirp": "bin/cmd.js"
      },
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/tar/node_modules/yallist": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/yallist/-/yallist-4.0.0.tgz",
      "integrity": "sha512-3wdGidZyq5PB084XLES5TpOSRA3wjXAlIWMhum2kRcv/41Sn2emQ0dycQW4uZXLejwKvg6EsvbdlVL+FYEct7A==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/terser": {
      "version": "5.43.1",
      "resolved": "https://registry.npmjs.org/terser/-/terser-5.43.1.tgz",
      "integrity": "sha512-+6erLbBm0+LROX2sPXlUYx/ux5PyE9K/a92Wrt6oA+WDAoFTdpHE5tCYCI5PNzq2y8df4rA+QgHLJuR4jNymsg==",
      "dev": true,
      "license": "BSD-2-Clause",
      "dependencies": {
        "@jridgewell/source-map": "^0.3.3",
        "acorn": "^8.14.0",
        "commander": "^2.20.0",
        "source-map-support": "~0.5.20"
      },
      "bin": {
        "terser": "bin/terser"
      },
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/terser-webpack-plugin": {
      "version": "5.3.14",
      "resolved": "https://registry.npmjs.org/terser-webpack-plugin/-/terser-webpack-plugin-5.3.14.tgz",
      "integrity": "sha512-vkZjpUjb6OMS7dhV+tILUW6BhpDR7P2L/aQSAv+Uwk+m8KATX9EccViHTJR2qDtACKPIYndLGCyl3FMo+r2LMw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/trace-mapping": "^0.3.25",
        "jest-worker": "^27.4.5",
        "schema-utils": "^4.3.0",
        "serialize-javascript": "^6.0.2",
        "terser": "^5.31.1"
      },
      "engines": {
        "node": ">= 10.13.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/webpack"
      },
      "peerDependencies": {
        "webpack": "^5.1.0"
      },
      "peerDependenciesMeta": {
        "@swc/core": {
          "optional": true
        },
        "esbuild": {
          "optional": true
        },
        "uglify-js": {
          "optional": true
        }
      }
    },
    "node_modules/thingies": {
      "version": "2.5.0",
      "resolved": "https://registry.npmjs.org/thingies/-/thingies-2.5.0.tgz",
      "integrity": "sha512-s+2Bwztg6PhWUD7XMfeYm5qliDdSiZm7M7n8KjTkIsm3l/2lgVRc2/Gx/v+ZX8lT4FMA+i8aQvhcWylldc+ZNw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=10.18"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/streamich"
      },
      "peerDependencies": {
        "tslib": "^2"
      }
    },
    "node_modules/thunky": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/thunky/-/thunky-1.1.0.tgz",
      "integrity": "sha512-eHY7nBftgThBqOyHGVN+l8gF0BucP09fMo0oO/Lb0w1OF80dJv+lDVpXG60WMQvkcxAkNybKsrEIE3ZtKGmPrA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/tinyglobby": {
      "version": "0.2.14",
      "resolved": "https://registry.npmjs.org/tinyglobby/-/tinyglobby-0.2.14.tgz",
      "integrity": "sha512-tX5e7OM1HnYr2+a2C/4V0htOcSQcoSTH9KgJnVvNm5zm/cyEWKJ7j7YutsH9CxMdtOkkLFy2AHrMci9IM8IPZQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "fdir": "^6.4.4",
        "picomatch": "^4.0.2"
      },
      "engines": {
        "node": ">=12.0.0"
      },
      "funding": {
        "url": "https://github.com/sponsors/SuperchupuDev"
      }
    },
    "node_modules/tmp": {
      "version": "0.2.5",
      "resolved": "https://registry.npmjs.org/tmp/-/tmp-0.2.5.tgz",
      "integrity": "sha512-voyz6MApa1rQGUxT3E+BK7/ROe8itEx7vD8/HEvt4xwXucvQ5G5oeEiHkmHZJuBO21RpOf+YYm9MOivj709jow==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=14.14"
      }
    },
    "node_modules/to-regex-range": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/to-regex-range/-/to-regex-range-5.0.1.tgz",
      "integrity": "sha512-65P7iz6X5yEr1cwcgvQxbbIw7Uk3gOy5dIdtZ4rDveLqhrdJP+Li/Hx6tyK0NEb+2GCyneCMJiGqrADCSNk8sQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "is-number": "^7.0.0"
      },
      "engines": {
        "node": ">=8.0"
      }
    },
    "node_modules/toidentifier": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/toidentifier/-/toidentifier-1.0.1.tgz",
      "integrity": "sha512-o5sSPKEkg/DIQNmH43V0/uerLrpzVedkUh8tGNvaeXpfpuwjKenlSox/2O/BTlZUtEe+JG7s5YhEz608PlAHRA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.6"
      }
    },
    "node_modules/tree-dump": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/tree-dump/-/tree-dump-1.1.0.tgz",
      "integrity": "sha512-rMuvhU4MCDbcbnleZTFezWsaZXRFemSqAM+7jPnzUl1fo9w3YEKOxAeui0fz3OI4EU4hf23iyA7uQRVko+UaBA==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": ">=10.0"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/streamich"
      },
      "peerDependencies": {
        "tslib": "2"
      }
    },
    "node_modules/tree-kill": {
      "version": "1.2.2",
      "resolved": "https://registry.npmjs.org/tree-kill/-/tree-kill-1.2.2.tgz",
      "integrity": "sha512-L0Orpi8qGpRG//Nd+H90vFB+3iHnue1zSSGmNOOCh1GLJ7rUKVwV2HvijphGQS2UmhUZewS9VgvxYIdgr+fG1A==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "tree-kill": "cli.js"
      }
    },
    "node_modules/tslib": {
      "version": "2.8.1",
      "resolved": "https://registry.npmjs.org/tslib/-/tslib-2.8.1.tgz",
      "integrity": "sha512-oJFu94HQb+KVduSUQL7wnpmqnfmLsOA/nAh6b6EH0wCEoK0/mPeXU6c3wKDV83MkOuHPRHtSXKKU99IBazS/2w==",
      "license": "0BSD"
    },
    "node_modules/tuf-js": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/tuf-js/-/tuf-js-3.1.0.tgz",
      "integrity": "sha512-3T3T04WzowbwV2FDiGXBbr81t64g1MUGGJRgT4x5o97N+8ArdhVCAF9IxFrxuSJmM3E5Asn7nKHkao0ibcZXAg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@tufjs/models": "3.0.1",
        "debug": "^4.4.1",
        "make-fetch-happen": "^14.0.3"
      },
      "engines": {
        "node": "^18.17.0 || >=20.5.0"
      }
    },
    "node_modules/type-is": {
      "version": "1.6.18",
      "resolved": "https://registry.npmjs.org/type-is/-/type-is-1.6.18.tgz",
      "integrity": "sha512-TkRKr9sUTxEH8MdfuCSP7VizJyzRNMjj2J2do2Jr3Kym598JVdEksuzPQCnlFPW4ky9Q+iA+ma9BGm06XQBy8g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "media-typer": "0.3.0",
        "mime-types": "~2.1.24"
      },
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/typed-assert": {
      "version": "1.0.9",
      "resolved": "https://registry.npmjs.org/typed-assert/-/typed-assert-1.0.9.tgz",
      "integrity": "sha512-KNNZtayBCtmnNmbo5mG47p1XsCyrx6iVqomjcZnec/1Y5GGARaxPs6r49RnSPeUP3YjNYiU9sQHAtY4BBvnZwg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/typescript": {
      "version": "5.9.3",
      "resolved": "https://registry.npmjs.org/typescript/-/typescript-5.9.3.tgz",
      "integrity": "sha512-jl1vZzPDinLr9eUt3J/t7V6FgNEw9QjvBPdysz9KfQDD41fQrC2Y4vKQdiaUpFT4bXlb1RHhLpp8wtm6M5TgSw==",
      "dev": true,
      "license": "Apache-2.0",
      "bin": {
        "tsc": "bin/tsc",
        "tsserver": "bin/tsserver"
      },
      "engines": {
        "node": ">=14.17"
      }
    },
    "node_modules/ua-parser-js": {
      "version": "0.7.41",
      "resolved": "https://registry.npmjs.org/ua-parser-js/-/ua-parser-js-0.7.41.tgz",
      "integrity": "sha512-O3oYyCMPYgNNHuO7Jjk3uacJWZF8loBgwrfd/5LE/HyZ3lUIOdniQ7DNXJcIgZbwioZxk0fLfI4EVnetdiX5jg==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/ua-parser-js"
        },
        {
          "type": "paypal",
          "url": "https://paypal.me/faisalman"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/faisalman"
        }
      ],
      "license": "MIT",
      "bin": {
        "ua-parser-js": "script/cli.js"
      },
      "engines": {
        "node": "*"
      }
    },
    "node_modules/undici-types": {
      "version": "7.16.0",
      "resolved": "https://registry.npmjs.org/undici-types/-/undici-types-7.16.0.tgz",
      "integrity": "sha512-Zz+aZWSj8LE6zoxD+xrjh4VfkIG8Ya6LvYkZqtUQGJPZjYl53ypCaUwWqo7eI0x66KBGeRo+mlBEkMSeSZ38Nw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/unicode-canonical-property-names-ecmascript": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/unicode-canonical-property-names-ecmascript/-/unicode-canonical-property-names-ecmascript-2.0.1.tgz",
      "integrity": "sha512-dA8WbNeb2a6oQzAQ55YlT5vQAWGV9WXOsi3SskE3bcCdM0P4SDd+24zS/OCacdRq5BkdsRj9q3Pg6YyQoxIGqg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/unicode-match-property-ecmascript": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/unicode-match-property-ecmascript/-/unicode-match-property-ecmascript-2.0.0.tgz",
      "integrity": "sha512-5kaZCrbp5mmbz5ulBkDkbY0SsPOjKqVS35VpL9ulMPfSl0J0Xsm+9Evphv9CoIZFwre7aJoa94AY6seMKGVN5Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "unicode-canonical-property-names-ecmascript": "^2.0.0",
        "unicode-property-aliases-ecmascript": "^2.0.0"
      },
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/unicode-match-property-value-ecmascript": {
      "version": "2.2.1",
      "resolved": "https://registry.npmjs.org/unicode-match-property-value-ecmascript/-/unicode-match-property-value-ecmascript-2.2.1.tgz",
      "integrity": "sha512-JQ84qTuMg4nVkx8ga4A16a1epI9H6uTXAknqxkGF/aFfRLw1xC/Bp24HNLaZhHSkWd3+84t8iXnp1J0kYcZHhg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/unicode-property-aliases-ecmascript": {
      "version": "2.2.0",
      "resolved": "https://registry.npmjs.org/unicode-property-aliases-ecmascript/-/unicode-property-aliases-ecmascript-2.2.0.tgz",
      "integrity": "sha512-hpbDzxUY9BFwX+UeBnxv3Sh1q7HFxj48DTmXchNgRa46lO8uj3/1iEn3MiNUYTg1g9ctIqXCCERn8gYZhHC5lQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/unique-filename": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/unique-filename/-/unique-filename-4.0.0.tgz",
      "integrity": "sha512-XSnEewXmQ+veP7xX2dS5Q4yZAvO40cBN2MWkJ7D/6sW4Dg6wYBNwM1Vrnz1FhH5AdeLIlUXRI9e28z1YZi71NQ==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "unique-slug": "^5.0.0"
      },
      "engines": {
        "node": "^18.17.0 || >=20.5.0"
      }
    },
    "node_modules/unique-slug": {
      "version": "5.0.0",
      "resolved": "https://registry.npmjs.org/unique-slug/-/unique-slug-5.0.0.tgz",
      "integrity": "sha512-9OdaqO5kwqR+1kVgHAhsp5vPNU0hnxRa26rBFNfNgM7M6pNtgzeBn3s/xbyCQL3dcjzOatcef6UUHpB/6MaETg==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "imurmurhash": "^0.1.4"
      },
      "engines": {
        "node": "^18.17.0 || >=20.5.0"
      }
    },
    "node_modules/universalify": {
      "version": "0.1.2",
      "resolved": "https://registry.npmjs.org/universalify/-/universalify-0.1.2.tgz",
      "integrity": "sha512-rBJeI5CXAlmy1pV+617WB9J63U6XcazHHF2f2dbJix4XzpUF0RS3Zbj0FGIOCAva5P/d/GBOYaACQ1w+0azUkg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 4.0.0"
      }
    },
    "node_modules/unpipe": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/unpipe/-/unpipe-1.0.0.tgz",
      "integrity": "sha512-pjy2bYhSsufwWlKwPc+l3cN7+wuJlK6uz0YdJEOlQDbl6jo/YlPi4mb8agUkVC8BF7V8NuzeyPNqRksA3hztKQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/update-browserslist-db": {
      "version": "1.1.3",
      "resolved": "https://registry.npmjs.org/update-browserslist-db/-/update-browserslist-db-1.1.3.tgz",
      "integrity": "sha512-UxhIZQ+QInVdunkDAaiazvvT/+fXL5Osr0JZlJulepYu6Jd7qJtDZjlur0emRlT71EN3ScPoE7gvsuIKKNavKw==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/browserslist"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "escalade": "^3.2.0",
        "picocolors": "^1.1.1"
      },
      "bin": {
        "update-browserslist-db": "cli.js"
      },
      "peerDependencies": {
        "browserslist": ">= 4.21.0"
      }
    },
    "node_modules/uri-js": {
      "version": "4.4.1",
      "resolved": "https://registry.npmjs.org/uri-js/-/uri-js-4.4.1.tgz",
      "integrity": "sha512-7rKUyy33Q1yc98pQ1DAmLtwX109F7TIfWlW1Ydo8Wl1ii1SeHieeh0HHfPeL2fMXK6z0s8ecKs9frCuLJvndBg==",
      "dev": true,
      "license": "BSD-2-Clause",
      "dependencies": {
        "punycode": "^2.1.0"
      }
    },
    "node_modules/uri-js/node_modules/punycode": {
      "version": "2.3.1",
      "resolved": "https://registry.npmjs.org/punycode/-/punycode-2.3.1.tgz",
      "integrity": "sha512-vYt7UD1U9Wg6138shLtLOvdAu+8DsC/ilFtEVHcH+wydcSpNE20AfSOduf6MkRFahL5FY7X1oU7nKVZFtfq8Fg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/util-deprecate": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/util-deprecate/-/util-deprecate-1.0.2.tgz",
      "integrity": "sha512-EPD5q1uXyFxJpCrLnCc1nHnq3gOa6DZBocAIiI2TaSCA7VCJ1UJDMagCzIkXNsUYfD1daK//LTEQ8xiIbrHtcw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/utils-merge": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/utils-merge/-/utils-merge-1.0.1.tgz",
      "integrity": "sha512-pMZTvIkT1d+TFGvDOqodOclx0QWkkgi6Tdoa8gC8ffGAAqz9pzPTZWAybbsHHoED/ztMtkv/VoYTYyShUn81hA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4.0"
      }
    },
    "node_modules/uuid": {
      "version": "8.3.2",
      "resolved": "https://registry.npmjs.org/uuid/-/uuid-8.3.2.tgz",
      "integrity": "sha512-+NYs2QeMWy+GWFOEm9xnn6HCDp0l7QBD7ml8zLUmJ+93Q5NF0NocErnwkTkXVFNiX3/fpC6afS8Dhb/gz7R7eg==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "uuid": "dist/bin/uuid"
      }
    },
    "node_modules/validate-npm-package-license": {
      "version": "3.0.4",
      "resolved": "https://registry.npmjs.org/validate-npm-package-license/-/validate-npm-package-license-3.0.4.tgz",
      "integrity": "sha512-DpKm2Ui/xN7/HQKCtpZxoRWBhZ9Z0kqtygG8XCgNQ8ZlDnxuQmWhj566j8fN4Cu3/JmbhsDo7fcAJq4s9h27Ew==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "spdx-correct": "^3.0.0",
        "spdx-expression-parse": "^3.0.0"
      }
    },
    "node_modules/validate-npm-package-name": {
      "version": "6.0.2",
      "resolved": "https://registry.npmjs.org/validate-npm-package-name/-/validate-npm-package-name-6.0.2.tgz",
      "integrity": "sha512-IUoow1YUtvoBBC06dXs8bR8B9vuA3aJfmQNKMoaPG/OFsPmoQvw8xh+6Ye25Gx9DQhoEom3Pcu9MKHerm/NpUQ==",
      "dev": true,
      "license": "ISC",
      "engines": {
        "node": "^18.17.0 || >=20.5.0"
      }
    },
    "node_modules/vary": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/vary/-/vary-1.1.2.tgz",
      "integrity": "sha512-BNGbWLfd0eUPabhkXUVm0j8uuvREyTh5ovRa/dyow/BqAbZJyC+5fU+IzQOzmAKzYqYRAISoRhdQr3eIZ/PXqg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/vite": {
      "version": "7.1.5",
      "resolved": "https://registry.npmjs.org/vite/-/vite-7.1.5.tgz",
      "integrity": "sha512-4cKBO9wR75r0BeIWWWId9XK9Lj6La5X846Zw9dFfzMRw38IlTk2iCcUt6hsyiDRcPidc55ZParFYDXi0nXOeLQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "esbuild": "^0.25.0",
        "fdir": "^6.5.0",
        "picomatch": "^4.0.3",
        "postcss": "^8.5.6",
        "rollup": "^4.43.0",
        "tinyglobby": "^0.2.15"
      },
      "bin": {
        "vite": "bin/vite.js"
      },
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      },
      "funding": {
        "url": "https://github.com/vitejs/vite?sponsor=1"
      },
      "optionalDependencies": {
        "fsevents": "~2.3.3"
      },
      "peerDependencies": {
        "@types/node": "^20.19.0 || >=22.12.0",
        "jiti": ">=1.21.0",
        "less": "^4.0.0",
        "lightningcss": "^1.21.0",
        "sass": "^1.70.0",
        "sass-embedded": "^1.70.0",
        "stylus": ">=0.54.8",
        "sugarss": "^5.0.0",
        "terser": "^5.16.0",
        "tsx": "^4.8.1",
        "yaml": "^2.4.2"
      },
      "peerDependenciesMeta": {
        "@types/node": {
          "optional": true
        },
        "jiti": {
          "optional": true
        },
        "less": {
          "optional": true
        },
        "lightningcss": {
          "optional": true
        },
        "sass": {
          "optional": true
        },
        "sass-embedded": {
          "optional": true
        },
        "stylus": {
          "optional": true
        },
        "sugarss": {
          "optional": true
        },
        "terser": {
          "optional": true
        },
        "tsx": {
          "optional": true
        },
        "yaml": {
          "optional": true
        }
      }
    },
    "node_modules/vite/node_modules/tinyglobby": {
      "version": "0.2.15",
      "resolved": "https://registry.npmjs.org/tinyglobby/-/tinyglobby-0.2.15.tgz",
      "integrity": "sha512-j2Zq4NyQYG5XMST4cbs02Ak8iJUdxRM0XI5QyxXuZOzKOINmWurp3smXu3y5wDcJrptwpSjgXHzIQxR0omXljQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "fdir": "^6.5.0",
        "picomatch": "^4.0.3"
      },
      "engines": {
        "node": ">=12.0.0"
      },
      "funding": {
        "url": "https://github.com/sponsors/SuperchupuDev"
      }
    },
    "node_modules/void-elements": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/void-elements/-/void-elements-2.0.1.tgz",
      "integrity": "sha512-qZKX4RnBzH2ugr8Lxa7x+0V6XD9Sb/ouARtiasEQCHB1EVU4NXtmHsDDrx1dO4ne5fc3J6EW05BP1Dl0z0iung==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/watchpack": {
      "version": "2.4.4",
      "resolved": "https://registry.npmjs.org/watchpack/-/watchpack-2.4.4.tgz",
      "integrity": "sha512-c5EGNOiyxxV5qmTtAB7rbiXxi1ooX1pQKMLX/MIabJjRA0SJBQOjKF+KSVfHkr9U1cADPon0mRiVe/riyaiDUA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "glob-to-regexp": "^0.4.1",
        "graceful-fs": "^4.1.2"
      },
      "engines": {
        "node": ">=10.13.0"
      }
    },
    "node_modules/wbuf": {
      "version": "1.7.3",
      "resolved": "https://registry.npmjs.org/wbuf/-/wbuf-1.7.3.tgz",
      "integrity": "sha512-O84QOnr0icsbFGLS0O3bI5FswxzRr8/gHwWkDlQFskhSPryQXvrTMxjxGP4+iWYoauLoBvfDpkrOauZ+0iZpDA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "minimalistic-assert": "^1.0.0"
      }
    },
    "node_modules/weak-lru-cache": {
      "version": "1.2.2",
      "resolved": "https://registry.npmjs.org/weak-lru-cache/-/weak-lru-cache-1.2.2.tgz",
      "integrity": "sha512-DEAoo25RfSYMuTGc9vPJzZcZullwIqRDSI9LOy+fkCJPi6hykCnfKaXTuPBDuXAUcqHXyOgFtHNp/kB2FjYHbw==",
      "dev": true,
      "license": "MIT",
      "optional": true
    },
    "node_modules/webpack": {
      "version": "5.101.2",
      "resolved": "https://registry.npmjs.org/webpack/-/webpack-5.101.2.tgz",
      "integrity": "sha512-4JLXU0tD6OZNVqlwzm3HGEhAHufSiyv+skb7q0d2367VDMzrU1Q/ZeepvkcHH0rZie6uqEtTQQe0OEOOluH3Mg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/eslint-scope": "^3.7.7",
        "@types/estree": "^1.0.8",
        "@types/json-schema": "^7.0.15",
        "@webassemblyjs/ast": "^1.14.1",
        "@webassemblyjs/wasm-edit": "^1.14.1",
        "@webassemblyjs/wasm-parser": "^1.14.1",
        "acorn": "^8.15.0",
        "acorn-import-phases": "^1.0.3",
        "browserslist": "^4.24.0",
        "chrome-trace-event": "^1.0.2",
        "enhanced-resolve": "^5.17.3",
        "es-module-lexer": "^1.2.1",
        "eslint-scope": "5.1.1",
        "events": "^3.2.0",
        "glob-to-regexp": "^0.4.1",
        "graceful-fs": "^4.2.11",
        "json-parse-even-better-errors": "^2.3.1",
        "loader-runner": "^4.2.0",
        "mime-types": "^2.1.27",
        "neo-async": "^2.6.2",
        "schema-utils": "^4.3.2",
        "tapable": "^2.1.1",
        "terser-webpack-plugin": "^5.3.11",
        "watchpack": "^2.4.1",
        "webpack-sources": "^3.3.3"
      },
      "bin": {
        "webpack": "bin/webpack.js"
      },
      "engines": {
        "node": ">=10.13.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/webpack"
      },
      "peerDependenciesMeta": {
        "webpack-cli": {
          "optional": true
        }
      }
    },
    "node_modules/webpack-dev-middleware": {
      "version": "7.4.2",
      "resolved": "https://registry.npmjs.org/webpack-dev-middleware/-/webpack-dev-middleware-7.4.2.tgz",
      "integrity": "sha512-xOO8n6eggxnwYpy1NlzUKpvrjfJTvae5/D6WOK0S2LSo7vjmo5gCM1DbLUmFqrMTJP+W/0YZNctm7jasWvLuBA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "colorette": "^2.0.10",
        "memfs": "^4.6.0",
        "mime-types": "^2.1.31",
        "on-finished": "^2.4.1",
        "range-parser": "^1.2.1",
        "schema-utils": "^4.0.0"
      },
      "engines": {
        "node": ">= 18.12.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/webpack"
      },
      "peerDependencies": {
        "webpack": "^5.0.0"
      },
      "peerDependenciesMeta": {
        "webpack": {
          "optional": true
        }
      }
    },
    "node_modules/webpack-dev-server": {
      "version": "5.2.2",
      "resolved": "https://registry.npmjs.org/webpack-dev-server/-/webpack-dev-server-5.2.2.tgz",
      "integrity": "sha512-QcQ72gh8a+7JO63TAx/6XZf/CWhgMzu5m0QirvPfGvptOusAxG12w2+aua1Jkjr7hzaWDnJ2n6JFeexMHI+Zjg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/bonjour": "^3.5.13",
        "@types/connect-history-api-fallback": "^1.5.4",
        "@types/express": "^4.17.21",
        "@types/express-serve-static-core": "^4.17.21",
        "@types/serve-index": "^1.9.4",
        "@types/serve-static": "^1.15.5",
        "@types/sockjs": "^0.3.36",
        "@types/ws": "^8.5.10",
        "ansi-html-community": "^0.0.8",
        "bonjour-service": "^1.2.1",
        "chokidar": "^3.6.0",
        "colorette": "^2.0.10",
        "compression": "^1.7.4",
        "connect-history-api-fallback": "^2.0.0",
        "express": "^4.21.2",
        "graceful-fs": "^4.2.6",
        "http-proxy-middleware": "^2.0.9",
        "ipaddr.js": "^2.1.0",
        "launch-editor": "^2.6.1",
        "open": "^10.0.3",
        "p-retry": "^6.2.0",
        "schema-utils": "^4.2.0",
        "selfsigned": "^2.4.1",
        "serve-index": "^1.9.1",
        "sockjs": "^0.3.24",
        "spdy": "^4.0.2",
        "webpack-dev-middleware": "^7.4.2",
        "ws": "^8.18.0"
      },
      "bin": {
        "webpack-dev-server": "bin/webpack-dev-server.js"
      },
      "engines": {
        "node": ">= 18.12.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/webpack"
      },
      "peerDependencies": {
        "webpack": "^5.0.0"
      },
      "peerDependenciesMeta": {
        "webpack": {
          "optional": true
        },
        "webpack-cli": {
          "optional": true
        }
      }
    },
    "node_modules/webpack-dev-server/node_modules/chokidar": {
      "version": "3.6.0",
      "resolved": "https://registry.npmjs.org/chokidar/-/chokidar-3.6.0.tgz",
      "integrity": "sha512-7VT13fmjotKpGipCW9JEQAusEPE+Ei8nl6/g4FBAmIm0GOOLMua9NDDo/DWp0ZAxCr3cPq5ZpBqmPAQgDda2Pw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "anymatch": "~3.1.2",
        "braces": "~3.0.2",
        "glob-parent": "~5.1.2",
        "is-binary-path": "~2.1.0",
        "is-glob": "~4.0.1",
        "normalize-path": "~3.0.0",
        "readdirp": "~3.6.0"
      },
      "engines": {
        "node": ">= 8.10.0"
      },
      "funding": {
        "url": "https://paulmillr.com/funding/"
      },
      "optionalDependencies": {
        "fsevents": "~2.3.2"
      }
    },
    "node_modules/webpack-dev-server/node_modules/glob-parent": {
      "version": "5.1.2",
      "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-5.1.2.tgz",
      "integrity": "sha512-AOIgSQCepiJYwP3ARnGx+5VnTu2HBYdzbGP45eLw1vr3zB3vZLeyed1sC9hnbcOc9/SrMyM5RPQrkGz4aS9Zow==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "is-glob": "^4.0.1"
      },
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/webpack-dev-server/node_modules/http-proxy-middleware": {
      "version": "2.0.9",
      "resolved": "https://registry.npmjs.org/http-proxy-middleware/-/http-proxy-middleware-2.0.9.tgz",
      "integrity": "sha512-c1IyJYLYppU574+YI7R4QyX2ystMtVXZwIdzazUIPIJsHuWNd+mho2j+bKoHftndicGj9yh+xjd+l0yj7VeT1Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/http-proxy": "^1.17.8",
        "http-proxy": "^1.18.1",
        "is-glob": "^4.0.1",
        "is-plain-obj": "^3.0.0",
        "micromatch": "^4.0.2"
      },
      "engines": {
        "node": ">=12.0.0"
      },
      "peerDependencies": {
        "@types/express": "^4.17.13"
      },
      "peerDependenciesMeta": {
        "@types/express": {
          "optional": true
        }
      }
    },
    "node_modules/webpack-dev-server/node_modules/ipaddr.js": {
      "version": "2.2.0",
      "resolved": "https://registry.npmjs.org/ipaddr.js/-/ipaddr.js-2.2.0.tgz",
      "integrity": "sha512-Ag3wB2o37wslZS19hZqorUnrnzSkpOVy+IiiDEiTqNubEYpYuHWIf6K4psgN2ZWKExS4xhVCrRVfb/wfW8fWJA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/webpack-dev-server/node_modules/picomatch": {
      "version": "2.3.1",
      "resolved": "https://registry.npmjs.org/picomatch/-/picomatch-2.3.1.tgz",
      "integrity": "sha512-JU3teHTNjmE2VCGFzuY8EXzCDVwEqB2a8fsIvwaStHhAWJEeVd1o1QD80CU6+ZdEXXSLbSsuLwJjkCBWqRQUVA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8.6"
      },
      "funding": {
        "url": "https://github.com/sponsors/jonschlinkert"
      }
    },
    "node_modules/webpack-dev-server/node_modules/readdirp": {
      "version": "3.6.0",
      "resolved": "https://registry.npmjs.org/readdirp/-/readdirp-3.6.0.tgz",
      "integrity": "sha512-hOS089on8RduqdbhvQ5Z37A0ESjsqz6qnRcffsMU3495FuTdqSm+7bhJ29JvIOsBDEEnan5DPu9t3To9VRlMzA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "picomatch": "^2.2.1"
      },
      "engines": {
        "node": ">=8.10.0"
      }
    },
    "node_modules/webpack-dev-server/node_modules/ws": {
      "version": "8.18.3",
      "resolved": "https://registry.npmjs.org/ws/-/ws-8.18.3.tgz",
      "integrity": "sha512-PEIGCY5tSlUt50cqyMXfCzX+oOPqN0vuGqWzbcJ2xvnkzkq46oOpz7dQaTDBdfICb4N14+GARUDw2XV2N4tvzg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=10.0.0"
      },
      "peerDependencies": {
        "bufferutil": "^4.0.1",
        "utf-8-validate": ">=5.0.2"
      },
      "peerDependenciesMeta": {
        "bufferutil": {
          "optional": true
        },
        "utf-8-validate": {
          "optional": true
        }
      }
    },
    "node_modules/webpack-merge": {
      "version": "6.0.1",
      "resolved": "https://registry.npmjs.org/webpack-merge/-/webpack-merge-6.0.1.tgz",
      "integrity": "sha512-hXXvrjtx2PLYx4qruKl+kyRSLc52V+cCvMxRjmKwoA+CBbbF5GfIBtR6kCvl0fYGqTUPKB+1ktVmTHqMOzgCBg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "clone-deep": "^4.0.1",
        "flat": "^5.0.2",
        "wildcard": "^2.0.1"
      },
      "engines": {
        "node": ">=18.0.0"
      }
    },
    "node_modules/webpack-sources": {
      "version": "3.3.3",
      "resolved": "https://registry.npmjs.org/webpack-sources/-/webpack-sources-3.3.3.tgz",
      "integrity": "sha512-yd1RBzSGanHkitROoPFd6qsrxt+oFhg/129YzheDGqeustzX0vTZJZsSsQjVQC4yzBQ56K55XU8gaNCtIzOnTg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=10.13.0"
      }
    },
    "node_modules/webpack-subresource-integrity": {
      "version": "5.1.0",
      "resolved": "https://registry.npmjs.org/webpack-subresource-integrity/-/webpack-subresource-integrity-5.1.0.tgz",
      "integrity": "sha512-sacXoX+xd8r4WKsy9MvH/q/vBtEHr86cpImXwyg74pFIpERKt6FmB8cXpeuh0ZLgclOlHI4Wcll7+R5L02xk9Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "typed-assert": "^1.0.8"
      },
      "engines": {
        "node": ">= 12"
      },
      "peerDependencies": {
        "html-webpack-plugin": ">= 5.0.0-beta.1 < 6",
        "webpack": "^5.12.0"
      },
      "peerDependenciesMeta": {
        "html-webpack-plugin": {
          "optional": true
        }
      }
    },
    "node_modules/webpack/node_modules/json-parse-even-better-errors": {
      "version": "2.3.1",
      "resolved": "https://registry.npmjs.org/json-parse-even-better-errors/-/json-parse-even-better-errors-2.3.1.tgz",
      "integrity": "sha512-xyFwyhro/JEof6Ghe2iz2NcXoj2sloNsWr/XsERDK/oiPCfaNhl5ONfp+jQdAZRQQ0IJWNzH9zIZF7li91kh2w==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/websocket-driver": {
      "version": "0.7.4",
      "resolved": "https://registry.npmjs.org/websocket-driver/-/websocket-driver-0.7.4.tgz",
      "integrity": "sha512-b17KeDIQVjvb0ssuSDF2cYXSg2iztliJ4B9WdsuB6J952qCPKmnVq4DyW5motImXHDC1cBT/1UezrJVsKw5zjg==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "http-parser-js": ">=0.5.1",
        "safe-buffer": ">=5.1.0",
        "websocket-extensions": ">=0.1.1"
      },
      "engines": {
        "node": ">=0.8.0"
      }
    },
    "node_modules/websocket-extensions": {
      "version": "0.1.4",
      "resolved": "https://registry.npmjs.org/websocket-extensions/-/websocket-extensions-0.1.4.tgz",
      "integrity": "sha512-OqedPIGOfsDlo31UNwYbCFMSaO9m9G/0faIHj5/dZFDMFqPTcx6UwqyOy3COEaEOg/9VsGIpdqn62W5KhoKSpg==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": ">=0.8.0"
      }
    },
    "node_modules/which": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/which/-/which-2.0.2.tgz",
      "integrity": "sha512-BLI3Tl1TW3Pvl70l3yq3Y64i+awpwXqsGBYWkkqMtnbXgrMD+yj7rhW0kuEDxzJaYXGjEW5ogapKNMEKNMjibA==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "isexe": "^2.0.0"
      },
      "bin": {
        "node-which": "bin/node-which"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/wildcard": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/wildcard/-/wildcard-2.0.1.tgz",
      "integrity": "sha512-CC1bOL87PIWSBhDcTrdeLo6eGT7mCFtrg0uIJtqJUFyK+eJnzl8A1niH56uu7KMa5XFrtiV+AQuHO3n7DsHnLQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/wrap-ansi": {
      "version": "6.2.0",
      "resolved": "https://registry.npmjs.org/wrap-ansi/-/wrap-ansi-6.2.0.tgz",
      "integrity": "sha512-r6lPcBGxZXlIcymEu7InxDMhdW0KDxpLgoFLcguasxCaJ/SOIZwINatK9KY/tf+ZrlywOKU0UDj3ATXUBfxJXA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ansi-styles": "^4.0.0",
        "string-width": "^4.1.0",
        "strip-ansi": "^6.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/wrap-ansi-cjs": {
      "name": "wrap-ansi",
      "version": "7.0.0",
      "resolved": "https://registry.npmjs.org/wrap-ansi/-/wrap-ansi-7.0.0.tgz",
      "integrity": "sha512-YVGIj2kamLSTxw6NsZjoBxfSwsn0ycdesmc4p+Q21c5zPuZ1pl+NfxVdxPtdHvmNVOQ6XSYG4AUtyt/Fi7D16Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ansi-styles": "^4.0.0",
        "string-width": "^4.1.0",
        "strip-ansi": "^6.0.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/chalk/wrap-ansi?sponsor=1"
      }
    },
    "node_modules/wrap-ansi-cjs/node_modules/ansi-regex": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-5.0.1.tgz",
      "integrity": "sha512-quJQXlTSUGL2LH9SUXo8VwsY4soanhgo6LNSm84E1LBcE8s3O0wpdiRzyR9z/ZZJMlMWv37qOOb9pdJlMUEKFQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/wrap-ansi-cjs/node_modules/ansi-styles": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-4.3.0.tgz",
      "integrity": "sha512-zbB9rCJAT1rbjiVDb2hqKFHNYLxgtk8NURxZ3IZwD3F6NtxbXZQCnnSi1Lkx+IDohdPlFp222wVALIheZJQSEg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "color-convert": "^2.0.1"
      },
      "engines": {
        "node": ">=8"
      },
      "funding": {
        "url": "https://github.com/chalk/ansi-styles?sponsor=1"
      }
    },
    "node_modules/wrap-ansi-cjs/node_modules/emoji-regex": {
      "version": "8.0.0",
      "resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-8.0.0.tgz",
      "integrity": "sha512-MSjYzcWNOA0ewAHpz0MxpYFvwg6yjy1NG3xteoqz644VCo/RPgnr1/GGt+ic3iJTzQ8Eu3TdM14SawnVUmGE6A==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/wrap-ansi-cjs/node_modules/is-fullwidth-code-point": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/is-fullwidth-code-point/-/is-fullwidth-code-point-3.0.0.tgz",
      "integrity": "sha512-zymm5+u+sCsSWyD9qNaejV3DFvhCKclKdizYaJUuHA83RLjb7nSuGnddCHGv0hk+KY7BMAlsWeK4Ueg6EV6XQg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/wrap-ansi-cjs/node_modules/string-width": {
      "version": "4.2.3",
      "resolved": "https://registry.npmjs.org/string-width/-/string-width-4.2.3.tgz",
      "integrity": "sha512-wKyQRQpjJ0sIp62ErSZdGsjMJWsap5oRNihHhu6G7JVO/9jIB6UyevL+tXuOqrng8j/cxKTWyWUwvSTriiZz/g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "emoji-regex": "^8.0.0",
        "is-fullwidth-code-point": "^3.0.0",
        "strip-ansi": "^6.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/wrap-ansi-cjs/node_modules/strip-ansi": {
      "version": "6.0.1",
      "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-6.0.1.tgz",
      "integrity": "sha512-Y38VPSHcqkFrCpFnQ9vuSXmquuv5oXOKpGeT6aGrr3o3Gc9AlVa6JBfUSOCnbxGGZF+/0ooI7KrPuUSztUdU5A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ansi-regex": "^5.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/wrap-ansi/node_modules/ansi-regex": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-5.0.1.tgz",
      "integrity": "sha512-quJQXlTSUGL2LH9SUXo8VwsY4soanhgo6LNSm84E1LBcE8s3O0wpdiRzyR9z/ZZJMlMWv37qOOb9pdJlMUEKFQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/wrap-ansi/node_modules/ansi-styles": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-4.3.0.tgz",
      "integrity": "sha512-zbB9rCJAT1rbjiVDb2hqKFHNYLxgtk8NURxZ3IZwD3F6NtxbXZQCnnSi1Lkx+IDohdPlFp222wVALIheZJQSEg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "color-convert": "^2.0.1"
      },
      "engines": {
        "node": ">=8"
      },
      "funding": {
        "url": "https://github.com/chalk/ansi-styles?sponsor=1"
      }
    },
    "node_modules/wrap-ansi/node_modules/emoji-regex": {
      "version": "8.0.0",
      "resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-8.0.0.tgz",
      "integrity": "sha512-MSjYzcWNOA0ewAHpz0MxpYFvwg6yjy1NG3xteoqz644VCo/RPgnr1/GGt+ic3iJTzQ8Eu3TdM14SawnVUmGE6A==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/wrap-ansi/node_modules/is-fullwidth-code-point": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/is-fullwidth-code-point/-/is-fullwidth-code-point-3.0.0.tgz",
      "integrity": "sha512-zymm5+u+sCsSWyD9qNaejV3DFvhCKclKdizYaJUuHA83RLjb7nSuGnddCHGv0hk+KY7BMAlsWeK4Ueg6EV6XQg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/wrap-ansi/node_modules/string-width": {
      "version": "4.2.3",
      "resolved": "https://registry.npmjs.org/string-width/-/string-width-4.2.3.tgz",
      "integrity": "sha512-wKyQRQpjJ0sIp62ErSZdGsjMJWsap5oRNihHhu6G7JVO/9jIB6UyevL+tXuOqrng8j/cxKTWyWUwvSTriiZz/g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "emoji-regex": "^8.0.0",
        "is-fullwidth-code-point": "^3.0.0",
        "strip-ansi": "^6.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/wrap-ansi/node_modules/strip-ansi": {
      "version": "6.0.1",
      "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-6.0.1.tgz",
      "integrity": "sha512-Y38VPSHcqkFrCpFnQ9vuSXmquuv5oXOKpGeT6aGrr3o3Gc9AlVa6JBfUSOCnbxGGZF+/0ooI7KrPuUSztUdU5A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ansi-regex": "^5.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/wrappy": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/wrappy/-/wrappy-1.0.2.tgz",
      "integrity": "sha512-l4Sp/DRseor9wL6EvV2+TuQn63dMkPjZ/sp9XkghTEbV9KlPS1xUsZ3u7/IQO4wxtcFB4bgpQPRcR3QCvezPcQ==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/ws": {
      "version": "8.17.1",
      "resolved": "https://registry.npmjs.org/ws/-/ws-8.17.1.tgz",
      "integrity": "sha512-6XQFvXTkbfUOZOKKILFG1PDK2NDQs4azKQl26T0YS5CxqWLgXajbPZ+h4gZekJyRqFU8pvnbAbbs/3TgRPy+GQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=10.0.0"
      },
      "peerDependencies": {
        "bufferutil": "^4.0.1",
        "utf-8-validate": ">=5.0.2"
      },
      "peerDependenciesMeta": {
        "bufferutil": {
          "optional": true
        },
        "utf-8-validate": {
          "optional": true
        }
      }
    },
    "node_modules/wsl-utils": {
      "version": "0.1.0",
      "resolved": "https://registry.npmjs.org/wsl-utils/-/wsl-utils-0.1.0.tgz",
      "integrity": "sha512-h3Fbisa2nKGPxCpm89Hk33lBLsnaGBvctQopaBSOW/uIs6FTe1ATyAnKFJrzVs9vpGdsTe73WF3V4lIsk4Gacw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "is-wsl": "^3.1.0"
      },
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/y18n": {
      "version": "5.0.8",
      "resolved": "https://registry.npmjs.org/y18n/-/y18n-5.0.8.tgz",
      "integrity": "sha512-0pfFzegeDWJHJIAmTLRP2DwHjdF5s7jo9tuztdQxAhINCdvS+3nGINqPd00AphqJR/0LhANUS6/+7SCb98YOfA==",
      "dev": true,
      "license": "ISC",
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/yallist": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/yallist/-/yallist-3.1.1.tgz",
      "integrity": "sha512-a4UGQaWPH59mOXUYnAG2ewncQS4i4F43Tv3JoAM+s2VDAmS9NsK8GpDMLrCHPksFT7h3K6TOoUNn2pb7RoXx4g==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/yargs": {
      "version": "18.0.0",
      "resolved": "https://registry.npmjs.org/yargs/-/yargs-18.0.0.tgz",
      "integrity": "sha512-4UEqdc2RYGHZc7Doyqkrqiln3p9X2DZVxaGbwhn2pi7MrRagKaOcIKe8L3OxYcbhXLgLFUS3zAYuQjKBQgmuNg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "cliui": "^9.0.1",
        "escalade": "^3.1.1",
        "get-caller-file": "^2.0.5",
        "string-width": "^7.2.0",
        "y18n": "^5.0.5",
        "yargs-parser": "^22.0.0"
      },
      "engines": {
        "node": "^20.19.0 || ^22.12.0 || >=23"
      }
    },
    "node_modules/yargs-parser": {
      "version": "22.0.0",
      "resolved": "https://registry.npmjs.org/yargs-parser/-/yargs-parser-22.0.0.tgz",
      "integrity": "sha512-rwu/ClNdSMpkSrUb+d6BRsSkLUq1fmfsY6TOpYzTwvwkg1/NRG85KBy3kq++A8LKQwX6lsu+aWad+2khvuXrqw==",
      "dev": true,
      "license": "ISC",
      "engines": {
        "node": "^20.19.0 || ^22.12.0 || >=23"
      }
    },
    "node_modules/yocto-queue": {
      "version": "0.1.0",
      "resolved": "https://registry.npmjs.org/yocto-queue/-/yocto-queue-0.1.0.tgz",
      "integrity": "sha512-rVksvsnNCdJ/ohGc6xgPwyN8eheCxsiLM8mxuE/t/mOVqJewPuO1miLpTHQiRgTKCLexL4MeAFVagts7HmNZ2Q==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/yoctocolors-cjs": {
      "version": "2.1.3",
      "resolved": "https://registry.npmjs.org/yoctocolors-cjs/-/yoctocolors-cjs-2.1.3.tgz",
      "integrity": "sha512-U/PBtDf35ff0D8X8D0jfdzHYEPFxAI7jJlxZXwCSez5M3190m+QobIfh+sWDWSHMCWWJN2AWamkegn6vr6YBTw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/zod": {
      "version": "3.25.76",
      "resolved": "https://registry.npmjs.org/zod/-/zod-3.25.76.tgz",
      "integrity": "sha512-gzUt/qt81nXsFGKIFcC3YnfEAx5NkunCfnDlvuBSSFS02bcXu4Lmea0AFIUwbLWxWPx3d9p8S5QoaujKcNQxcQ==",
      "dev": true,
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/colinhacks"
      }
    },
    "node_modules/zod-to-json-schema": {
      "version": "3.24.6",
      "resolved": "https://registry.npmjs.org/zod-to-json-schema/-/zod-to-json-schema-3.24.6.tgz",
      "integrity": "sha512-h/z3PKvcTcTetyjl1fkj79MHNEjm+HpD6NXheWjzOekY7kV+lwDYnHw+ivHkijnCSMz1yJaWBD9vu/Fcmk+vEg==",
      "dev": true,
      "license": "ISC",
      "peerDependencies": {
        "zod": "^3.24.1"
      }
    },
    "node_modules/zone.js": {
      "version": "0.14.10",
      "resolved": "https://registry.npmjs.org/zone.js/-/zone.js-0.14.10.tgz",
      "integrity": "sha512-YGAhaO7J5ywOXW6InXNlLmfU194F8lVgu7bRntUF3TiG8Y3nBK0x1UJJuHUP/e8IyihkjCYqhCScpSwnlaSRkQ==",
      "license": "MIT"
    }
  }
}
```

### ./README.md
```
# AdminPwa

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.5.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
```

### ./src/app/app.component.ts
```
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet />`,
})
export class AppComponent {}
```

### ./src/app/app.config.ts
```
// src/app/app.config.ts
// ============================================================================
// Router & Providers principali dell’app
// - Mantiene rotte esistenti (login/logout, shell admin, reservations, ecc.)
// - ✅ Rotte pubbliche (NO auth): /prenota, /prenota/grazie
// - ✅ NUOVE rotte Admin (con auth):
//     • /orders/new        → “Order Builder” (porta dentro la UX PWA Customer)
//     • /orders            → dashboard live delle ordinazioni (real-time)
//   NB: Lazy-loaded, stile invariato.
// ----------------------------------------------------------------------------
// TODO (fuori da questo file):
//   - Invio mail (admin + cliente) su nuovo ordine
//   - Invio WhatsApp/Twilio/WhatsAppSender su nuovo ordine / stato ordine
//   - Socket/SSE per aggiornamenti real-time su /orders
// ============================================================================

import { ApplicationConfig, isDevMode, APP_INITIALIZER, LOCALE_ID } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { provideServiceWorker } from '@angular/service-worker';

import { ShellPage } from './shell/shell.page';
import { DiagnosticsPage } from './features/diagnostics/diagnostics.page';
import { LoginPage } from './features/auth/login.page';

import { API_URL } from './core/tokens';
import { environment } from './environments/environment';
import { apiErrorInterceptor } from './core/interceptors';
import { authInterceptor } from './core/auth/auth.interceptor';
import { authGuard } from './core/auth/auth.guard';
import { AuthService } from './core/auth/auth.service';

// Ionicons registrate una volta all’avvio (coerente con il tuo stile)
import { registerAppIcons } from './icons';
registerAppIcons();

const routes: Routes = [
  // === Public (no auth, no shell) ============================================
  { path: 'login', component: LoginPage },
  { path: 'logout', loadComponent: () => import('./features/auth/logout.page').then(m => m.LogoutPage) },

  // 🔧 NEW — Flusso pubblico di prenotazione: NO auth, NO Shell admin
  { path: 'prenota', loadComponent: () => import('./features/public-booking/public-booking.page').then(m => m.PublicBookingPage) },
  { path: 'prenota/grazie', loadComponent: () => import('./features/public-booking/thank-you.page').then(m => m.ThankYouPage) },

  // === Admin shell ===========================================================
  {
    path: '',
    component: ShellPage,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'diagnostics' },
      { path: 'diagnostics', component: DiagnosticsPage },

      // ==================== Prenotazioni (già esistenti) ====================
      {
        path: 'reservations',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./features/reservations/reservations-list.page')
                .then(m => m.ReservationsListPage),
            canActivate: [authGuard],
          },
          {
            path: 'new',
            loadComponent: () =>
              import('./features/reservations/new-reservation.page')
                .then(m => m.NewReservationPage),
            canActivate: [authGuard],
          },
          {
            path: ':id/edit',
            loadComponent: () =>
              import('./features/reservations/edit-reservation.page')
                .then(m => m.EditReservationPage),
            canActivate: [authGuard],
          }
        ]
      },

      // ====================== 🔧 NEW — Ordini (Admin) =======================
      {
        path: 'orders',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./features/orders/orders-live.page')
                .then(m => m.OrdersLivePage),
            canActivate: [authGuard],
          },
          {
            path: 'new',
            loadComponent: () =>
              import('./features/orders/order-builder.page')
                .then(m => m.OrderBuilderPage),
            canActivate: [authGuard],
          }
        ]
      },

      { path: '**', redirectTo: 'diagnostics' }
    ]
  }
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideIonicAngular(),
    { provide: LOCALE_ID, useValue: 'it-IT' },

    // HTTP + intercettori (stile invariato)
    provideHttpClient(withInterceptors([authInterceptor, apiErrorInterceptor])),

    // API base (env)
    { provide: API_URL, useValue: environment.apiBaseUrl },

    // Bootstrap auth (inizializza il profilo/token ecc.)
    {
      provide: APP_INITIALIZER,
      useFactory: (auth: AuthService) => () => auth.init(),
      deps: [AuthService],
      multi: true
    },

    // PWA
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    })
  ]
};
```

### ./src/app/app.html
```
<!-- * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * -->
<!-- * * * * * * * * * * * The content below * * * * * * * * * * * -->
<!-- * * * * * * * * * * is only a placeholder * * * * * * * * * * -->
<!-- * * * * * * * * * * and can be replaced.  * * * * * * * * * * -->
<!-- * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * -->
<!-- * * * * * * * * * Delete the template below * * * * * * * * * -->
<!-- * * * * * * * to get started with your project! * * * * * * * -->
<!-- * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * -->

<style>
  :host {
    --bright-blue: oklch(51.01% 0.274 263.83);
    --electric-violet: oklch(53.18% 0.28 296.97);
    --french-violet: oklch(47.66% 0.246 305.88);
    --vivid-pink: oklch(69.02% 0.277 332.77);
    --hot-red: oklch(61.42% 0.238 15.34);
    --orange-red: oklch(63.32% 0.24 31.68);

    --gray-900: oklch(19.37% 0.006 300.98);
    --gray-700: oklch(36.98% 0.014 302.71);
    --gray-400: oklch(70.9% 0.015 304.04);

    --red-to-pink-to-purple-vertical-gradient: linear-gradient(
      180deg,
      var(--orange-red) 0%,
      var(--vivid-pink) 50%,
      var(--electric-violet) 100%
    );

    --red-to-pink-to-purple-horizontal-gradient: linear-gradient(
      90deg,
      var(--orange-red) 0%,
      var(--vivid-pink) 50%,
      var(--electric-violet) 100%
    );

    --pill-accent: var(--bright-blue);

    font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
      "Segoe UI Symbol";
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1 {
    font-size: 3.125rem;
    color: var(--gray-900);
    font-weight: 500;
    line-height: 100%;
    letter-spacing: -0.125rem;
    margin: 0;
    font-family: "Inter Tight", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
      "Segoe UI Symbol";
  }

  p {
    margin: 0;
    color: var(--gray-700);
  }

  main {
    width: 100%;
    min-height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    box-sizing: inherit;
    position: relative;
  }

  .angular-logo {
    max-width: 9.2rem;
  }

  .content {
    display: flex;
    justify-content: space-around;
    width: 100%;
    max-width: 700px;
    margin-bottom: 3rem;
  }

  .content h1 {
    margin-top: 1.75rem;
  }

  .content p {
    margin-top: 1.5rem;
  }

  .divider {
    width: 1px;
    background: var(--red-to-pink-to-purple-vertical-gradient);
    margin-inline: 0.5rem;
  }

  .pill-group {
    display: flex;
    flex-direction: column;
    align-items: start;
    flex-wrap: wrap;
    gap: 1.25rem;
  }

  .pill {
    display: flex;
    align-items: center;
    --pill-accent: var(--bright-blue);
    background: color-mix(in srgb, var(--pill-accent) 5%, transparent);
    color: var(--pill-accent);
    padding-inline: 0.75rem;
    padding-block: 0.375rem;
    border-radius: 2.75rem;
    border: 0;
    transition: background 0.3s ease;
    font-family: var(--inter-font);
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1.4rem;
    letter-spacing: -0.00875rem;
    text-decoration: none;
    white-space: nowrap;
  }

  .pill:hover {
    background: color-mix(in srgb, var(--pill-accent) 15%, transparent);
  }

  .pill-group .pill:nth-child(6n + 1) {
    --pill-accent: var(--bright-blue);
  }
  .pill-group .pill:nth-child(6n + 2) {
    --pill-accent: var(--electric-violet);
  }
  .pill-group .pill:nth-child(6n + 3) {
    --pill-accent: var(--french-violet);
  }

  .pill-group .pill:nth-child(6n + 4),
  .pill-group .pill:nth-child(6n + 5),
  .pill-group .pill:nth-child(6n + 6) {
    --pill-accent: var(--hot-red);
  }

  .pill-group svg {
    margin-inline-start: 0.25rem;
  }

  .social-links {
    display: flex;
    align-items: center;
    gap: 0.73rem;
    margin-top: 1.5rem;
  }

  .social-links path {
    transition: fill 0.3s ease;
    fill: var(--gray-400);
  }

  .social-links a:hover svg path {
    fill: var(--gray-900);
  }

  @media screen and (max-width: 650px) {
    .content {
      flex-direction: column;
      width: max-content;
    }

    .divider {
      height: 1px;
      width: 100%;
      background: var(--red-to-pink-to-purple-horizontal-gradient);
      margin-block: 1.5rem;
    }
  }
</style>

<main class="main">
  <div class="content">
    <div class="left-side">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 982 239"
        fill="none"
        class="angular-logo"
      >
        <g clip-path="url(#a)">
          <path
            fill="url(#b)"
            d="M388.676 191.625h30.849L363.31 31.828h-35.758l-56.215 159.797h30.848l13.174-39.356h60.061l13.256 39.356Zm-65.461-62.675 21.602-64.311h1.227l21.602 64.311h-44.431Zm126.831-7.527v70.202h-28.23V71.839h27.002v20.374h1.392c2.782-6.71 7.2-12.028 13.255-15.956 6.056-3.927 13.584-5.89 22.503-5.89 8.264 0 15.465 1.8 21.684 5.318 6.137 3.518 10.964 8.673 14.319 15.382 3.437 6.71 5.074 14.81 4.992 24.383v76.175h-28.23v-71.92c0-8.019-2.046-14.237-6.219-18.819-4.173-4.5-9.819-6.791-17.102-6.791-4.91 0-9.328 1.063-13.174 3.272-3.846 2.128-6.792 5.237-9.001 9.328-2.046 4.009-3.191 8.918-3.191 14.728ZM589.233 239c-10.147 0-18.82-1.391-26.103-4.091-7.282-2.7-13.092-6.382-17.511-10.964-4.418-4.582-7.528-9.655-9.164-15.219l25.448-6.136c1.145 2.372 2.782 4.663 4.991 6.954 2.209 2.291 5.155 4.255 8.837 5.81 3.683 1.554 8.428 2.291 14.074 2.291 8.019 0 14.647-1.964 19.884-5.81 5.237-3.845 7.856-10.227 7.856-19.064v-22.665h-1.391c-1.473 2.946-3.601 5.892-6.383 9.001-2.782 3.109-6.464 5.645-10.965 7.691-4.582 2.046-10.228 3.109-17.101 3.109-9.165 0-17.511-2.209-25.039-6.545-7.446-4.337-13.42-10.883-17.757-19.474-4.418-8.673-6.628-19.473-6.628-32.565 0-13.091 2.21-24.301 6.628-33.383 4.419-9.082 10.311-15.955 17.839-20.7 7.528-4.746 15.874-7.037 25.039-7.037 7.037 0 12.846 1.145 17.347 3.518 4.582 2.373 8.182 5.236 10.883 8.51 2.7 3.272 4.746 6.382 6.137 9.327h1.554v-19.8h27.821v121.749c0 10.228-2.454 18.737-7.364 25.447-4.91 6.709-11.538 11.7-20.048 15.055-8.509 3.355-18.165 4.991-28.884 4.991Zm.245-71.266c5.974 0 11.047-1.473 15.302-4.337 4.173-2.945 7.446-7.118 9.573-12.519 2.21-5.482 3.274-12.027 3.274-19.637 0-7.609-1.064-14.155-3.274-19.8-2.127-5.646-5.318-10.064-9.491-13.255-4.174-3.11-9.329-4.746-15.384-4.746s-11.537 1.636-15.792 4.91c-4.173 3.272-7.365 7.772-9.492 13.418-2.128 5.727-3.191 12.191-3.191 19.392 0 7.2 1.063 13.745 3.273 19.228 2.127 5.482 5.318 9.736 9.573 12.764 4.174 3.027 9.41 4.582 15.629 4.582Zm141.56-26.51V71.839h28.23v119.786h-27.412v-21.273h-1.227c-2.7 6.709-7.119 12.191-13.338 16.446-6.137 4.255-13.747 6.382-22.748 6.382-7.855 0-14.81-1.718-20.783-5.237-5.974-3.518-10.72-8.591-14.075-15.382-3.355-6.709-5.073-14.891-5.073-24.464V71.839h28.312v71.921c0 7.609 2.046 13.664 6.219 18.083 4.173 4.5 9.655 6.709 16.365 6.709 4.173 0 8.183-.982 12.111-3.028 3.927-2.045 7.118-5.072 9.655-9.082 2.537-4.091 3.764-9.164 3.764-15.218Zm65.707-109.395v159.796h-28.23V31.828h28.23Zm44.841 162.169c-7.61 0-14.402-1.391-20.457-4.091-6.055-2.7-10.883-6.791-14.32-12.109-3.518-5.319-5.237-11.946-5.237-19.801 0-6.791 1.228-12.355 3.765-16.773 2.536-4.419 5.891-7.937 10.228-10.637 4.337-2.618 9.164-4.664 14.647-6.055 5.4-1.391 11.046-2.373 16.856-3.027 7.037-.737 12.683-1.391 17.102-1.964 4.337-.573 7.528-1.555 9.574-2.782 1.963-1.309 3.027-3.273 3.027-5.973v-.491c0-5.891-1.718-10.391-5.237-13.664-3.518-3.191-8.51-4.828-15.056-4.828-6.955 0-12.356 1.473-16.447 4.5-4.009 3.028-6.71 6.546-8.183 10.719l-26.348-3.764c2.046-7.282 5.483-13.336 10.31-18.328 4.746-4.909 10.638-8.59 17.511-11.045 6.955-2.455 14.565-3.682 22.912-3.682 5.809 0 11.537.654 17.265 2.045s10.965 3.6 15.711 6.71c4.746 3.109 8.51 7.282 11.455 12.6 2.864 5.318 4.337 11.946 4.337 19.883v80.184h-27.166v-16.446h-.9c-1.719 3.355-4.092 6.464-7.201 9.328-3.109 2.864-6.955 5.237-11.619 6.955-4.828 1.718-10.229 2.536-16.529 2.536Zm7.364-20.701c5.646 0 10.556-1.145 14.729-3.354 4.173-2.291 7.364-5.237 9.655-9.001 2.292-3.763 3.355-7.854 3.355-12.273v-14.155c-.9.737-2.373 1.391-4.5 2.046-2.128.654-4.419 1.145-7.037 1.636-2.619.491-5.155.9-7.692 1.227-2.537.328-4.746.655-6.628.901-4.173.572-8.019 1.472-11.292 2.781-3.355 1.31-5.973 3.11-7.855 5.401-1.964 2.291-2.864 5.318-2.864 8.918 0 5.237 1.882 9.164 5.728 11.782 3.682 2.782 8.51 4.091 14.401 4.091Zm64.643 18.328V71.839h27.412v19.965h1.227c2.21-6.955 5.974-12.274 11.292-16.038 5.319-3.763 11.456-5.645 18.329-5.645 1.555 0 3.355.082 5.237.163 1.964.164 3.601.328 4.91.573v25.938c-1.227-.41-3.109-.819-5.646-1.146a58.814 58.814 0 0 0-7.446-.49c-5.155 0-9.738 1.145-13.829 3.354-4.091 2.209-7.282 5.236-9.655 9.164-2.373 3.927-3.519 8.427-3.519 13.5v70.448h-28.312ZM222.077 39.192l-8.019 125.923L137.387 0l84.69 39.192Zm-53.105 162.825-57.933 33.056-57.934-33.056 11.783-28.556h92.301l11.783 28.556ZM111.039 62.675l30.357 73.803H80.681l30.358-73.803ZM7.937 165.115 0 39.192 84.69 0 7.937 165.115Z"
          />
          <path
            fill="url(#c)"
            d="M388.676 191.625h30.849L363.31 31.828h-35.758l-56.215 159.797h30.848l13.174-39.356h60.061l13.256 39.356Zm-65.461-62.675 21.602-64.311h1.227l21.602 64.311h-44.431Zm126.831-7.527v70.202h-28.23V71.839h27.002v20.374h1.392c2.782-6.71 7.2-12.028 13.255-15.956 6.056-3.927 13.584-5.89 22.503-5.89 8.264 0 15.465 1.8 21.684 5.318 6.137 3.518 10.964 8.673 14.319 15.382 3.437 6.71 5.074 14.81 4.992 24.383v76.175h-28.23v-71.92c0-8.019-2.046-14.237-6.219-18.819-4.173-4.5-9.819-6.791-17.102-6.791-4.91 0-9.328 1.063-13.174 3.272-3.846 2.128-6.792 5.237-9.001 9.328-2.046 4.009-3.191 8.918-3.191 14.728ZM589.233 239c-10.147 0-18.82-1.391-26.103-4.091-7.282-2.7-13.092-6.382-17.511-10.964-4.418-4.582-7.528-9.655-9.164-15.219l25.448-6.136c1.145 2.372 2.782 4.663 4.991 6.954 2.209 2.291 5.155 4.255 8.837 5.81 3.683 1.554 8.428 2.291 14.074 2.291 8.019 0 14.647-1.964 19.884-5.81 5.237-3.845 7.856-10.227 7.856-19.064v-22.665h-1.391c-1.473 2.946-3.601 5.892-6.383 9.001-2.782 3.109-6.464 5.645-10.965 7.691-4.582 2.046-10.228 3.109-17.101 3.109-9.165 0-17.511-2.209-25.039-6.545-7.446-4.337-13.42-10.883-17.757-19.474-4.418-8.673-6.628-19.473-6.628-32.565 0-13.091 2.21-24.301 6.628-33.383 4.419-9.082 10.311-15.955 17.839-20.7 7.528-4.746 15.874-7.037 25.039-7.037 7.037 0 12.846 1.145 17.347 3.518 4.582 2.373 8.182 5.236 10.883 8.51 2.7 3.272 4.746 6.382 6.137 9.327h1.554v-19.8h27.821v121.749c0 10.228-2.454 18.737-7.364 25.447-4.91 6.709-11.538 11.7-20.048 15.055-8.509 3.355-18.165 4.991-28.884 4.991Zm.245-71.266c5.974 0 11.047-1.473 15.302-4.337 4.173-2.945 7.446-7.118 9.573-12.519 2.21-5.482 3.274-12.027 3.274-19.637 0-7.609-1.064-14.155-3.274-19.8-2.127-5.646-5.318-10.064-9.491-13.255-4.174-3.11-9.329-4.746-15.384-4.746s-11.537 1.636-15.792 4.91c-4.173 3.272-7.365 7.772-9.492 13.418-2.128 5.727-3.191 12.191-3.191 19.392 0 7.2 1.063 13.745 3.273 19.228 2.127 5.482 5.318 9.736 9.573 12.764 4.174 3.027 9.41 4.582 15.629 4.582Zm141.56-26.51V71.839h28.23v119.786h-27.412v-21.273h-1.227c-2.7 6.709-7.119 12.191-13.338 16.446-6.137 4.255-13.747 6.382-22.748 6.382-7.855 0-14.81-1.718-20.783-5.237-5.974-3.518-10.72-8.591-14.075-15.382-3.355-6.709-5.073-14.891-5.073-24.464V71.839h28.312v71.921c0 7.609 2.046 13.664 6.219 18.083 4.173 4.5 9.655 6.709 16.365 6.709 4.173 0 8.183-.982 12.111-3.028 3.927-2.045 7.118-5.072 9.655-9.082 2.537-4.091 3.764-9.164 3.764-15.218Zm65.707-109.395v159.796h-28.23V31.828h28.23Zm44.841 162.169c-7.61 0-14.402-1.391-20.457-4.091-6.055-2.7-10.883-6.791-14.32-12.109-3.518-5.319-5.237-11.946-5.237-19.801 0-6.791 1.228-12.355 3.765-16.773 2.536-4.419 5.891-7.937 10.228-10.637 4.337-2.618 9.164-4.664 14.647-6.055 5.4-1.391 11.046-2.373 16.856-3.027 7.037-.737 12.683-1.391 17.102-1.964 4.337-.573 7.528-1.555 9.574-2.782 1.963-1.309 3.027-3.273 3.027-5.973v-.491c0-5.891-1.718-10.391-5.237-13.664-3.518-3.191-8.51-4.828-15.056-4.828-6.955 0-12.356 1.473-16.447 4.5-4.009 3.028-6.71 6.546-8.183 10.719l-26.348-3.764c2.046-7.282 5.483-13.336 10.31-18.328 4.746-4.909 10.638-8.59 17.511-11.045 6.955-2.455 14.565-3.682 22.912-3.682 5.809 0 11.537.654 17.265 2.045s10.965 3.6 15.711 6.71c4.746 3.109 8.51 7.282 11.455 12.6 2.864 5.318 4.337 11.946 4.337 19.883v80.184h-27.166v-16.446h-.9c-1.719 3.355-4.092 6.464-7.201 9.328-3.109 2.864-6.955 5.237-11.619 6.955-4.828 1.718-10.229 2.536-16.529 2.536Zm7.364-20.701c5.646 0 10.556-1.145 14.729-3.354 4.173-2.291 7.364-5.237 9.655-9.001 2.292-3.763 3.355-7.854 3.355-12.273v-14.155c-.9.737-2.373 1.391-4.5 2.046-2.128.654-4.419 1.145-7.037 1.636-2.619.491-5.155.9-7.692 1.227-2.537.328-4.746.655-6.628.901-4.173.572-8.019 1.472-11.292 2.781-3.355 1.31-5.973 3.11-7.855 5.401-1.964 2.291-2.864 5.318-2.864 8.918 0 5.237 1.882 9.164 5.728 11.782 3.682 2.782 8.51 4.091 14.401 4.091Zm64.643 18.328V71.839h27.412v19.965h1.227c2.21-6.955 5.974-12.274 11.292-16.038 5.319-3.763 11.456-5.645 18.329-5.645 1.555 0 3.355.082 5.237.163 1.964.164 3.601.328 4.91.573v25.938c-1.227-.41-3.109-.819-5.646-1.146a58.814 58.814 0 0 0-7.446-.49c-5.155 0-9.738 1.145-13.829 3.354-4.091 2.209-7.282 5.236-9.655 9.164-2.373 3.927-3.519 8.427-3.519 13.5v70.448h-28.312ZM222.077 39.192l-8.019 125.923L137.387 0l84.69 39.192Zm-53.105 162.825-57.933 33.056-57.934-33.056 11.783-28.556h92.301l11.783 28.556ZM111.039 62.675l30.357 73.803H80.681l30.358-73.803ZM7.937 165.115 0 39.192 84.69 0 7.937 165.115Z"
          />
        </g>
        <defs>
          <radialGradient
            id="c"
            cx="0"
            cy="0"
            r="1"
            gradientTransform="rotate(118.122 171.182 60.81) scale(205.794)"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#FF41F8" />
            <stop offset=".707" stop-color="#FF41F8" stop-opacity=".5" />
            <stop offset="1" stop-color="#FF41F8" stop-opacity="0" />
          </radialGradient>
          <linearGradient
            id="b"
            x1="0"
            x2="982"
            y1="192"
            y2="192"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#F0060B" />
            <stop offset="0" stop-color="#F0070C" />
            <stop offset=".526" stop-color="#CC26D5" />
            <stop offset="1" stop-color="#7702FF" />
          </linearGradient>
          <clipPath id="a"><path fill="#fff" d="M0 0h982v239H0z" /></clipPath>
        </defs>
      </svg>
      <h1>Hello, {{ title() }}</h1>
      <p>Congratulations! Your app is running. 🎉</p>
    </div>
    <div class="divider" role="separator" aria-label="Divider"></div>
    <div class="right-side">
      <div class="pill-group">
        @for (item of [
          { title: 'Explore the Docs', link: 'https://angular.dev' },
          { title: 'Learn with Tutorials', link: 'https://angular.dev/tutorials' },
          { title: 'Prompt and best practices for AI', link: 'https://angular.dev/ai/develop-with-ai'},
          { title: 'CLI Docs', link: 'https://angular.dev/tools/cli' },
          { title: 'Angular Language Service', link: 'https://angular.dev/tools/language-service' },
          { title: 'Angular DevTools', link: 'https://angular.dev/tools/devtools' },
        ]; track item.title) {
          <a
            class="pill"
            [href]="item.link"
            target="_blank"
            rel="noopener"
          >
            <span>{{ item.title }}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="14"
              viewBox="0 -960 960 960"
              width="14"
              fill="currentColor"
            >
              <path
                d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z"
              />
            </svg>
          </a>
        }
      </div>
      <div class="social-links">
        <a
          href="https://github.com/angular/angular"
          aria-label="Github"
          target="_blank"
          rel="noopener"
        >
          <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            alt="Github"
          >
            <path
              d="M12.3047 0C5.50634 0 0 5.50942 0 12.3047C0 17.7423 3.52529 22.3535 8.41332 23.9787C9.02856 24.0946 9.25414 23.7142 9.25414 23.3871C9.25414 23.0949 9.24389 22.3207 9.23876 21.2953C5.81601 22.0377 5.09414 19.6444 5.09414 19.6444C4.53427 18.2243 3.72524 17.8449 3.72524 17.8449C2.61064 17.082 3.81137 17.0973 3.81137 17.0973C5.04697 17.1835 5.69604 18.3647 5.69604 18.3647C6.79321 20.2463 8.57636 19.7029 9.27978 19.3881C9.39052 18.5924 9.70736 18.0499 10.0591 17.7423C7.32641 17.4347 4.45429 16.3765 4.45429 11.6618C4.45429 10.3185 4.9311 9.22133 5.72065 8.36C5.58222 8.04931 5.16694 6.79833 5.82831 5.10337C5.82831 5.10337 6.85883 4.77319 9.2121 6.36459C10.1965 6.09082 11.2424 5.95546 12.2883 5.94931C13.3342 5.95546 14.3801 6.09082 15.3644 6.36459C17.7023 4.77319 18.7328 5.10337 18.7328 5.10337C19.3942 6.79833 18.9789 8.04931 18.8559 8.36C19.6403 9.22133 20.1171 10.3185 20.1171 11.6618C20.1171 16.3888 17.2409 17.4296 14.5031 17.7321C14.9338 18.1012 15.3337 18.8559 15.3337 20.0084C15.3337 21.6552 15.3183 22.978 15.3183 23.3779C15.3183 23.7009 15.5336 24.0854 16.1642 23.9623C21.0871 22.3484 24.6094 17.7341 24.6094 12.3047C24.6094 5.50942 19.0999 0 12.3047 0Z"
            />
          </svg>
        </a>
        <a
          href="https://twitter.com/angular"
          aria-label="Twitter"
          target="_blank"
          rel="noopener"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            alt="Twitter"
          >
            <path
              d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
            />
          </svg>
        </a>
        <a
          href="https://www.youtube.com/channel/UCbn1OgGei-DV7aSRo_HaAiw"
          aria-label="Youtube"
          target="_blank"
          rel="noopener"
        >
          <svg
            width="29"
            height="20"
            viewBox="0 0 29 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            alt="Youtube"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M27.4896 1.52422C27.9301 1.96749 28.2463 2.51866 28.4068 3.12258C29.0004 5.35161 29.0004 10 29.0004 10C29.0004 10 29.0004 14.6484 28.4068 16.8774C28.2463 17.4813 27.9301 18.0325 27.4896 18.4758C27.0492 18.9191 26.5 19.2389 25.8972 19.4032C23.6778 20 14.8068 20 14.8068 20C14.8068 20 5.93586 20 3.71651 19.4032C3.11363 19.2389 2.56449 18.9191 2.12405 18.4758C1.68361 18.0325 1.36732 17.4813 1.20683 16.8774C0.613281 14.6484 0.613281 10 0.613281 10C0.613281 10 0.613281 5.35161 1.20683 3.12258C1.36732 2.51866 1.68361 1.96749 2.12405 1.52422C2.56449 1.08095 3.11363 0.76113 3.71651 0.596774C5.93586 0 14.8068 0 14.8068 0C14.8068 0 23.6778 0 25.8972 0.596774C26.5 0.76113 27.0492 1.08095 27.4896 1.52422ZM19.3229 10L11.9036 5.77905V14.221L19.3229 10Z"
            />
          </svg>
        </a>
      </div>
    </div>
  </div>
</main>

<!-- * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * -->
<!-- * * * * * * * * * * * The content above * * * * * * * * * * * * -->
<!-- * * * * * * * * * * is only a placeholder * * * * * * * * * * * -->
<!-- * * * * * * * * * * and can be replaced.  * * * * * * * * * * * -->
<!-- * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * -->
<!-- * * * * * * * * * * End of Placeholder  * * * * * * * * * * * * -->
<!-- * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * -->


<router-outlet />
```

### ./src/app/app.routes.ts
```
import { Routes } from '@angular/router';

export const routes: Routes = [];
```

### ./src/app/app.scss
```
```

### ./src/app/app.spec.ts
```
import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, admin-pwa');
  });
});
```

### ./src/app/app.ts
```
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('admin-pwa');
}
```

### ./src/app/app-menu/app-menu.component.html
```
<!-- Menù laterale: semplice e leggibile -->
<ion-content>
  <ion-list>
    <!-- IMPORTANTE: qui *ngFor funziona perché NgFor è importato nel componente -->
    <ion-menu-toggle auto-hide="true" *ngFor="let item of items">
      <ion-item button [routerLink]="item.path" routerLinkActive="ion-activated">
        <ion-icon slot="start" *ngIf="item.icon" [name]="item.icon"></ion-icon>
        <ion-label>{{ item.label }}</ion-label>
      </ion-item>
    </ion-menu-toggle>
  </ion-list>
</ion-content>
```

### ./src/app/app-menu/app-menu.component.scss
```
/* Evidenziazione voce attiva già gestita in shell.page.scss con .ion-activated */
ion-item {
  --min-height: 44px;
}```

### ./src/app/app-menu/app-menu.component.ts
```
// src/app/components/app-menu/app-menu.component.ts
// Component: AppMenu
// - Mostra le voci del menù laterale (split-pane / ion-menu).
// - Usa *ngFor (IMPORTANTE: NgFor importato qui).
// - Icone Ionicons: vengono registrate in src/app/icons.ts (vedi avvio app).

import { Component } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import {
  IonContent, IonList, IonMenuToggle, IonItem, IonIcon, IonLabel
} from '@ionic/angular/standalone';
import { RouterLink, RouterLinkActive } from '@angular/router';

type MenuItem = { label: string; path: string; icon?: string };

@Component({
  selector: 'app-menu',
  standalone: true,
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.scss'],
  imports: [
    // Angular
    NgIf, NgFor, RouterLink, RouterLinkActive,
    // Ionic
    IonContent, IonList, IonMenuToggle, IonItem, IonIcon, IonLabel,
  ]
})
export class AppMenuComponent {
  // NB: link corretti: lista prenotazioni è "/reservations" (NON "/reservations/list")
  items: MenuItem[] = [
    { label: 'Dashboard',            path: '/diagnostics',      icon: 'home' },
    { label: 'Lista prenotazioni',   path: '/reservations',     icon: 'list' },
    { label: 'Nuova prenotazione',   path: '/reservations/new', icon: 'add-circle' },
    { label: 'Ordini (live)',      path: '/orders',           icon: 'time-outline' },
    { label: 'Nuovo ordine',       path: '/orders/new',       icon: 'create-outline' },
    // { label: 'Impostazioni',       path: '/settings',         icon: 'settings' }, // futuro
  ];
}
```

### ./src/app/core/api.service.ts
```
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { API_URL } from './tokens';


@Injectable({ providedIn: 'root' })
export class ApiService {
private http = inject(HttpClient);
private base = inject(API_URL);


get<T>(path: string, params?: Record<string, any>) {
const httpParams = new HttpParams({ fromObject: params ?? {} });
return this.http.get<T>(`${this.base}${path}`, { params: httpParams });
}


post<T>(path: string, body?: any) {
return this.http.post<T>(`${this.base}${path}`, body);
}


ping() {
return this.get<{ ok: boolean; time: string }>('/ping', { _ts: Date.now() });
}
}```

### ./src/app/core/auth/auth.guard.ts
```
// src/app/core/auth/auth.guard.ts
// Protegge le rotte riservate. Se non autenticato → redirect a /login?redirect=<url>
// Mantiene la UX pulita: dopo il login si ritorna dove volevi andare.

import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isAuthenticated()) {
    return true;
  }
  const target = encodeURIComponent(location.pathname + location.search);
  return router.parseUrl(`/login?redirect=${target}`);
};
```

### ./src/app/core/auth/auth.interceptor.ts
```
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { catchError, throwError } from 'rxjs';


export const authInterceptor: HttpInterceptorFn = (req, next) => {
const auth = inject(AuthService);
const router = inject(Router);
const token = auth.token();


const cloned = token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;


return next(cloned).pipe(
catchError((err: unknown) => {
if (err instanceof HttpErrorResponse && err.status === 401) {
auth.logout();
const current = router.url || '/';
router.navigate(['/login'], { queryParams: { redirect: current } });
}
return throwError(() => err);
})
);
};```

### ./src/app/core/auth/auth.service.ts
```
import { Injectable, computed, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../tokens';


export type User = { id: string; email: string; name?: string; roles?: string[] };
export type LoginResponse = { token: string; user?: User };


const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';


@Injectable({ providedIn: 'root' })
export class AuthService {
private http = inject(HttpClient);
private base = inject(API_URL);


private _token = signal<string | null>(localStorage.getItem(TOKEN_KEY));
private _user = signal<User | null>(parseUser(localStorage.getItem(USER_KEY)));


readonly token = this._token.asReadonly();
readonly user = this._user.asReadonly();
readonly isAuthenticated = computed(() => !!this._token());


/** Chiamato a bootstrap app per ripristinare la sessione */
async init(): Promise<void> {
if (!this._token()) return;
try {
if (!this._user()) {
const me = await this.http.get<User>(`${this.base}/auth/me`).toPromise();
this._user.set(me ?? null);
if (me) localStorage.setItem(USER_KEY, JSON.stringify(me));
}
} catch {
this.logout();
}
}


async login(email: string, password: string): Promise<User | null> {
const res = await this.http.post<LoginResponse>(`${this.base}/auth/login`, { email, password }).toPromise();
if (!res?.token) throw new Error('Token mancante');
this._token.set(res.token);
localStorage.setItem(TOKEN_KEY, res.token);


const me = res.user ?? await this.http.get<User>(`${this.base}/auth/me`).toPromise();
this._user.set(me ?? null);
if (me) localStorage.setItem(USER_KEY, JSON.stringify(me));
return me ?? null;
}


logout() {
this._token.set(null);
this._user.set(null);
localStorage.removeItem(TOKEN_KEY);
localStorage.removeItem(USER_KEY);
}
}


function parseUser(raw: string | null): User | null {
try { return raw ? (JSON.parse(raw) as User) : null; } catch { return null; }
}```

### ./src/app/core/google/google.identity.d.ts
```
// src/app/core/google/google.identity.d.ts
// Tipi minimi per Google Identity Services (evita any). Non serve installare @types.

export {};

declare global {
  interface Window {
    google?: typeof google;
  }

  namespace google.accounts.oauth2 {
    interface TokenResponse {
      access_token: string;
      expires_in: number;
      token_type: string;
      scope: string;
    }
    interface TokenClientConfig {
      client_id: string;
      scope: string;
      prompt?: '' | 'consent';
      callback: (resp: TokenResponse) => void;
      error_callback?: (err: unknown) => void;
    }
    interface OverridableTokenClientConfig {
      prompt?: '' | 'consent';
      hint?: string;
    }
    interface TokenClient {
      requestAccessToken: (overrideConfig?: OverridableTokenClientConfig) => void;
    }
    function initTokenClient(config: TokenClientConfig): TokenClient;
    function revoke(accessToken: string, done: () => void): void;
  }
}
```

### ./src/app/core/google/google-contacts.service.ts
```
// src/app/core/google/google-contacts.service.ts
//
// GoogleContactsService
// - OAuth con Google Identity Services (GIS) lato SPA
// - People API: /v1/people:searchContacts
// - Ritorna GContactPick (compatibile col tuo componente)
// - Fix: usa environment.googleScopes (aggiunto) e controllo revoke come funzione.

import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';

export interface GContactPick {
  displayName?: string | null;
  givenName?: string | null;
  familyName?: string | null;
  phone?: string | null;
  email?: string | null;
}

@Injectable({ providedIn: 'root' })
export class GoogleContactsService {
  private accessToken: string | null = null;
  private expiresAt = 0; // epoch seconds

  searching = signal(false);

  /** Richiede/riusa il token GIS. Prompt solo se serve. */
  private async ensureToken(prompt: '' | 'consent' = ''): Promise<string> {
    const now = Math.floor(Date.now() / 1000);
    if (this.accessToken && this.expiresAt - 60 > now) {
      return this.accessToken;
    }

    if (!window.google?.accounts?.oauth2) {
      throw new Error('Google Identity Services non è disponibile (script non caricato?)');
    }

    const scopes =
      environment.googleScopes?.trim() ||
      'https://www.googleapis.com/auth/contacts.readonly';

    const token = await new Promise<string>((resolve, reject) => {
      const client = window.google!.accounts.oauth2.initTokenClient({
        client_id: environment.googleClientId,
        scope: scopes,
        prompt,
        callback: (resp) => {
          const at = (resp as any)?.access_token as string | undefined;
          const ttl = (resp as any)?.expires_in as number | undefined;
          if (!at) return reject(new Error('Token mancante'));
          this.accessToken = at;
          const nowS = Math.floor(Date.now() / 1000);
          this.expiresAt = nowS + (ttl ?? 3000);
          resolve(at);
        },
        error_callback: (err) => reject(err),
      });

      client.requestAccessToken({ prompt });
    });

    return token;
  }

  /** Opzionale: revoca token esplicita */
  async revoke(): Promise<void> {
    // ✅ evita TS2774: verifica che sia proprio una funzione
    const canRevoke =
      typeof window.google?.accounts?.oauth2?.revoke === 'function';
    if (this.accessToken && canRevoke) {
      await new Promise<void>((r) =>
        window.google!.accounts.oauth2.revoke(this.accessToken!, r)
      );
    }
    this.accessToken = null;
    this.expiresAt = 0;
  }

  /**
   * Autocomplete: cerca tra i contatti dell’utente.
   * @param query stringa (min 2 char)
   * @param pageSize default 10
   */
  async searchContacts(query: string, pageSize = 10): Promise<GContactPick[]> {
    const q = (query || '').trim();
    if (q.length < 2) return [];

    this.searching.set(true);
    try {
      const token = await this.ensureToken('');
      const url = new URL('https://people.googleapis.com/v1/people:searchContacts');
      url.searchParams.set('query', q);
      url.searchParams.set('pageSize', String(pageSize));
      url.searchParams.set('readMask', 'names,emailAddresses,phoneNumbers');

      const res = await fetch(url.toString(), {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401) {
        const newToken = await this.ensureToken('consent');
        const retry = await fetch(url.toString(), {
          headers: { Authorization: `Bearer ${newToken}` },
        });
        return this.mapPeople(await retry.json());
      }

      if (!res.ok) {
        const errText = await res.text().catch(() => '');
        throw new Error(`People API error ${res.status}: ${errText || res.statusText}`);
      }

      const json = await res.json();
      return this.mapPeople(json);
    } finally {
      this.searching.set(false);
    }
  }

  // -------------------- Helpers --------------------

  private mapPeople(json: any): GContactPick[] {
    const people = Array.isArray(json?.results) ? json.results : [];
    return people.map((r: any) => {
      const p = r.person || r;
      const nameObj = (p.names && p.names[0]) || {};
      const displayName = nameObj.displayName || null;
      const givenName = nameObj.givenName || null;
      const familyName = nameObj.familyName || null;
      const email = (p.emailAddresses && p.emailAddresses[0]?.value) || null;
      const phone = (p.phoneNumbers && p.phoneNumbers[0]?.value) || null;
      return { displayName, givenName, familyName, email, phone };
    });
  }
}
```

### ./src/app/core/interceptors.ts
```
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';


export const apiErrorInterceptor: HttpInterceptorFn = (req, next) =>
next(req).pipe(
catchError((err: unknown) => {
if (err instanceof HttpErrorResponse) {
const msg = err.error?.message || err.message || 'Errore di rete';
return throwError(() => new Error(msg));
}
return throwError(() => err);
})
);```

### ./src/app/core/notifications/email-notify.service.ts
```
// src/app/core/notifications/email-notify.service.ts
import { Injectable, Inject, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../tokens';
import { Observable, map } from 'rxjs';
import { Reservation } from '../reservations/reservations.service';

@Injectable({ providedIn: 'root' })
export class EmailNotifyService {
  private http = inject(HttpClient);
  constructor(@Inject(API_URL) private baseUrl: string) {}

  /** Mail all'admin quando una prenotazione è PENDING */
  sendReservationPendingAdmin(reservation: Reservation): Observable<{ ok: boolean }> {
    const payload = { kind: 'reservation-pending-admin', reservation };
    return this.http.post<{ ok: boolean }>(`${this.baseUrl}/notifications/email`, payload)
      .pipe(map(res => ({ ok: !!res?.ok })));
  }

  /** Mail al cliente quando una prenotazione è PENDING */
  sendReservationPendingCustomer(reservation: Reservation): Observable<{ ok: boolean }> {
    const payload = { kind: 'reservation-pending-customer', reservation };
    return this.http.post<{ ok: boolean }>(`${this.baseUrl}/notifications/email`, payload)
      .pipe(map(res => ({ ok: !!res?.ok })));
  }
}
```

### ./src/app/core/notifications/whatsapp.service.ts
```
// src/app/core/notifications/whatsapp.service.ts
import { Injectable, Inject, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../tokens';
import { Observable, map } from 'rxjs';
import { Reservation } from '../reservations/reservations.service';

export type WhatsAppProvider = 'twilio' | 'whatsender';

@Injectable({ providedIn: 'root' })
export class WhatsAppService {
  private http = inject(HttpClient);
  constructor(@Inject(API_URL) private baseUrl: string) {}

  /** WhatsApp su prenotazione PENDING */
  sendReservationPending(provider: WhatsAppProvider, reservation: Reservation): Observable<{ ok: boolean }> {
    const url = provider === 'twilio'
      ? `${this.baseUrl}/notifications/whatsapp/twilio`
      : `${this.baseUrl}/notifications/whatsapp/whatsender`;
    const payload = { kind: 'reservation-pending', reservation };
    return this.http.post<{ ok: boolean }>(url, payload).pipe(map(r => ({ ok: !!r?.ok })));
  }
}
```

### ./src/app/core/orders/orders.service.ts
```
// src/app/core/orders/orders.service.ts
// ============================================================================
// Service FE - Ordini (API dell’admin)
// - create(order): POST nuovo ordine
// - list(): GET intestazioni ordini (per la live)
// - updateStatus(id, status): PUT stato
// - stream(): SSE live /api/orders/stream
// ============================================================================

import { Injectable, Inject, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { API_URL } from '../tokens';
import { Order, OrderHeader, OrderInput, OrderStatus, MenuCategory, MenuItem } from './types';

@Injectable({ providedIn: 'root' })
export class OrdersApi {
  private http = inject(HttpClient);
  constructor(@Inject(API_URL) private baseUrl: string) {}

  // (opzionale) menu per il builder; se non disponibile, usa mock lato FE
  getMenu(): Observable<{ categories: MenuCategory[]; items: MenuItem[] }> {
    return this.http.get<{ categories: MenuCategory[]; items: MenuItem[] }>(`${this.baseUrl}/orders/menu`);
  }

  create(dto: OrderInput): Observable<Order> {
    return this.http.post<Order>(`${this.baseUrl}/orders`, dto);
  }

  list(params?: { status?: OrderStatus | 'all' }): Observable<OrderHeader[]> {
    let p = new HttpParams();
    if (params?.status && params.status !== 'all') p = p.set('status', params.status);
    return this.http.get<OrderHeader[]>(`${this.baseUrl}/orders`, { params: p });
  }

  updateStatus(id: number, status: OrderStatus): Observable<OrderHeader> {
    return this.http.put<OrderHeader>(`${this.baseUrl}/orders/${id}/status`, { status });
  }

  // ===== SSE live =====
  stream(handlers: {
    onOpen?: () => void;
    onError?: (e: any) => void;
    onCreated?: (o: OrderHeader) => void;
    onStatus?: (p: { id: number; status: OrderStatus }) => void;
  }): EventSource {
    const es = new EventSource(`${this.baseUrl}/orders/stream`);
    es.onopen = () => handlers.onOpen?.();
    es.onerror = (e) => handlers.onError?.(e as any);
    es.addEventListener('order-created', (ev) => {
      try { handlers.onCreated?.(JSON.parse((ev as MessageEvent).data)); } catch {}
    });
    es.addEventListener('order-status', (ev) => {
      try { handlers.onStatus?.(JSON.parse((ev as MessageEvent).data)); } catch {}
    });
    return es;
  }
}
```

### ./src/app/core/orders/types.ts
```
// src/app/core/orders/types.ts
// ============================================================================
// Tipi condivisi per Ordini (FE)
// - Ordini header / item / input / status
// - Menu (categoria + item) per il builder
// ============================================================================

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'ready'
  | 'completed'
  | 'cancelled';

export interface OrderItemInput {
  product_id?: number | null;
  name: string;
  qty: number;
  price: number;           // € interi/decimali (BE usa DECIMAL(10,2))
  notes?: string | null;
}

export interface OrderHeader {
  id: number;
  customer_name: string;
  phone?: string | null;
  email?: string | null;
  people?: number | null;
  scheduled_at?: string | null; // "YYYY-MM-DD HH:mm:ss"
  note?: string | null;
  channel?: 'online' | 'walkin' | 'phone' | 'admin' | 'kiosk';
  status: OrderStatus;
  total: number;
  created_at?: string;
  updated_at?: string | null;
}

export interface Order extends OrderHeader {
  items: Array<{
    id: number;
    order_id: number;
    product_id?: number | null;
    name: string;
    qty: number;
    price: number;
    notes?: string | null;
    created_at?: string;
  }>;
}

export interface OrderInput {
  customer_name: string;
  phone?: string | null;
  email?: string | null;
  people?: number | null;
  scheduled_at?: string | null;
  note?: string | null;
  channel?: 'online' | 'walkin' | 'phone' | 'admin' | 'kiosk';
  items: OrderItemInput[];
}

export interface MenuCategory {
  id: number;
  name: string;
  sort?: number | null;
}

export interface MenuItem {
  id: number;
  category_id: number;
  name: string;
  price_cents: number; // per il carrello locale (cent)
  description?: string | null;
  sort?: number | null;
}
```

### ./src/app/core/reservations/reservations.service.ts
```
// src/app/core/reservations/reservations.service.ts
// ============================================================================
// Service FE - Prenotazioni
// - Aggiunta hard delete: remove(id,{force?,notify?})
// - Compat: updateStatus(id, action, reason?) e printDaily({date,status})
// - Supporto lookup: listRooms(), listTablesByRoom(roomId)
// - FIX typing: Table.label / Table.capacity, Reservation.table_number / table_name
// - Tracciamento (opz.): created_by / updated_by
// - 🔧 CHANGED: endpoint fallback (/reservations/* -> /rooms, /tables/by-room) + unwrap di updateStatus
// ============================================================================

import { Injectable, inject, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map, catchError } from 'rxjs';
import { API_URL } from '../tokens';

export type ReservationStatus = 'pending' | 'accepted' | 'rejected' | 'cancelled';

export interface Reservation {
  id: number;

  // anagrafica/contatti (presenti anche in BE)
  customer_first?: string | null;
  customer_last?: string | null;
  display_name?: string | null;
  phone?: string | null;
  email?: string | null;

  party_size: number;
  start_at: string;           // ISO
  end_at?: string | null;     // ISO

  room_id?: number | null;
  table_id?: number | null;

  status: ReservationStatus;
  notes?: string | null;

  // audit/tempi
  created_at?: string;
  updated_at?: string;

  // opzionale (tracciamento server: strada B)
  created_by?: string | null;
  updated_by?: string | null;

  // compat template/lista
  table_number?: number | null;
  table_name?: string | null;
}

export interface Room { id: number; name: string; }

export interface Table {
  id: number;
  room_id?: number;
  table_number?: number;
  seats?: number;

  // compat UI
  name?: string;
  label?: string | null;
  capacity?: number | null;
}

export interface ListFilter {
  from?: string; // YYYY-MM-DD
  to?: string;   // YYYY-MM-DD
  status?: ReservationStatus | 'all';
  q?: string;
}

export interface CountByStatusRes {
  pending: number;
  accepted: number;
  rejected: number;
  cancelled: number;
}

export type StatusAction = 'accept' | 'reject' | 'cancel' | 'restore';
export interface StatusChangeBody {
  action: StatusAction;
  reason?: string;
  notify?: boolean;
  email?: string;
  reply_to?: string;
  whatsapp?: boolean;
}

// DTO comodo per il wizard pubblico (facoltativo; è un alias di Partial<Reservation>)
export type CreateReservationPayload = Partial<Reservation>;

@Injectable({ providedIn: 'root' })
export class ReservationsApi {
  private http = inject(HttpClient);
  constructor(@Inject(API_URL) private baseUrl: string) {}

  // -------------------- Helpers ---------------------------------------------

  private enrichTable = (t: Table): Table => ({
    ...t,
    label: t.label ?? t.name ?? (t.table_number != null ? `Tavolo ${t.table_number}` : null),
    capacity: t.capacity ?? (t.seats != null ? Number(t.seats) : null),
  });

  // -------------------- CRUD ------------------------------------------------

  list(filter: ListFilter): Observable<Reservation[]> {
    let params = new HttpParams();
    if (filter.from)   params = params.set('from', filter.from);
    if (filter.to)     params = params.set('to', filter.to);
    if (filter.status && filter.status !== 'all') params = params.set('status', filter.status);
    if (filter.q)      params = params.set('q', filter.q);
    return this.http.get<Reservation[]>(`${this.baseUrl}/reservations`, { params });
  }

  byId(id: number): Observable<Reservation> {
    return this.http.get<Reservation>(`${this.baseUrl}/reservations/${id}`);
  }

  create(dto: CreateReservationPayload): Observable<Reservation> {
    return this.http.post<Reservation>(`${this.baseUrl}/reservations`, dto);
  }

  update(id: number, dto: Partial<Reservation>): Observable<Reservation> {
    return this.http.put<Reservation>(`${this.baseUrl}/reservations/${id}`, dto);
  }

  /** 🗑️ Hard delete — supporta ?force=&notify= */
  remove(id: number, opts?: { force?: boolean; notify?: boolean }): Observable<{ ok: boolean }> {
    let params = new HttpParams();
    if (opts?.force !== undefined)  params = params.set('force',  String(!!opts.force));
    if (opts?.notify !== undefined) params = params.set('notify', String(!!opts.notify));
    return this.http.delete<{ ok: boolean }>(`${this.baseUrl}/reservations/${id}`, { params });
  }

  // -------------------- Stato & Notifiche -----------------------------------

  // Compat: nuovo + legacy
  updateStatus(id: number, body: StatusChangeBody): Observable<Reservation>;
  updateStatus(id: number, action: StatusAction, reason?: string): Observable<Reservation>;
  updateStatus(id: number, a: any, b?: any): Observable<Reservation> {
    const payload = typeof a === 'string' ? { action: a, reason: b } : a;
    // alcuni BE ritornano { ok, reservation }, altri l'oggetto direttamente → unwrap
    return this.http
      .put<any>(`${this.baseUrl}/reservations/${id}/status`, payload)
      .pipe(map(res => (res?.reservation ?? res) as Reservation));
  }

  rejectAndNotify(
    id: number,
    reason: string,
    extra?: { email?: string; reply_to?: string; whatsapp?: boolean }
  ): Observable<{ ok: boolean }> {
    return this.http.post<{ ok: boolean }>(`${this.baseUrl}/reservations/${id}/reject-notify`, {
      reason, ...extra
    });
  }

  // -------------------- Stampe ----------------------------------------------

  /** Compat: printDaily({date,status}) o printDaily(date, status) */
  printDaily(arg1: any, maybeStatus?: ReservationStatus | 'all') {
    const payload = typeof arg1 === 'string'
      ? { date: arg1, status: (maybeStatus || 'all') }
      : arg1;
    return this.http.post(`${this.baseUrl}/reservations/print/daily`, payload)
      .pipe(map(() => ({ ok: true })));
  }

  printPlacecards(date: string, status: ReservationStatus | 'all' = 'accepted') {
    return this.http.post(`${this.baseUrl}/reservations/print/placecards`, { date, status })
      .pipe(map(() => ({ ok: true })));
  }

  printPlacecardOne(id: number) {
    return this.http.post(`${this.baseUrl}/reservations/${id}/print/placecard`, {})
      .pipe(map(() => ({ ok: true })));
  }

  // -------------------- Supporto UI / Lookup --------------------------------

  listRooms(): Observable<Room[]> {
    // Endpoints compat: prima provo /reservations/rooms, poi /rooms
    const primary = this.http.get<Room[]>(`${this.baseUrl}/reservations/rooms`);
    const fallback = () => this.http.get<Room[]>(`${this.baseUrl}/rooms`);
    return primary.pipe(catchError(() => fallback()));
  }

  listTablesByRoom(roomId: number): Observable<Table[]> {
    // Endpoints compat: /reservations/support/tables/by-room/:id → fallback /tables/by-room/:id
    const primary = this.http.get<Table[]>(`${this.baseUrl}/reservations/support/tables/by-room/${roomId}`);
    const fallback = () => this.http.get<Table[]>(`${this.baseUrl}/tables/by-room/${roomId}`);
    return primary.pipe(
      catchError(() => fallback()),
      map(rows => (rows || []).map(this.enrichTable))
    );
  }

  // Alias se altrove già usati
  rooms(): Observable<Room[]> { return this.listRooms(); }

  tables(roomId?: number): Observable<Table[]> {
    if (!roomId) {
      return this.http.get<Table[]>(`${this.baseUrl}/tables`).pipe(
        map((rows) => (rows || []).map(this.enrichTable))
      );
    }
    const params = new HttpParams().set('room_id', String(roomId));
    return this.http.get<Table[]>(`${this.baseUrl}/tables`, { params }).pipe(
      map((rows) => (rows || []).map(this.enrichTable))
    );
  }

  countByStatus(params: { from: string; to: string }): Observable<CountByStatusRes> {
    const p = new HttpParams().set('from', params.from).set('to', params.to);
    // mantengo l'endpoint che già usi sul BE per compat
    return this.http.get<CountByStatusRes>(`${this.baseUrl}/reservations/support/count-by-status`, { params: p })
      // opzionale fallback top-level (se in qualche env è /support/count-by-status)
      .pipe(catchError(() => this.http.get<CountByStatusRes>(`${this.baseUrl}/support/count-by-status`, { params: p })));
  }
}
```

### ./src/app/core/tokens.ts
```
import { InjectionToken } from '@angular/core';
export const API_URL = new InjectionToken<string>('API_URL');```

### ./src/app/environments/environment.prod.ts
```


export const environment = {
  production: true,
  apiBaseUrl: 'https://api.endriazizi.com/api',  // <-- CORRETTO
  devLogin: { enabled: false },
  googleClientId: '512175551489-082s3f7pri0rl9uv0ujkiko31dnoo8o7.apps.googleusercontent.com',
  googleScopes: 'https://www.googleapis.com/auth/contacts.readonly'
};
```

### ./src/app/environments/environment.ts
```
export const environment = {
  production: false,
  apiBaseUrl: '/api',
  devLogin: {
    enabled: true,
    email: 'admin@demo.it',
    password: 'admin',
  },
  googleClientId: '512175551489-082s3f7pri0rl9uv0ujkiko31dnoo8o7.apps.googleusercontent.com',
  googleApiKey: '', // opzionale (non serve per People, ma lo lasciamo per future api)

  // ✅ SCOPES usati dalla People API per leggere i contatti
  googleScopes: 'https://www.googleapis.com/auth/contacts.readonly',
};
```

### ./src/app/features/auth/login.page.html
```
<!-- src/app/features/auth/login.page.html -->
<ion-header>
  <ion-toolbar>
    <ion-title>Login</ion-title>
  </ion-toolbar>
</ion-header>

<ion-content>
  <form [formGroup]="form" (ngSubmit)="onSubmit()" style="max-width:420px; margin:24px auto; padding:16px;">

    <ion-item>
      <ion-label position="stacked">Email</ion-label>
      <ion-input type="email" formControlName="email" placeholder="you@example.com"></ion-input>
    </ion-item>
    <ion-note *ngIf="email.invalid && (email.dirty || email.touched)" color="danger" style="margin-left:8px;">
      Email non valida
    </ion-note>

    <ion-item style="margin-top:12px;">
      <ion-label position="stacked">Password</ion-label>
      <ion-input type="password" formControlName="password" placeholder="••••••••"></ion-input>
    </ion-item>
    <ion-note *ngIf="password.invalid && (password.dirty || password.touched)" color="danger" style="margin-left:8px;">
      Password richiesta
    </ion-note>

    <ion-button expand="block" type="submit" [disabled]="loading() || form.invalid" style="margin-top:16px;">
      {{ loading() ? 'Accesso…' : 'Entra' }}
    </ion-button>

    <p *ngIf="error()" style="color:#dc2626; margin-top:10px;">{{ error() }}</p>
  </form>
</ion-content>
```

### ./src/app/features/auth/login.page.ts
```
// Login semplice, con credenziali precompilate in DEV per velocizzare i test.
// Precedenza prefill: querystring (email/pwd) → environment.devLogin (if enabled) → localStorage('last_email')
// NOTE:
// - Non salviamo MAI la password in storage.
// - In produzione tieni devLogin.disabled o rimuovi le credenziali.
// - Log "parlanti" ma senza mai stampare la password.

import { Component, inject, signal, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

import {
  IonContent, IonHeader, IonToolbar, IonTitle,
  IonItem, IonLabel, IonInput, IonButton, IonNote
} from '@ionic/angular/standalone';

import { AuthService } from '../../core/auth/auth.service';
import { HttpClient } from '@angular/common/http';

// 🔗 ATTENZIONE al path: da features/auth a environments è ../../../
// Se la tua struttura differisce, adegua il percorso di import.
import { environment } from '../../environments/environment';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [
    NgIf, ReactiveFormsModule,
    IonContent, IonHeader, IonToolbar, IonTitle,
    IonItem, IonLabel, IonInput, IonButton, IonNote
  ],
  templateUrl: './login.page.html',
})
export class LoginPage implements OnInit {
  private auth = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);

  loading = signal(false);
  error = signal<string | null>(null);

  // Valori di default MINIMI, poi applyPrefill() applica la precedenza.
  form = new FormGroup({
    email: new FormControl<string>('', {
      nonNullable: true, validators: [Validators.required, Validators.email],
    }),
    password: new FormControl<string>('', {
      nonNullable: true, validators: [Validators.required],
    }),
  });

  get email() { return this.form.controls.email; }
  get password() { return this.form.controls.password; }

  ngOnInit(): void {
    this.applyPrefill(); // 🔥 Applica precedenza QS → devLogin → last_email
  }

  // Applica il prefill secondo la policy concordata
  private applyPrefill() {
    // 1) Querystring
    const qp = this.route.snapshot.queryParamMap;
    const qsEmail = qp.get('email');
    const qsPwd   = qp.get('pwd') ?? qp.get('password');

    if (qsEmail) {
      this.email.setValue(qsEmail);
      console.log('🔧 [LoginPage] Prefill email da querystring.');
    }
    if (qsPwd) {
      this.password.setValue(qsPwd);
      console.log('🔧 [LoginPage] Prefill password da querystring (non loggata).');
    }

    // 2) environment.devLogin (solo se abilitato E se non già coperti da QS)
    const dev = environment?.devLogin as { enabled?: boolean; email?: string; password?: string } | undefined;
    if (dev?.enabled) {
      if (!qsEmail && dev.email) {
        this.email.setValue(dev.email);
        console.log('🧪 [LoginPage] Prefill email da environment.devLogin.');
      }
      if (!qsPwd && dev.password) {
        this.password.setValue(dev.password);
        console.log('🧪 [LoginPage] Prefill password da environment.devLogin (non loggata).');
      }
    }

    // 3) localStorage('last_email') SOLO per l'email (mai password)
    if (!qsEmail && !dev?.email) {
      const last = localStorage.getItem('last_email');
      if (last) {
        this.email.setValue(last);
        console.log('💾 [LoginPage] Prefill email da localStorage(last_email).');
      }
    }
  }

  async onSubmit() {
    if (this.form.invalid) return;

    // (Opzionale) PING di debug lato FE per capire proxy/server
    this.http.get('/api/ping').subscribe({
      next: (v) => console.log('[LoginPage] PING OK', v),
      error: (e) => console.error('[LoginPage] PING KO', e),
    });

    this.loading.set(true);
    this.error.set(null);

    try {
      const { email, password } = this.form.getRawValue();

      console.log('➡️  [LoginPage] Tentativo login per', email);
      await this.auth.login(email, password);

      // Salviamo SOLO l'email per comodità nei login successivi
      localStorage.setItem('last_email', email);

      // Redirect post-login
      const redirect = this.route.snapshot.queryParamMap.get('redirect')
        || '/reservations'; // 👈 se preferisci 'new': '/reservations/new'
      this.router.navigateByUrl(redirect);

    } catch (e: any) {
      this.error.set(e?.message ?? 'Credenziali non valide');
      console.error('❌ [LoginPage] Login error:', e);
    } finally {
      this.loading.set(false);
    }
  }
}
```

### ./src/app/features/auth/logout.page.ts
```
// Standalone "pagina" che esegue il logout all'istante e reindirizza al login.
// Utile se in futuro vuoi linkare /logout da altrove.

import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  standalone: true,
  selector: 'app-logout',
  imports: [IonContent],
  template: `<ion-content class="ion-padding">Uscita…</ion-content>`
})
export class LogoutPage {
  private auth = inject(AuthService);
  private router = inject(Router);

  constructor() {
    console.log('🔐 [LogoutPage] logout immediato');
    this.auth.logout();
    this.router.navigate(['/login'], { queryParams: { redirect: '/diagnostics' } });
  }
}
```

### ./src/app/features/diagnostics/diagnostics.page.ts
```
// import { Component, inject, signal } from '@angular/core';
// import { NgIf, JsonPipe } from '@angular/common';
// import {
//   IonContent, IonHeader, IonToolbar, IonTitle,
//   IonButton, IonSpinner
// } from '@ionic/angular/standalone';
// import { HttpClient } from '@angular/common/http';
// import { firstValueFrom } from 'rxjs';

// @Component({
//   standalone: true,
//   selector: 'app-diagnostics',
//   imports: [NgIf, JsonPipe, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonSpinner],
//   template: `
//     <ion-header>
//       <ion-toolbar>
//         <ion-title>Diagnostics — /api/ping</ion-title>
//       </ion-toolbar>
//     </ion-header>

//     <ion-content>
//       <div style="padding:16px">
//         <!-- Bottone IONIC -->
//         <ion-button id="pingBtn" (click)="testPing()" [disabled]="loading()">Test /api/ping</ion-button>

//         <!-- Stato -->
//         <div *ngIf="loading()" style="margin-top:10px">
//           <ion-spinner></ion-spinner> In corso…
//         </div>
//         <pre *ngIf="result()" style="margin-top:10px; background:#f3f3f3; padding:12px; border-radius:8px">{{ result() | json }}</pre>
//         <p *ngIf="error()" style="margin-top:10px; color:#dc2626">{{ error() }}</p>

//         <!-- Fallback HTML (si vede anche se i CSS Ionic mancassero) -->
//         <button style="margin-top:12px; padding:10px 14px; background:#0ea5e9; color:#fff; border:0; border-radius:6px"
//                 (click)="testPing()">Test /api/ping (HTML)</button>
//       </div>
//     </ion-content>
//   `
// })
// export class DiagnosticsPage {
//   private http = inject(HttpClient);
//   loading = signal(false);
//   result = signal<unknown | null>(null);
//   error = signal<string | null>(null);

//   async testPing() {
//     this.loading.set(true); this.error.set(null); this.result.set(null);
//     try {
//       const res = await firstValueFrom(this.http.get('/api/ping')); // via proxy
//       this.result.set(res);
//     } catch (e: any) {
//       this.error.set(e?.message ?? 'Errore sconosciuto');
//     } finally {
//       this.loading.set(false);
//     }
//   }
// }


import { Component, signal } from '@angular/core';
import { NgIf, JsonPipe } from '@angular/common';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonButton, IonSpinner } from '@ionic/angular/standalone';
import { firstValueFrom } from 'rxjs';
import { ApiService } from '../../core/api.service';


@Component({
standalone: true,
selector: 'app-diagnostics',
imports: [NgIf, JsonPipe, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonSpinner],
template: `
<ion-header><ion-toolbar><ion-title>Diagnostics — /api/ping</ion-title></ion-toolbar></ion-header>
<ion-content>
<div style="padding:16px">
<ion-button (click)="testPing()" [disabled]="loading()">Test /api/ping</ion-button>
<div *ngIf="loading()" style="margin-top:10px"><ion-spinner></ion-spinner> In corso…</div>
<pre *ngIf="result()" style="margin-top:10px; background:#f3f3f3; padding:12px; border-radius:8px">{{ result() | json }}</pre>
<p *ngIf="error()" style="margin-top:10px; color:#dc2626">{{ error() }}</p>
</div>
</ion-content>
`
})
export class DiagnosticsPage {
constructor(private api: ApiService) {}
loading = signal(false);
result = signal<unknown | null>(null);
error = signal<string | null>(null);


async testPing() {
this.loading.set(true); this.error.set(null); this.result.set(null);
try {
const res = await firstValueFrom(this.api.ping());
this.result.set(res);
} catch (e: any) {
this.error.set(e?.message ?? 'Errore sconosciuto');
} finally {
this.loading.set(false);
}
}
}```

### ./src/app/features/orders/order-builder.page.html
```
<ion-header>
  <ion-toolbar>
    <ion-title>Nuovo ordine</ion-title>
    <ion-buttons slot="start">
      <ion-back-button defaultHref="/orders"></ion-back-button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>

<ion-content>
  <div style="max-width:820px;margin:0 auto;padding:12px;">
    <!-- Stepper -->
    <ion-segment [value]="currentStep()">
      <ion-segment-button value="1"><ion-label>Dati</ion-label></ion-segment-button>
      <ion-segment-button value="2"><ion-label>Articoli</ion-label></ion-segment-button>
      <ion-segment-button value="3"><ion-label>Conferma</ion-label></ion-segment-button>
    </ion-segment>

    <div style="height:10px"></div>

    <ng-container [ngSwitch]="currentStep()">
      <!-- STEP 1: Dati cliente -->
      <ng-container *ngSwitchCase="1">
        <ion-list inset="true">
          <ion-item lines="full">
            <ion-label position="stacked">Nome cliente *</ion-label>
            <ion-input placeholder="Mario Rossi"
                       (ionInput)="onNameInput($event)"></ion-input>
          </ion-item>

          <ion-item lines="full" style="margin-top:8px">
            <ion-label position="stacked">Telefono</ion-label>
            <ion-input type="tel" inputmode="tel"
                       placeholder="+39 333 123 4567"
                       (ionInput)="onPhoneInput($event)"></ion-input>
          </ion-item>

          <ion-item lines="full" style="margin-top:8px">
            <ion-label position="stacked">Note</ion-label>
            <ion-textarea autoGrow="true"
                          placeholder="Es. senza cipolla"
                          (ionInput)="onNoteInput($event)"></ion-textarea>
          </ion-item>
        </ion-list>
      </ng-container>

      <!-- STEP 2: Articoli (mock) -->
      <ng-container *ngSwitchCase="2">
        <ion-list inset="true">
          <ion-item>
            <ion-label>Articoli</ion-label>
            <ion-note slot="end">Totale: € {{ total() | number:'1.2-2':'it-IT' }}</ion-note>
          </ion-item>

          <div style="display:flex;gap:8px;padding:12px;flex-wrap:wrap;">
            <ion-button size="default" (click)="addPreset('Margherita', 6.5)">+ Margherita</ion-button>
            <ion-button size="default" (click)="addPreset('Diavola', 7.5)">+ Diavola</ion-button>
            <ion-button size="default" (click)="addPreset('Prosciutto', 8.0)">+ Prosciutto</ion-button>
          </div>

          <ion-item *ngFor="let it of items()" lines="full">
            <ion-label>
              {{ it.name }} × {{ it.qty }}
              <div style="font-size:12px;opacity:.7">€ {{ (it.price * it.qty) | number:'1.2-2':'it-IT' }}</div>
            </ion-label>
            <ion-buttons slot="end">
              <ion-button fill="outline" (click)="decItem(it.name, it.price)">
                <ion-icon name="remove-circle" slot="icon-only"></ion-icon>
              </ion-button>
            </ion-buttons>
          </ion-item>
        </ion-list>
      </ng-container>

      <!-- STEP 3: Conferma -->
      <ng-container *ngSwitchCase="3">
        <ion-list inset="true">
          <ion-item>
            <ion-label>
              <div style="font-weight:600">{{ customerName() || '—' }}</div>
              <div style="font-size:12px;opacity:.7">{{ customerPhone() || '' }}</div>
            </ion-label>
            <ion-note slot="end">Totale: € {{ total() | number:'1.2-2':'it-IT' }}</ion-note>
          </ion-item>

          <ion-item lines="none" *ngFor="let it of items()">
            <ion-label>{{ it.name }} × {{ it.qty }}</ion-label>
            <ion-note slot="end">€ {{ (it.price * it.qty) | number:'1.2-2':'it-IT' }}</ion-note>
          </ion-item>

          <ion-item lines="none" *ngIf="note()">
            <ion-label>Note</ion-label>
            <ion-note slot="end">{{ note() }}</ion-note>
          </ion-item>
        </ion-list>

        <ion-note *ngIf="errorMsg()" color="danger" style="display:block;margin:8px 12px;">
          {{ errorMsg() }}
        </ion-note>

        <div style="padding:12px;">
          <ion-button expand="block" size="large" [disabled]="loading()" (click)="submit()">
            {{ loading() ? 'Invio…' : 'Conferma e crea' }}
          </ion-button>
        </div>
      </ng-container>

      <ng-container *ngSwitchDefault>
        <div style="padding:20px;opacity:.6">Step non valido.</div>
      </ng-container>
    </ng-container>

    <!-- Navigazione step -->
    <div style="display:flex;gap:10px;position:sticky;bottom:0;background:var(--ion-color-step-50,#fff);padding:10px;border-top:1px solid rgba(0,0,0,.06);">
      <ion-button fill="outline" [disabled]="currentStep()===1" (click)="prev()">Indietro</ion-button>
      <ion-button [disabled]="currentStep()===3" (click)="next()">Avanti</ion-button>
    </div>
  </div>
</ion-content>
```

### ./src/app/features/orders/order-builder.page.ts
```
// ============================================================================
// OrderBuilderPage
// - Stepper 1/2/3 (Dati → Articoli → Conferma)
// - Crea ordine via OrdersApi.create() e redirige a /orders
// - Stile: log emoji + commenti chiari
// ============================================================================

import { Component, OnDestroy, signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';

// Angular / Common
import { NgIf, NgFor, DecimalPipe, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';

// Ionic standalone
import {
  IonContent, IonHeader, IonToolbar, IonTitle,
  IonButtons, IonButton, IonBackButton,
  IonSegment, IonSegmentButton, IonLabel,
  IonList, IonItem, IonInput, IonTextarea, IonNote, IonIcon
} from '@ionic/angular/standalone';

import { OrdersApi, } from '../../core/orders/orders.service';
import { OrderInput, OrderItemInput } from '../../core/orders/types';

@Component({
  standalone: true,
  selector: 'app-order-builder',
  templateUrl: './order-builder.page.html',
  imports: [
    // Angular
    NgIf, NgFor, DecimalPipe, NgSwitch, NgSwitchCase, NgSwitchDefault,
    // Ionic
    IonContent, IonHeader, IonToolbar, IonTitle,
    IonButtons, IonButton, IonBackButton,
    IonSegment, IonSegmentButton, IonLabel,
    IonList, IonItem, IonInput, IonTextarea, IonNote, IonIcon,
  ],
})
export class OrderBuilderPage implements OnDestroy {
  private router = inject(Router);
  private api    = inject(OrdersApi);

  // ===== Stepper =============================================================
  readonly currentStep = signal<1 | 2 | 3>(1);
  private clampStep(n: number): 1 | 2 | 3 {
    if (n <= 1) return 1; if (n >= 3) return 3; return (n as 1|2|3);
  }
  next() { this.currentStep.set(this.clampStep(this.currentStep() + 1)); }
  prev() { this.currentStep.set(this.clampStep(this.currentStep() - 1)); }

  // ===== Dati cliente ========================================================
  customerName = signal('');
  customerPhone = signal('');
  note = signal('');

  onNameInput(ev: CustomEvent)  { this.customerName.set(((ev as any).detail?.value ?? '').toString()); }
  onPhoneInput(ev: CustomEvent) { this.customerPhone.set(((ev as any).detail?.value ?? '').toString()); }
  onNoteInput(ev: CustomEvent)  { this.note.set(((ev as any).detail?.value ?? '').toString()); }

  // ===== Articoli (mock semplici per prova end-to-end) ======================
  // Puoi sostituire con un menu reale via OrdersApi.getMenu()
  items = signal<OrderItemInput[]>([]);
  total = computed(() => this.items().reduce((acc, r) => acc + (r.price * r.qty), 0));

  addPreset(name: string, price: number) {
    const copy = [...this.items()];
    const ix = copy.findIndex(i => i.name === name && i.price === price);
    if (ix >= 0) copy[ix] = { ...copy[ix], qty: copy[ix].qty + 1 };
    else copy.push({ name, price, qty: 1 });
    this.items.set(copy);
  }
  decItem(name: string, price: number) {
    const copy = this.items().map(it => ({ ...it }));
    const ix = copy.findIndex(i => i.name === name && i.price === price);
    if (ix < 0) return;
    copy[ix].qty = Math.max(0, copy[ix].qty - 1);
    this.items.set(copy.filter(i => i.qty > 0));
  }

  // ===== Conferma ============================================================
  loading = signal(false);
  errorMsg = signal<string | null>(null);

  async submit() {
    if (!this.customerName().trim()) {
      this.errorMsg.set('Nome cliente obbligatorio');
      this.currentStep.set(1);
      return;
    }
    if (this.items().length === 0) {
      this.errorMsg.set('Aggiungi almeno un articolo');
      this.currentStep.set(2);
      return;
    }

    const payload: OrderInput = {
      customer_name: this.customerName().trim(),
      phone: this.customerPhone().trim() || null,
      note: this.note().trim() || null,
      channel: 'admin',
      items: this.items(),
    };

    this.loading.set(true);
    this.errorMsg.set(null);
    try {
      const order = await this.api.create(payload).toPromise();
      console.log('✅ [OrderBuilder] creato', order);
      // reset rapido
      this.items.set([]);
      this.customerName.set('');
      this.customerPhone.set('');
      this.note.set('');
      // redirect lista
      this.router.navigate(['/orders']);
    } catch (e: any) {
      console.error('💥 [OrderBuilder] create KO', e);
      this.errorMsg.set(e?.message || 'Errore creazione ordine');
    } finally {
      this.loading.set(false);
    }
  }

  ngOnDestroy(): void {}
}
```

### ./src/app/features/orders/orders-live.page.html
```
<ion-header>
  <ion-toolbar>
    <ion-title>Ordini (live)</ion-title>
    <ion-buttons slot="end">
      <ion-button routerLink="/orders/new">Nuovo</ion-button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>

<ion-content>
  <ion-list inset="true" *ngIf="rows().length; else empty">
    <ion-item *ngFor="let o of rows(); trackBy: trackById" lines="full">
      <ion-label>
        <div style="display:flex; align-items:center; gap:10px">
          <ion-badge [color]="statusColor(o.status)">{{ o.status }}</ion-badge>
          <div style="font-weight:600">#{{ o.id }} — {{ o.customer_name }}</div>
        </div>
        <div style="font-size:12px; opacity:.75">
          {{ o.created_at || '' }}
          <span *ngIf="o.phone">· {{ o.phone }}</span>
          <span *ngIf="o.channel">· {{ o.channel }}</span>
        </div>
      </ion-label>
      <ion-note slot="end">Totale: € {{ o.total | number:'1.2-2':'it-IT' }}</ion-note>
    </ion-item>
  </ion-list>

  <ng-template #empty>
    <div style="padding:24px; opacity:.6">Nessun ordine.</div>
  </ng-template>
</ion-content>
```

### ./src/app/features/orders/orders-live.page.ts
```
// ============================================================================
// OrdersLivePage — lista ordini in tempo reale (SSE)
// - Prima carica la lista (headers)
// - Poi si iscrive allo stream /api/orders/stream
// ============================================================================

import { Component, OnDestroy, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

// Angular / Common
import { NgIf, NgFor, DecimalPipe } from '@angular/common';

// Ionic
import {
  IonContent, IonHeader, IonToolbar, IonTitle,
  IonList, IonItem, IonLabel, IonNote, IonBadge, IonButtons, IonButton
} from '@ionic/angular/standalone';

import { OrdersApi } from '../../core/orders/orders.service';
import { OrderHeader } from '../../core/orders/types';

@Component({
  standalone: true,
  selector: 'app-orders-live',
  templateUrl: './orders-live.page.html',
  imports: [
    // Angular
    NgIf, NgFor, DecimalPipe, RouterLink,
    // Ionic
    IonContent, IonHeader, IonToolbar, IonTitle,
    IonList, IonItem, IonLabel, IonNote, IonBadge, IonButtons, IonButton,
  ]
})
export class OrdersLivePage implements OnDestroy {
  private api = inject(OrdersApi);

  rows = signal<OrderHeader[]>([]);
  es?: EventSource;

  trackById = (_: number, r: OrderHeader) => r.id;

  statusColor(s: string) {
    switch (s) {
      case 'pending':   return 'warning';
      case 'confirmed': return 'tertiary';
      case 'preparing': return 'primary';
      case 'ready':     return 'success';
      case 'completed': return 'medium';
      case 'cancelled': return 'danger';
      default:          return 'medium';
    }
  }

  // Ionic lifecycle
  async ionViewWillEnter() {
    // 1) primo caricamento
    this.api.list().subscribe({
      next: (rows: OrderHeader[]) => this.rows.set(rows || []),
      error: (e) => console.error('💥 [OrdersLive] list KO', e),
    });

    // 2) stream SSE
    this.es = this.api.stream({
      onOpen:  () => console.log('🧵 [SSE] connesso'),
      onError: (e) => console.warn('🧵 [SSE] errore', e),
      onCreated: (o) => {
        console.log('🧵 event: order-created', o);
        this.rows.set([o, ...this.rows()]);
      },
      onStatus: (p) => {
        console.log('🧵 event: order-status', p);
        const copy = [...this.rows()];
        const idx = copy.findIndex(r => r.id === p.id);
        if (idx >= 0) { copy[idx] = { ...copy[idx], status: p.status as any }; this.rows.set(copy); }
      }
    });
  }

  ngOnDestroy() {
    if (this.es) { this.es.close(); this.es = undefined; }
  }
}
```

### ./src/app/features/orders/state/cart.store.ts
```
// src/app/features/orders/state/cart.store.ts
// ============================================================================
// CartStore — stato locale del carrello con signals
// - add/remove/setQty
// - total calcolato in centesimi
// ============================================================================

import { Injectable, signal, computed } from '@angular/core';
import { MenuItem } from '../../../core/orders/types';

export interface CartRow {
  item: MenuItem;
  qty: number;
  notes?: string | null;
}

@Injectable({ providedIn: 'root' })
export class CartStore {
  rows = signal<CartRow[]>([]);

  totalCents = computed(() =>
    this.rows().reduce((acc, r) => acc + r.item.price_cents * r.qty, 0)
  );

  add(item: MenuItem) {
    const copy = [...this.rows()];
    const i = copy.findIndex(r => r.item.id === item.id);
    if (i >= 0) copy[i] = { ...copy[i], qty: copy[i].qty + 1 };
    else copy.push({ item, qty: 1 });
    this.rows.set(copy);
  }

  dec(itemId: number) {
    const copy = this.rows().map(r => ({ ...r }));
    const i = copy.findIndex(r => r.item.id === itemId);
    if (i < 0) return;
    copy[i].qty = Math.max(0, copy[i].qty - 1);
    const filtered = copy.filter(r => r.qty > 0);
    this.rows.set(filtered);
  }

  remove(itemId: number) {
    this.rows.set(this.rows().filter(r => r.item.id !== itemId));
  }

  setNotes(itemId: number, notes: string | null) {
    const copy = this.rows().map(r => r.item.id === itemId ? { ...r, notes } : r);
    this.rows.set(copy);
  }

  clear() { this.rows.set([]); }
}
```

### ./src/app/features/public-booking/public-booking.page.html
```
<ion-header>
  <ion-toolbar>
    <ion-title>PRENOTA SUBITO IL TUO TAVOLO !</ion-title>
  </ion-toolbar>
</ion-header>

<ion-content [fullscreen]="true">
  <div style="max-width:760px;margin:0 auto;padding:12px;">

    <!-- Stepper -->
    <div style="display:flex;align-items:center;gap:10px;justify-content:space-between;margin:10px 4px 2px;">
      <div style="display:flex;align-items:center;gap:6px;font-weight:600;">
        <ion-badge color="danger" *ngIf="step()<=3">1</ion-badge>
        <ion-badge color="medium" *ngIf="step()>3">1</ion-badge>
        <span>CONTATTI</span>
      </div>
      <div style="height:2px;background:#eee;flex:1;margin:0 8px;"></div>
      <div style="display:flex;align-items:center;gap:6px;font-weight:600;">
        <ion-badge color="danger" *ngIf="step()>3 && step()<=8">2</ion-badge>
        <ion-badge color="medium" *ngIf="step()<=3 || step()>8">2</ion-badge>
        <span>PRENOTAZIONE</span>
      </div>
      <div style="height:2px;background:#eee;flex:1;margin:0 8px;"></div>
      <div style="display:flex;align-items:center;gap:6px;font-weight:600;">
        <ion-badge color="danger" *ngIf="step()>8">3</ion-badge>
        <ion-badge color="medium" *ngIf="step()<=8">3</ion-badge>
        <span>CONFERMA</span>
      </div>
    </div>
    <ion-progress-bar [value]="progress()"></ion-progress-bar>

    <div style="height:10px;"></div>

    <ion-card>
      <ion-card-header>
        <ion-card-title>
          <ng-container [ngSwitch]="step()">
            <span *ngSwitchCase="1">Contatti · Nome e Cognome</span>
            <span *ngSwitchCase="2">Contatti · Telefono</span>
            <span *ngSwitchCase="3">Contatti · Email</span>
            <span *ngSwitchCase="4">Prenotazione · Persone</span>
            <span *ngSwitchCase="5">Prenotazione · Data</span>
            <span *ngSwitchCase="6">Prenotazione · Orario</span>
            <span *ngSwitchCase="7">Prenotazione · Motivo</span>
            <span *ngSwitchCase="8">Prenotazione · Intolleranze</span>
            <span *ngSwitchDefault>Conferma · Note & Consensi</span>
          </ng-container>
        </ion-card-title>
      </ion-card-header>

      <ion-card-content>

        <!-- STEP 1: Nome + Cognome -->
        <ng-container *ngIf="step()===1">
          <ion-item>
            <ion-label position="stacked">Nome *</ion-label>
            <ion-input [formControl]="form.controls.customer_first" autocomplete="given-name"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">Cognome *</ion-label>
            <ion-input [formControl]="form.controls.customer_last" autocomplete="family-name"></ion-input>
          </ion-item>
        </ng-container>

        <!-- STEP 2: Telefono -->
        <ng-container *ngIf="step()===2">
          <ion-item>
            <ion-label position="stacked">Prefisso *</ion-label>
            <ion-select interface="popover" [formControl]="form.controls.phone_cc">
              <ion-select-option value="+39">🇮🇹 +39</ion-select-option>
            </ion-select>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">Numero di telefono *</ion-label>
            <ion-input [formControl]="form.controls.phone_raw" inputmode="numeric" placeholder="es. 3899988888"></ion-input>
          </ion-item>
          <ion-note color="medium">Usiamo il tuo numero solo per comunicazioni sulla prenotazione.</ion-note>
        </ng-container>

        <!-- STEP 3: Email -->
        <ng-container *ngIf="step()===3">
          <ion-item>
            <ion-label position="stacked">Email *</ion-label>
            <ion-input [formControl]="form.controls.email" type="email" autocomplete="email" placeholder="nome@dominio.it"></ion-input>
          </ion-item>
        </ng-container>

        <!-- STEP 4: Persone -->
        <ng-container *ngIf="step()===4">
          <ion-item>
            <ion-label position="stacked">Persone *</ion-label>
            <ion-input [formControl]="form.controls.party_size" inputmode="numeric" type="number" min="1"></ion-input>
          </ion-item>
        </ng-container>

        <!-- STEP 5: Data -->
        <ng-container *ngIf="step()===5">
          <ion-item>
            <ion-label position="stacked">Data *</ion-label>
            <ion-datetime presentation="date" [formControl]="form.controls.date"></ion-datetime>
          </ion-item>
        </ng-container>

        <!-- STEP 6: Orario -->
        <ng-container *ngIf="step()===6">
          <ion-item>
            <ion-label position="stacked">Orario *</ion-label>
            <ion-select interface="popover" [formControl]="form.controls.time" placeholder="Seleziona…">
              <ion-select-option *ngFor="let s of slots()" [value]="s">{{ s }}</ion-select-option>
            </ion-select>
          </ion-item>
          <ion-note color="medium">Se non vedi l’orario desiderato, scegli il più vicino e scrivilo nelle note.</ion-note>
        </ng-container>

        <!-- STEP 7: Motivo (ion-radio-group) -->
        <ng-container *ngIf="step()===7">
          <ion-list>
            <ion-radio-group [value]="form.controls.reason.value"
                             (ionChange)="form.controls.reason.setValue($event.detail.value)">
              <ion-item>
                <ion-label>Cena</ion-label>
                <ion-radio slot="start" value="Cena"></ion-radio>
              </ion-item>
              <ion-item>
                <ion-label>Compleanno</ion-label>
                <ion-radio slot="start" value="Compleanno"></ion-radio>
              </ion-item>
              <ion-item>
                <ion-label>In famiglia</ion-label>
                <ion-radio slot="start" value="In famiglia"></ion-radio>
              </ion-item>
              <ion-item>
                <ion-label>Cena di lavoro</ion-label>
                <ion-radio slot="start" value="Cena di lavoro"></ion-radio>
              </ion-item>
              <ion-item>
                <ion-label>Cena di coppia</ion-label>
                <ion-radio slot="start" value="Cena di coppia"></ion-radio>
              </ion-item>
            </ion-radio-group>
          </ion-list>
        </ng-container>

        <!-- STEP 8: Intolleranze (ion-checkbox) -->
        <ng-container *ngIf="step()===8">
          <ion-list>
            <ion-item>
              <ion-label>Lattosio</ion-label>
              <ion-checkbox slot="start"
                            [checked]="form.value.intolerances?.lattosio"
                            (ionChange)="toggleIntolerance('lattosio', $event.detail.checked)">
              </ion-checkbox>
            </ion-item>
            <ion-item>
              <ion-label>Celiachia</ion-label>
              <ion-checkbox slot="start"
                            [checked]="form.value.intolerances?.celiaco"
                            (ionChange)="toggleIntolerance('celiaco', $event.detail.checked)">
              </ion-checkbox>
            </ion-item>
            <ion-item>
              <ion-label>Arachidi</ion-label>
              <ion-checkbox slot="start"
                            [checked]="form.value.intolerances?.arachidi"
                            (ionChange)="toggleIntolerance('arachidi', $event.detail.checked)">
              </ion-checkbox>
            </ion-item>
          </ion-list>
        </ng-container>

        <!-- STEP 9: Note + Consensi -->
        <ng-container *ngIf="step()===9">
          <ion-item>
            <ion-label position="stacked">Note / Richieste</ion-label>
            <ion-textarea [formControl]="form.controls.notes" rows="5" placeholder="Es. passeggino, tavolo vicino finestra…"></ion-textarea>
          </ion-item>

          <div style="height:8px;"></div>

          <ion-item>
            <ion-label><b>Autorizzo tutti i trattamenti</b></ion-label>
            <ion-checkbox slot="start"
                          [checked]="form.controls.consent_all.value"
                          (ionChange)="onToggleAllConsents($event.detail.checked)">
            </ion-checkbox>
          </ion-item>
          <ion-item>
            <ion-label>Marketing e comunicazioni</ion-label>
            <ion-checkbox slot="start"
                          [checked]="form.controls.consent_marketing.value"
                          (ionChange)="form.controls.consent_marketing.setValue($event.detail.checked)">
            </ion-checkbox>
          </ion-item>
          <ion-item>
            <ion-label>Profilazione</ion-label>
            <ion-checkbox slot="start"
                          [checked]="form.controls.consent_profiling.value"
                          (ionChange)="form.controls.consent_profiling.setValue($event.detail.checked)">
            </ion-checkbox>
          </ion-item>
          <ion-item>
            <ion-label>Privacy e trattamento dati *</ion-label>
            <ion-checkbox slot="start"
                          [checked]="form.controls.consent_privacy.value"
                          (ionChange)="form.controls.consent_privacy.setValue($event.detail.checked)">
            </ion-checkbox>
          </ion-item>
          <ion-note color="medium">La spunta su “Autorizzo tutti” imposta automaticamente tutte le caselle sopra.</ion-note>
        </ng-container>

      </ion-card-content>
    </ion-card>

    <!-- Navigazione -->
    <div style="display:flex;gap:12px;justify-content:space-between;position:sticky;bottom:12px;margin-top:8px;">
      <ion-button color="danger" fill="solid" (click)="prev()" [disabled]="step()===1">
        <ion-icon name="chevron-back" slot="start"></ion-icon>
        INDIETRO
      </ion-button>

      <ion-button color="success" (click)="next()" [disabled]="!canGoNext()">
        <ng-container *ngIf="step()<9">
          AVANTI
          <ion-icon name="chevron-forward" slot="end"></ion-icon>
        </ng-container>
        <ng-container *ngIf="step()===9">
          CONTINUA
          <ion-icon name="checkmark" slot="end"></ion-icon>
        </ng-container>
      </ion-button>
    </div>

    <div style="height:10px;"></div>
  </div>
</ion-content>
```

### ./src/app/features/public-booking/public-booking.page.ts
```
// ============================================================================
// Public Booking Wizard (no-auth)
// Macro-step: CONTATTI · PRENOTAZIONE · CONFERMA
// Steps:
// 1) Nome + Cognome (obbligatori)
// 2) Telefono (prefisso + numero) (obbligatorio, IT +39 default)
// 3) Email (obbligatoria)
// 4) Numero persone
// 5) Data (default oggi)
// 6) Orario (time slots 30’ 18:00→23:00)
// 7) Motivo (radio)
// 8) Intolleranze (checklist)
// 9) Note + Consensi (privacy obbligatoria)
// Submit: crea Reservation con “Fonte: Online” e redirect a /prenota/grazie
// ============================================================================

import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';

// Angular common (⚠️ includo anche NgSwitch*)
import {
  NgIf, NgFor, AsyncPipe, DatePipe,
  NgSwitch, NgSwitchCase, NgSwitchDefault
} from '@angular/common';

// Ionic
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonItem, IonLabel, IonInput, IonButton, IonIcon, IonList,
  IonSelect, IonSelectOption, IonTextarea, IonNote, IonBadge,
  IonButtons, IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  IonDatetime, IonProgressBar, IonCheckbox, IonRadio, IonRadioGroup
} from '@ionic/angular/standalone';

import { ReservationsApi, Reservation } from '../../core/reservations/reservations.service';

// utils locali
function todayISO() {
  const t = new Date();
  const y = t.getFullYear();
  const m = String(t.getMonth()+1).padStart(2,'0');
  const d = String(t.getDate()).padStart(2,'0');
  return `${y}-${m}-${d}`;
}
function addMinutes(dt: Date, min: number) { const c = new Date(dt); c.setMinutes(c.getMinutes()+min); return c; }
function fmtHHMM(d: Date) { return `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`; }

@Component({
  standalone: true,
  selector: 'app-public-booking',
  templateUrl: './public-booking.page.html',
  imports: [
    // Angular
    ReactiveFormsModule, NgIf, NgFor, AsyncPipe, DatePipe,
    NgSwitch, NgSwitchCase, NgSwitchDefault, RouterLink,
    // Ionic
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonItem, IonLabel, IonInput, IonButton, IonIcon, IonList,
    IonSelect, IonSelectOption, IonTextarea, IonNote, IonBadge,
    IonButtons, IonCard, IonCardHeader, IonCardTitle, IonCardContent,
    IonDatetime, IonProgressBar, IonCheckbox, IonRadio, IonRadioGroup
  ]
})
export class PublicBookingPage implements OnInit {
  private fb = inject(FormBuilder);
  private api = inject(ReservationsApi);
  private router = inject(Router);

  step = signal(1);
  readonly maxStep = 9;

  // breadcrumb macro-step
  macro = computed(() => (this.step() <= 3 ? 'CONTATTI' : this.step() <= 8 ? 'PRENOTAZIONE' : 'CONFERMA'));
  progress = computed(() => this.step() / this.maxStep);

  // slot orari (18:00 → 23:00, ogni 30’)
  slots = signal<string[]>([]);
  private slotCfg = { start: '18:00', end: '23:00', deltaMin: 30 };

  form = this.fb.group({
    customer_first: ['', [Validators.required, Validators.minLength(2)]],
    customer_last:  ['', [Validators.required, Validators.minLength(2)]],
    phone_cc: ['+39', [Validators.required]],
    phone_raw: ['', [Validators.required, Validators.pattern(/^\d{6,13}$/)]],
    email: ['', [Validators.required, Validators.email]],
    party_size: [2, [Validators.required, Validators.min(1)]],
    date: [todayISO(), [Validators.required]],
    time: ['', [Validators.required]],
    reason: [''],
    intolerances: this.fb.group({
      lattosio: [false],
      celiaco:  [false],
      arachidi: [false],
    }),
    notes: [''],
    consent_all: [false],
    consent_marketing: [false],
    consent_profiling: [false],
    consent_privacy: [false],
  });

  // master toggle → sincronizza i singoli
  onToggleAllConsents(val: boolean) {
    this.form.patchValue({
      consent_marketing: val,
      consent_profiling: val,
      consent_privacy:  val
    }, { emitEvent: false });
  }
  refreshMasterConsent() {
    const v = this.form.getRawValue();
    const all = !!(v.consent_marketing && v.consent_profiling && v.consent_privacy);
    if (v.consent_all !== all) this.form.patchValue({ consent_all: all }, { emitEvent: false });
  }
  // helper per checklist intolleranze (evita template troppo verboso)
  toggleIntolerance(key: 'lattosio'|'celiaco'|'arachidi', checked: boolean) {
    (this.form.controls.intolerances as any).patchValue({ [key]: checked });
  }

  ngOnInit() {
    this.rebuildSlots();
    // sync master consent
    this.form.get('consent_marketing')!.valueChanges.subscribe(() => this.refreshMasterConsent());
    this.form.get('consent_profiling')!.valueChanges.subscribe(() => this.refreshMasterConsent());
    this.form.get('consent_privacy')!.valueChanges.subscribe(() => this.refreshMasterConsent());
    // ricalcola slot quando cambia la data
    this.form.get('date')!.valueChanges.subscribe(() => this.rebuildSlots());
  }

  private rebuildSlots() {
    const out: string[] = [];
    const [sh, sm] = this.slotCfg.start.split(':').map(n => parseInt(n, 10));
    const [eh, em] = this.slotCfg.end.split(':').map(n => parseInt(n, 10));
    let t = new Date(); t.setHours(sh, sm, 0, 0);
    const end = new Date(); end.setHours(eh, em, 0, 0);
    while (t <= end) { out.push(fmtHHMM(t)); t = addMinutes(t, this.slotCfg.deltaMin); }
    this.slots.set(out);
    // se il time corrente non è più valido → reset
    const current = this.form.controls.time.value;
    if (current && !out.includes(current)) this.form.controls.time.setValue('');
  }

  canGoNext(): boolean {
    const s = this.step();
    const c = this.form.controls;
    if (s === 1) return c.customer_first.valid && c.customer_last.valid;
    if (s === 2) return c.phone_cc.valid && c.phone_raw.valid;
    if (s === 3) return c.email.valid;
    if (s === 4) return c.party_size.valid;
    if (s === 5) return c.date.valid;
    if (s === 6) return c.time.valid;
    if (s === 7) return true;
    if (s === 8) return true;
    if (s === 9) return !!c.consent_privacy.value; // privacy obbligatoria
    return true;
  }

  next() {
    if (!this.canGoNext()) return;
    if (this.step() < this.maxStep) this.step.update(n => n + 1);
    else this.submit();
  }
  prev() { if (this.step() > 1) this.step.update(n => n - 1); }

  async submit() {
    if (!this.canGoNext()) return;

    const v = this.form.getRawValue();
    if (!v.time) return; // guard TS

    const start = `${v.date} ${v.time}:00`;
    const [h, m] = v.time.split(':').map(n => parseInt(n, 10));
    const base = new Date(`${v.date}T${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:00`);
    const endAt = addMinutes(base, 90);
    const end = `${v.date} ${fmtHHMM(endAt)}:00`;

    const intoleranze: string[] = [];
    if (v.intolerances?.lattosio) intoleranze.push('lattosio');
    if (v.intolerances?.celiaco)  intoleranze.push('celiaco');
    if (v.intolerances?.arachidi) intoleranze.push('arachidi');

    const notesArr: string[] = [];
    if (v.reason) notesArr.push(`Motivo: ${v.reason}`);
    if (intoleranze.length) notesArr.push(`Intolleranze: ${intoleranze.join(', ')}`);
    if (v.notes) notesArr.push(`Note: ${v.notes}`);
    notesArr.push('Fonte: Online');

    const payload: Partial<Reservation> = {
      customer_first: (v.customer_first ?? '').trim(),
      customer_last : (v.customer_last  ?? '').trim(),
      email: v.email || null,
      phone: `${v.phone_cc}${v.phone_raw}`,
      party_size: Number(v.party_size || 1),
      start_at: start,
      end_at: end,
      notes: notesArr.join(' — ')
    };

    try {
      const r = await firstValueFrom(this.api.create(payload));
      this.router.navigate(['/prenota/grazie'], {
        queryParams: {
          id: r.id,
          name: `${r.customer_first || ''} ${r.customer_last || ''}`.trim(),
          date: (r.start_at || '').slice(0,10),
          time: (r.start_at || '').slice(11,16),
          party: r.party_size || 1
        },
        replaceUrl: true
      });
    } catch (err) {
      console.error('❌ Invio prenotazione fallito', err);
      alert('Invio non riuscito. Riprova tra poco.');
    }
  }
}
```

### ./src/app/features/public-booking/thank-you.page.html
```
<ion-header>
  <ion-toolbar>
    <ion-title>Grazie!</ion-title>
  </ion-toolbar>
</ion-header>

<ion-content [fullscreen]="true">
  <div style="max-width:760px;margin:16px auto;padding:12px;">
    <ion-card>
      <ion-card-header>
        <ion-card-title style="display:flex;align-items:center;gap:8px;">
          ✅ Prenotazione inviata
        </ion-card-title>
      </ion-card-header>

      <ion-card-content>
        <p *ngIf="name">Ciao <b>{{ name }}</b>!</p>
        <p>Ti aspettiamo il <b>{{ date }}</b> alle <b>{{ time }}</b> — {{ party }} persone.</p>

        <div style="height:8px;"></div>

        <div style="display:flex;flex-wrap:wrap;gap:10px;">
          <a [href]="icsHref()" download="prenotazione.ics">
            <ion-button>
              + Aggiungi al calendario
            </ion-button>
          </a>

          <a [href]="mapsUrl" target="_blank" rel="noopener">
            <ion-button color="medium" fill="outline">
              Indicazioni stradali
            </ion-button>
          </a>

          <ion-button color="success" [routerLink]="['/prenota']">
            Nuova prenotazione
          </ion-button>

          <ion-button color="medium" fill="clear" (click)="goHome()">
            Chiudi
          </ion-button>
        </div>

        <div style="opacity:.7;margin-top:12px;">
          In caso di ritardo, ti chiediamo cortesia di avvisare. Grazie!
        </div>
      </ion-card-content>
    </ion-card>
  </div>
</ion-content>
```

### ./src/app/features/public-booking/thank-you.page.ts
```
import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import {
  IonContent, IonHeader, IonToolbar, IonTitle,
  IonButton, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardContent
} from '@ionic/angular/standalone';

@Component({
  standalone: true,
  selector: 'app-thank-you',
  templateUrl: './thank-you.page.html',
  imports: [
    NgIf, RouterLink,
    IonContent, IonHeader, IonToolbar, IonTitle,
    IonButton, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardContent
  ]
})
export class ThankYouPage {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  id   = this.route.snapshot.queryParamMap.get('id') || '';
  name = this.route.snapshot.queryParamMap.get('name') || '';
  date = this.route.snapshot.queryParamMap.get('date') || '';
  time = this.route.snapshot.queryParamMap.get('time') || '';
  party = Number(this.route.snapshot.queryParamMap.get('party') || 1);

  icsHref = computed(() => {
    if (!this.date || !this.time) return '';
    const start = this.toICS(`${this.date} ${this.time}:00`);
    const end   = this.toICS(this.addMinutesString(`${this.date} ${this.time}:00`, 90));
    const lines = [
      'BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Pienissimo//Booking//IT',
      'BEGIN:VEVENT',
      `UID:pienissimo-${this.id}@booking`,
      `DTSTART:${start}`,
      `DTEND:${end}`,
      `SUMMARY:Prenotazione tavolo${this.name ? ' — ' + this.name : ''}`,
      'END:VEVENT','END:VCALENDAR'
    ].join('\r\n');
    return 'data:text/calendar;charset=utf-8,' + encodeURIComponent(lines);
  });

  mapsUrl = 'https://www.google.com/maps/search/?api=1&query=Pienissimo';

  private toICS(dt: string) {
    const [d, t] = dt.split(' ');
    return d.replaceAll('-','') + 'T' + t.replaceAll(':','');
  }
  private addMinutesString(dt: string, min: number) {
    const [d, t] = dt.split(' ');
    const [H, M] = t.split(':').map(n => parseInt(n,10));
    const base = new Date(`${d}T${String(H).padStart(2,'0')}:${String(M).padStart(2,'0')}:00`);
    base.setMinutes(base.getMinutes() + min);
    const y = base.getFullYear();
    const mo = String(base.getMonth()+1).padStart(2,'0');
    const da = String(base.getDate()).padStart(2,'0');
    const hh = String(base.getHours()).padStart(2,'0');
    const mm = String(base.getMinutes()).padStart(2,'0');
    return `${y}-${mo}-${da} ${hh}:${mm}:00`;
  }

  goHome() { this.router.navigateByUrl('/'); }
}
```

### ./src/app/features/reservations/_components/filter-sheet/filter-sheet.component.ts
```
// Bottom sheet per filtri: preset (oggi/7d/tutte/custom), stato, range custom.
// Standalone, aperto con ModalController. Ritorna {preset,status,from,to}.
//
// NOTE UX:
// - Footer fisso in basso (ion-footer) → i pulsanti "Applica/Pulisci" restano
//   SEMPRE visibili anche quando il calendario occupa spazio in verticale.
// - Nessuna logica "complessa" nel template: gli handler TS gestiscono i valori
//   di ion-datetime (che possono essere string|string[]|null).

import { Component, Input, OnInit, inject, signal, WritableSignal } from '@angular/core';
import { NgIf } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonButtons, IonButton,
  IonContent, IonItem, IonLabel, IonSelect, IonSelectOption,
  IonList, IonDatetime, IonFooter
} from '@ionic/angular/standalone';
import { ModalController } from '@ionic/angular';
import { ReservationStatus } from '../../../../core/reservations/reservations.service';

export type FilterPreset = 'today'|'7d'|'all'|'custom';
export interface FilterSheetResult {
  preset: FilterPreset;
  status: ReservationStatus|'all';
  from?: string;
  to?: string;
}

@Component({
  standalone: true,
  selector: 'app-filter-sheet',
  template: `
<ion-header>
  <ion-toolbar>
    <ion-title>Filtri</ion-title>
    <ion-buttons slot="end">
      <ion-button (click)="dismissClear()" fill="clear">Pulisci</ion-button>
      <ion-button (click)="dismissCancel()" fill="clear">Chiudi</ion-button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>

<ion-content>
  <ion-list inset="true" style="margin-top:8px;">
    <ion-item>
      <ion-label position="stacked">Periodo</ion-label>
      <ion-select [value]="presetSig()" (ionChange)="onPreset($event)" interface="popover">
        <ion-select-option value="today">Oggi</ion-select-option>
        <ion-select-option value="7d">Ultimi 7 giorni</ion-select-option>
        <ion-select-option value="all">Tutte</ion-select-option>
        <ion-select-option value="custom">Intervallo…</ion-select-option>
      </ion-select>
    </ion-item>

    <div *ngIf="presetSig()==='custom'">
      <ion-item style="margin-top:8px;">
        <ion-label position="stacked">Dal</ion-label>
        <ion-datetime
          presentation="date"
          [value]="fromSig() || ''"
          (ionChange)="onFromChange($event)">
        </ion-datetime>
      </ion-item>

      <ion-item style="margin-top:8px;">
        <ion-label position="stacked">Al</ion-label>
        <ion-datetime
          presentation="date"
          [value]="toSig() || ''"
          (ionChange)="onToChange($event)">
        </ion-datetime>
      </ion-item>
    </div>

    <ion-item style="margin-top:12px;">
      <ion-label position="stacked">Stato</ion-label>
      <ion-select
        [value]="statusSig()"
        (ionChange)="statusSig.set($event.detail.value)"
        interface="popover">
        <ion-select-option value="all">Tutti</ion-select-option>
        <ion-select-option value="pending">In attesa</ion-select-option>
        <ion-select-option value="accepted">Accettate</ion-select-option>
        <ion-select-option value="rejected">Rifiutate</ion-select-option>
        <ion-select-option value="cancelled">Cancellate</ion-select-option>
      </ion-select>
    </ion-item>
  </ion-list>
</ion-content>

<!-- Footer STICKY: i bottoni sono sempre accessibili su mobile -->
<ion-footer class="ion-padding">
  <div style="display:flex; gap:8px; justify-content:flex-end;">
    <ion-button fill="outline" (click)="dismissClear()">Pulisci</ion-button>
    <ion-button (click)="apply()">Applica</ion-button>
  </div>
</ion-footer>
  `,
  imports: [
    NgIf,
    IonHeader, IonToolbar, IonTitle, IonButtons, IonButton,
    IonContent, IonItem, IonLabel, IonSelect, IonSelectOption,
    IonList, IonDatetime, IonFooter
  ]
})
export class FilterSheetComponent implements OnInit {
  private modal = inject(ModalController);

  // Input iniziali dal chiamante
  @Input() preset: FilterPreset = 'today';
  @Input() status: ReservationStatus|'all' = 'all';
  @Input() from?: string | null;
  @Input() to?: string | null;

  // State (signals) — nomi diversi dagli @Input
  presetSig: WritableSignal<FilterPreset> = signal<FilterPreset>('today');
  statusSig: WritableSignal<ReservationStatus|'all'> = signal<ReservationStatus|'all'>('all');
  fromSig:   WritableSignal<string | undefined> = signal<string|undefined>(undefined);
  toSig:     WritableSignal<string | undefined> = signal<string|undefined>(undefined);

  ngOnInit() {
    this.presetSig.set(this.preset ?? 'today');
    this.statusSig.set(this.status ?? 'all');
    this.fromSig.set(this.from || undefined);
    this.toSig.set(this.to || undefined);
  }

  onPreset(ev: any) {
    const v = (ev?.detail?.value as FilterPreset) ?? 'today';
    this.presetSig.set(v);
    if (v !== 'custom') { this.fromSig.set(undefined); this.toSig.set(undefined); }
  }

  // Normalizza valore da ion-datetime (string|string[]|null) → 'YYYY-MM-DD' | undefined
  private extractYmd(val: unknown): string | undefined {
    const raw = Array.isArray(val) ? (val[0] ?? null) : (val as string | null);
    const s = (raw ?? '').toString();
    const ymd = s.slice(0, 10);
    return ymd || undefined;
  }

  onFromChange(ev: any) { this.fromSig.set(this.extractYmd(ev?.detail?.value)); }
  onToChange(ev: any)   { this.toSig.set(this.extractYmd(ev?.detail?.value)); }

  dismissCancel() { this.modal.dismiss(undefined, 'cancel'); }
  dismissClear()  { this.modal.dismiss(undefined, 'clear'); }

  apply() {
    const res: FilterSheetResult = {
      preset: this.presetSig(),
      status: this.statusSig(),
      from: this.presetSig()==='custom' ? (this.fromSig() || undefined) : undefined,
      to:   this.presetSig()==='custom' ? (this.toSig()   || undefined) : undefined,
    };
    this.modal.dismiss(res, 'apply');
  }
}
```

### ./src/app/features/reservations/_components/gcontacts-autocomplete/gcontacts-autocomplete.component.html
```
<!-- src/app/features/reservations/_components/gcontacts-autocomplete/gcontacts-autocomplete.component.html -->

<ion-searchbar
  [placeholder]="placeholder"
  [value]="query()"
  (ionInput)="onInput($event)"
  (ionClear)="onInput($event)"
  showCancelButton="never"
  inputmode="search"
  enterkeyhint="search"
  animated="true">
</ion-searchbar>

<!-- Lista risultati -->
<ion-list *ngIf="showList()">
  <!-- Spinner in testa se il parent sta cercando -->
  <ion-item *ngIf="searching" lines="none">
    <ion-spinner slot="start"></ion-spinner>
    <ion-label>Ricerca in corso…</ion-label>
  </ion-item>

  <!-- Risultati -->
  <ion-item
    button
    detail="false"
    *ngFor="let c of results; trackBy: trackByIdx; let i = index"
    (click)="onSelect(c)">
    <ion-icon name="person-circle-outline" slot="start"></ion-icon>
    <ion-label>
      <div style="font-weight:600;">
        {{ c.displayName || (c.givenName || '') + ' ' + (c.familyName || '') || '—' }}
      </div>
      <div style="font-size:12px; opacity:.8;">
        <span *ngIf="c.phone">{{ c.phone }}</span>
        <span *ngIf="c.phone && c.email"> &middot; </span>
        <span *ngIf="c.email">{{ c.email }}</span>
      </div>
    </ion-label>
  </ion-item>

  <!-- Nessun risultato (ma query presente) -->
  <ion-item *ngIf="!searching && results?.length === 0" lines="none">
    <ion-label style="opacity:.75;">Nessun contatto trovato</ion-label>
  </ion-item>
</ion-list>
```

### ./src/app/features/reservations/_components/gcontacts-autocomplete/gcontacts-autocomplete.component.ts
```
// src/app/features/reservations/_components/gcontacts-autocomplete/gcontacts-autocomplete.component.ts
//
// Autocomplete Google Contacts (solo FE)
// - Espone @Output() selected: EventEmitter<GContactPick>
// - Alla selezione emette il pick e svuota il campo di ricerca
// - Parent guida la ricerca via (queryChange) e results[]
// - Stile: Signals per stato locale, no ngModel.

import { Component, EventEmitter, Input, Output, signal, computed } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import {
  IonList, IonItem, IonLabel, IonIcon, IonSearchbar, IonSpinner
} from '@ionic/angular/standalone';

export interface GContactPick {
  displayName?: string | null;
  givenName?: string | null;
  familyName?: string | null;
  phone?: string | null;
  email?: string | null;
}

@Component({
  standalone: true,
  selector: 'app-gcontacts-autocomplete',
  templateUrl: './gcontacts-autocomplete.component.html',
  imports: [NgIf, NgFor, IonList, IonItem, IonLabel, IonIcon, IonSearchbar, IonSpinner]
})
export class GContactsAutocompleteComponent {
  /** Risultati da mostrare (arrivano dal parent quando cambia la query) */
  @Input() results: GContactPick[] = [];

  /** Placeholder del search */
  @Input() placeholder = 'Cerca in Google Contacts…';

  /** Mostra spinner mentre il parent sta cercando (opzionale) */
  @Input() searching = false;

  /** Emetto la query quando l’utente digita */
  @Output() queryChange = new EventEmitter<string>();

  /** Emetto il contatto selezionato */
  @Output() selected = new EventEmitter<GContactPick>();

  // Stato locale: valore del campo di ricerca (signal)
  query = signal<string>('');

  // UI helper: mostra lista solo se ho query con almeno 2 char
  showList = computed(() => this.query().trim().length >= 2);

  /** Digitazione nel searchbar → aggiorno signal e notifico il parent */
  onInput(ev: CustomEvent) {
    const q = (ev.detail as any)?.value?.toString() ?? '';
    this.query.set(q);
    this.queryChange.emit(q);
  }

  /** Selezione di un risultato → emetto pick + reset ricerca */
  onSelect(pick: GContactPick) {
    console.log('👤 [GContactsAutocomplete] pick', pick);
    this.selected.emit(pick);
    // reset locale + notifico parent per svuotare eventuali results
    this.query.set('');
    this.queryChange.emit('');
  }

  /** trackBy per la lista (evita ricostruzioni inutili) */
  trackByIdx(index: number, _item: GContactPick) { return index; }

  /** Facoltativo: reset forzato chiamabile dal parent */
  reset() {
    this.query.set('');
    this.queryChange.emit('');
  }
}
```

### ./src/app/features/reservations/_components/status-action.modal.html
```
<!-- src/app/features/reservations/_components/status-action.modal.html -->
<ion-header>
  <ion-toolbar>
    <ion-title>Azioni stato</ion-title>
    <ion-buttons slot="end">
      <ion-button (click)="onConfirm()">
        <ion-icon slot="start" name="checkmark-circle-outline"></ion-icon>
        Conferma
      </ion-button>
      <ion-button (click)="close()" fill="clear">
        <ion-icon slot="start" name="close-outline"></ion-icon>
        Chiudi
      </ion-button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>

<ion-content class="ion-padding">
  <ion-list>
    <ion-item><ion-label>Nuovo stato</ion-label></ion-item>

    <ion-radio-group [(ngModel)]="action">
      <ion-item>
        <ion-icon slot="start" name="checkmark-circle-outline"></ion-icon>
        <ion-label>Accetta</ion-label>
        <ion-radio value="accept" />
      </ion-item>
      <ion-item>
        <ion-icon slot="start" name="trash-bin-outline"></ion-icon>
        <ion-label>Rifiuta</ion-label>
        <ion-radio value="reject" />
      </ion-item>
      <ion-item>
        <ion-icon slot="start" name="close-outline"></ion-icon>
        <ion-label>Annulla</ion-label>
        <ion-radio value="cancel" />
      </ion-item>
    </ion-radio-group>
  </ion-list>

  <ion-item>
    <ion-label position="stacked">Motivo (obbligatorio per Rifiuta/Annulla)</ion-label>
    <ion-textarea [(ngModel)]="reason" placeholder="Motivo." autoGrow="true"></ion-textarea>
  </ion-item>
</ion-content>
```

### ./src/app/features/reservations/_components/status-action.modal.scss
```
:host { display: block; }```

### ./src/app/features/reservations/_components/status-action.modal.ts
```
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonFooter,
  IonButtons,
  IonButton,
  IonTextarea,
  IonRadioGroup,
  IonRadio,
  IonItem,
  IonList,
  IonLabel,
  IonIcon,
} from '@ionic/angular/standalone';
import { ModalController } from '@ionic/angular';

@Component({
  standalone: true,
  selector: 'resv-status-action-modal',
  templateUrl: './status-action.modal.html',
  styleUrls: ['./status-action.modal.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonFooter,
    IonButtons,
    IonButton,
    IonTextarea,
    IonRadioGroup,
    IonRadio,
    IonItem,
    IonList,
    IonLabel,
    IonIcon,
  ],
})
export class StatusActionModalComponent {
  @Input() reservationId!: number;

  action: 'accept' | 'reject' | 'cancel' = 'accept';
  reason = '';

  constructor(private modalCtrl: ModalController) {}

  close() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  onConfirm() {
    const reasonTrim = this.reason.trim();
    if ((this.action === 'reject' || this.action === 'cancel') && !reasonTrim) {
      alert('Inserisci un motivo per rifiutare/annullare.');
      return;
    }
    console.log('[StatusActionModal] confirm →', this.action, reasonTrim); // 👈
    this.modalCtrl.dismiss({ action: this.action, reason: reasonTrim || undefined }, 'confirm');
  }
}
```

### ./src/app/features/reservations/_components/ui/date-quick/date-quick.component.html
```
<!-- Header titolo + riga "Oggi: ..." -->
<ion-item lines="none">
  <ion-label>
    <div style="font-weight:600;">{{ title }}</div>
    <div *ngIf="showTodayLine" style="font-size:12px; opacity:.75;">Oggi: {{ todayLabel() }}</div>
  </ion-label>
</ion-item>

<!-- Segment giorni scrollabile -->
<div style="padding: 0 8px 8px;">
  <ion-segment [value]="selected || daysList()[0]?.iso" (ionChange)="onChange($event)" mode="md" scrollable="true">
    <ion-segment-button *ngFor="let d of daysList()" [value]="d.iso">
      <div style="display:flex;flex-direction:column;align-items:center;line-height:1;">
        <small style="opacity:.8">{{ d.weekday }}</small>
        <b style="font-size:18px;">{{ d.day }}</b>
        <small style="opacity:.6">{{ d.month }}</small>
      </div>
    </ion-segment-button>
  </ion-segment>
</div>
```

### ./src/app/features/reservations/_components/ui/date-quick/date-quick.component.ts
```
// Componente riutilizzabile: "scroller rapido giorni" (oggi → +N)
// - Mostra header "Data" + riga "Oggi: ..."
// - Segment scrollable di 7/14/... giorni con etichette compatte
// - Espone (selectedChange) con YYYY-MM-DD
//
// Stile: standalone, import minimi, commenti espliciti.

import { Component, EventEmitter, Input, Output, signal, OnChanges, SimpleChanges } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import {
  IonItem, IonLabel, IonSegment, IonSegmentButton
} from '@ionic/angular/standalone';

@Component({
  standalone: true,
  selector: 'app-date-quick',
  templateUrl: './date-quick.component.html',
  imports: [NgFor, NgIf, IonItem, IonLabel, IonSegment, IonSegmentButton],
})
export class DateQuickComponent implements OnChanges {
  /** Titolo sezione (default "Data") */
  @Input() title: string = 'Data';
  /** Mostra riga "Oggi: ..." (default true) */
  @Input() showTodayLine: boolean = true;
  /** Numero di giorni da mostrare (default 7: oggi → +6) */
  @Input() days: number = 7;
  /** Giorno selezionato in formato YYYY-MM-DD (controllato dal parent) */
  @Input() selected: string | null = null;

  /** Emesso quando l’utente sceglie un giorno (YYYY-MM-DD) */
  @Output() selectedChange = new EventEmitter<string>();

  // Lista giorni visualizzati
  daysList = signal<{ iso: string; weekday: string; day: string; month: string }[]>([]);

  ngOnChanges(ch: SimpleChanges): void {
    if (ch['days']) this.daysList.set(buildNextDays(this.days));
  }

  // Label "Oggi: ..."
  todayLabel(): string {
    return new Intl.DateTimeFormat('it-IT', {
      weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric'
    }).format(new Date());
  }

  onChange(ev: CustomEvent) {
    const val = (ev.detail as any).value as string;
    if (val) this.selectedChange.emit(val);
  }
}

// ============ Helpers locali ============

function pad(n: number) { return String(n).padStart(2, '0'); }

/** Costruisce N giorni a partire da oggi (incluso) */
function buildNextDays(n: number) {
  const out: { iso: string; weekday: string; day: string; month: string }[] = [];
  const fmtWeek = new Intl.DateTimeFormat('it-IT', { weekday: 'short' });
  const fmtDay  = new Intl.DateTimeFormat('it-IT', { day: '2-digit' });
  const fmtMon  = new Intl.DateTimeFormat('it-IT', { month: '2-digit' });
  const fmtIso  = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  for (let i = 0; i < n; i++) {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + i);
    out.push({
      iso: fmtIso(d),
      weekday: fmtWeek.format(d),
      day: fmtDay.format(d),
      month: fmtMon.format(d),
    });
  }
  return out;
}
```

### ./src/app/features/reservations/edit-reservation.page.html
```
<!-- src/app/features/reservations/edit-reservation.page.html -->
<ion-header>
  <ion-toolbar>
    <ion-title>Modifica prenotazione</ion-title>

    <!-- Toolbar destra: mantengo la tua UI -->
    <ion-buttons slot="end" class="ion-hide-sm-down">
      <ion-button [disabled]="printing()" (click)="onPrintPlacecardOne()" title="Stampa segnaposto">
        <ion-icon name="print-outline" slot="start"></ion-icon>
        Stampa segnaposto
      </ion-button>

      <!-- 🗑️ Elimina definitivamente (solo se status = cancelled) -->
      <ion-button
        color="danger"
        [disabled]="loading()"
        *ngIf="entity()?.status === 'cancelled'"
        (click)="onDeleteDefinitive()"
        title="Elimina definitivamente">
        <ion-icon name="trash-outline" slot="start"></ion-icon>
        Elimina definitivamente
      </ion-button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>

<ion-content>
  <div style="max-width:880px; margin:0 auto; padding:16px;" *ngIf="entity(); else notFound">
    <form [formGroup]="form" (ngSubmit)="onSave()">

      <!-- ===== Dati cliente ===== -->
      <ion-list inset="true">
        <ion-item lines="full">
          <ion-label position="stacked">Cognome</ion-label>
          <ion-input
            formControlName="customer_last"
            placeholder="Rossi"
            autocapitalize="off"
            autocomplete="family-name"
            enterkeyhint="next"
            clear-input="true"
            style="text-transform: uppercase"
            (ionInput)="forceUpper('customer_last', $event)">
          </ion-input>
        </ion-item>

        <ion-item lines="full" style="margin-top:8px;">
          <ion-label position="stacked">Nome</ion-label>
          <ion-input
            formControlName="customer_first"
            placeholder="Mario"
            autocapitalize="off"
            autocomplete="given-name"
            enterkeyhint="next"
            clear-input="true"
            style="text-transform: uppercase"
            (ionInput)="forceUpper('customer_first', $event)">
          </ion-input>
        </ion-item>

        <ion-item lines="full" style="margin-top:8px;">
          <ion-label position="stacked">Telefono</ion-label>
          <ion-input
            formControlName="phone"
            type="tel"
            inputmode="tel"
            autocomplete="tel-national"
            placeholder="+39 333 123 4567"
            enterkeyhint="next"
            clear-input="true">
          </ion-input>
        </ion-item>

        <ion-item lines="full" style="margin-top:8px;">
          <ion-label position="stacked">Email</ion-label>
          <ion-input
            formControlName="email"
            type="email"
            autocomplete="email"
            placeholder="mario@example.com"
            enterkeyhint="next"
            clear-input="true">
          </ion-input>
        </ion-item>
      </ion-list>

      <!-- ===== Dati prenotazione ===== -->
      <ion-list inset="true" style="margin-top: 12px;">
        <ion-item lines="full">
          <ion-label position="stacked">Persone</ion-label>
          <ion-input type="number" formControlName="party_size" min="1"></ion-input>
        </ion-item>

        <ion-item lines="full" style="margin-top:8px;">
          <ion-label position="stacked">Inizio (UTC ISO)</ion-label>
          <ion-input formControlName="start_at"></ion-input>
        </ion-item>

        <ion-item lines="full" style="margin-top:8px;">
          <ion-label position="stacked">Fine (UTC ISO)</ion-label>
          <ion-input formControlName="end_at"></ion-input>
        </ion-item>

        <ion-item lines="full" style="margin-top:8px;">
          <ion-label position="stacked">Sala</ion-label>
          <ion-select formControlName="room_id" (ionChange)="onRoomChange($event.detail.value)">
            <ion-select-option *ngFor="let r of rooms()" [value]="r.id">{{ r.name }}</ion-select-option>
          </ion-select>
        </ion-item>

        <ion-item lines="full" style="margin-top:8px;">
          <ion-label position="stacked">Tavolo</ion-label>
          <ion-select formControlName="table_id">
            <ion-select-option *ngFor="let t of tables()" [value]="t.id">{{ t.name }}</ion-select-option>
          </ion-select>
        </ion-item>

        <ion-item lines="full" style="margin-top:8px;">
          <ion-label position="stacked">Note</ion-label>
          <ion-textarea formControlName="notes" placeholder="intolleranze, preferenze, segnalazioni…"></ion-textarea>
        </ion-item>
      </ion-list>

      <!-- CTA -->
      <div style="padding: 12px 8px">
        <ion-button expand="block" size="large" type="submit" [disabled]="loading() || form.invalid">
          {{ loading() ? 'Salvataggio…' : 'Salva' }}
        </ion-button>
      </div>
    </form>
  </div>

  <ng-template #notFound>
    <div style="padding:16px">Prenotazione non trovata.</div>
  </ng-template>

  <!-- FAB mobile: invariato -->
  <ion-fab slot="fixed" horizontal="end" vertical="bottom" class="ion-hide-md-up fab-resv">
    <ion-fab-button title="Azioni">
      <ion-icon name="ellipsis-vertical"></ion-icon>
    </ion-fab-button>

    <ion-fab-list side="top">
      <ion-fab-button routerLink="/reservations" title="Vai alla lista">
        <ion-icon name="list"></ion-icon>
      </ion-fab-button>

      <ion-fab-button [disabled]="printing()" (click)="onPrintPlacecardOne()" title="Stampa segnaposto">
        <ion-icon name="print-outline"></ion-icon>
      </ion-fab-button>
    </ion-fab-list>
  </ion-fab>
</ion-content>
```

### ./src/app/features/reservations/edit-reservation.page.ts
```
// src/app/features/reservations/edit-reservation.page.ts
// ============================================================================
// Pagina EDIT — UI invariata, aggiunti:
// - lettura ?force=&?notify=
// - handler onDeleteDefinitive() che chiama api.remove(...)
// - fix typed forms per evitare errori TS
// ============================================================================

import { Component, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

// Angular common
import { NgIf, NgFor, DatePipe } from '@angular/common';

// Ionic standalone
import {
  IonContent, IonHeader, IonToolbar, IonTitle,
  IonItem, IonLabel, IonInput, IonButton, IonSelect, IonSelectOption,
  IonTextarea, IonDatetime, IonNote, IonList, IonIcon,
  IonFab, IonFabButton, IonFabList, IonButtons
} from '@ionic/angular/standalone';
import { ToastController, AlertController } from '@ionic/angular';

// Service
import {
  ReservationsApi,
  Room, Table, Reservation
} from '../../core/reservations/reservations.service';

@Component({
  standalone: true,
  selector: 'app-edit-reservation',
  templateUrl: './edit-reservation.page.html',
  imports: [
    // Angular
    ReactiveFormsModule, NgIf, NgFor, DatePipe,
    // Ionic
    IonButtons, IonContent, IonHeader, IonToolbar, IonTitle,
    IonItem, IonLabel, IonInput, IonButton, IonSelect, IonSelectOption,
    IonTextarea, IonDatetime, IonNote, IonList, IonIcon,
    IonFab, IonFabButton, IonFabList,
  ]
})
export class EditReservationPage implements OnInit, OnDestroy {
  private fb     = inject(FormBuilder);
  private api    = inject(ReservationsApi);
  private router = inject(Router);
  private route  = inject(ActivatedRoute);
  private toast  = inject(ToastController);
  private alert  = inject(AlertController);

  private id = Number(this.route.snapshot.paramMap.get('id'));

  // Switch da query (?force=&?notify=) — default: force=false, notify=true
  private forceDelete  = (this.route.snapshot.queryParamMap.get('force')  ?? '').toLowerCase() === 'true';
  private notifyDelete = (this.route.snapshot.queryParamMap.get('notify') ?? '').toLowerCase() !== 'false';

  // Stato UI
  loading = signal(false);
  printing = signal(false);
  entity = signal<Reservation | null>(null);

  rooms = signal<Room[]>([]);
  tables = signal<Table[]>([]);

  // Typed forms (string|null per evitare TS2345)
  form = this.fb.group({
    customer_first: ['' as string | null],
    customer_last : ['' as string | null],
    phone         : ['' as string | null],
    email         : ['' as string | null, Validators.email],
    party_size    : [1,  [Validators.required, Validators.min(1)]],
    start_at      : ['' as string | null, [Validators.required]],
    end_at        : ['' as string | null],
    room_id       : [null as number | null],
    table_id      : [null as number | null],
    notes         : ['' as string | null],
  });

  async ngOnInit() {
    await this.load();
  }
  ngOnDestroy(): void {}

  // --------------------------------------------------------------------------
  private async load() {
    this.loading.set(true);
    try {
      const [r, rooms] = await Promise.all([
        firstValueFrom(this.api.byId(this.id)),
        firstValueFrom(this.api.listRooms()),
      ]);
      this.entity.set(r);
      this.rooms.set(rooms || []);
      if (r.room_id) {
        const t = await firstValueFrom(this.api.listTablesByRoom(r.room_id));
        this.tables.set(t || []);
      }
      this.form.patchValue({
        customer_first: r.customer_first ?? '',
        customer_last : r.customer_last  ?? '',
        phone         : r.phone ?? '',
        email         : r.email ?? '',
        party_size    : r.party_size ?? 1,
        start_at      : r.start_at ?? '',
        end_at        : (r.end_at ?? '') as any,
        room_id       : r.room_id ?? null,
        table_id      : r.table_id ?? null,
        notes         : r.notes ?? ''
      });
    } finally {
      this.loading.set(false);
    }
  }

  // Uppercase helper senza rompere typed forms
  forceUpper(ctrl: keyof typeof this.form.controls, ev: any) {
    const v: string = (ev?.target?.value ?? '') + '';
    const upper = v.toUpperCase();
    if (v !== upper) {
      this.form.patchValue({ [ctrl]: upper } as any);
    }
  }

  async onRoomChange(roomId: number | null) {
    if (!roomId) { this.tables.set([]); this.form.controls.table_id.setValue(null); return; }
    const t = await firstValueFrom(this.api.listTablesByRoom(Number(roomId)));
    this.tables.set(t || []);
    if (!t?.length) this.form.controls.table_id.setValue(null);
  }

  // --------------------------------------------------------------------------
  async onSave() {
    if (this.form.invalid || this.loading()) return;
    this.loading.set(true);
    try {
      const fv = this.form.getRawValue();
      const payload: Partial<Reservation> = {
        customer_first: fv.customer_first ?? null,
        customer_last : fv.customer_last  ?? null,
        phone         : fv.phone ?? null,
        email         : fv.email ?? null,
        party_size    : Number(fv.party_size ?? (this.entity()?.party_size ?? 1)),
        start_at      : (fv.start_at ?? this.entity()?.start_at) as string,
        end_at        : fv.end_at ?? null,
        room_id       : fv.room_id ?? null,
        table_id      : fv.table_id ?? null,
        notes         : fv.notes ?? null,
      };
      const r = await firstValueFrom(this.api.update(this.id, payload));
      this.entity.set(r);
      (await this.toast.create({ message: 'Salvata ✅', duration: 1200 })).present();
    } catch (err: any) {
      (await this.toast.create({ message: `Errore salvataggio: ${err?.error?.error || err.message}`, duration: 2500, color: 'danger' })).present();
    } finally {
      this.loading.set(false);
    }
  }

  // --------------------------------------------------------------------------
  async onPrintPlacecardOne() {
    if (this.printing()) return;
    this.printing.set(true);
    try {
      await firstValueFrom(this.api.printPlacecardOne(this.id));
      (await this.toast.create({ message: 'Segnaposto inviato ✅', duration: 1400 })).present();
    } catch (err: any) {
      (await this.toast.create({ message: `Errore stampa: ${err?.error?.error || err.message}`, duration: 2500, color: 'danger' })).present();
    } finally {
      this.printing.set(false);
    }
  }

  // --------------------------------------------------------------------------
  // 🗑️ Elimina definitivamente — visibile in HTML solo se status='cancelled'
  async onDeleteDefinitive() {
    const r = this.entity();
    if (!r) return;

    // 🔧 FIX iOS overlay: NIENTE logica nel handler dell’alert.
    // Mostro l’alert, attendo il dismiss e SOLO DOPO eseguo l’azione.
    const alert = await this.alert.create({
      header: 'Eliminare definitivamente?',
      message: `Prenotazione #${r.id} — azione irreversibile.`,
      mode: 'ios', // 🔧 NEW: coerenza look & feel su iPhone
      buttons: [
        { text: 'Annulla', role: 'cancel' },
        // ⚠️ niente handler qui: gestisco dopo onDidDismiss()
        { text: 'Elimina', role: 'confirm' }
      ]
    });
    await alert.present();

    const { role } = await alert.onDidDismiss();
    if (role !== 'confirm') return;

    this.loading.set(true);
    try {
      const res = await firstValueFrom(
        this.api.remove(r.id, { force: this.forceDelete, notify: this.notifyDelete })
      );
      if (res?.ok) {
        (await this.toast.create({ message: 'Eliminata ✅', duration: 1200 })).present();
        this.router.navigate(['/reservations'], { queryParams: { lastAction: 'deleted' } });
      } else {
        (await this.toast.create({ message: 'Eliminazione non eseguita', duration: 1800 })).present();
      }
    } catch (err: any) {
      (await this.toast.create({
        message: `Errore eliminazione: ${err?.error?.error || err.message}`,
        duration: 2600, color: 'danger'
      })).present();
    } finally {
      this.loading.set(false);
    }
  }
}
```

### ./src/app/features/reservations/new-reservation.page.html
```
<ion-content class="ion-padding">

  <form [formGroup]="form" (ngSubmit)="onSubmit()">

    <!-- ===== Sezione 0: Cerca contatto (Google) - IN ALTO ===== -->
    <ion-list inset="true" style="margin-top: 8px">
      <ion-item lines="full">
        <ion-label position="stacked">Cerca in Google Contacts…</ion-label>

        <app-gcontacts-autocomplete
          [results]="gcResults()"
          [searching]="gcSearching()"
          placeholder="Cerca in Google Contacts..."
          (queryChange)="onGcQueryChange($event)"
          (selected)="onContactSelected($event)">
        </app-gcontacts-autocomplete>

      </ion-item>
    </ion-list>

    <!-- ===== Sezione 1: Dati cliente ===== -->
    <ion-list inset="true" style="margin-top: 8px">
      <ion-item lines="full">
        <ion-label position="stacked">Cognome</ion-label>
        <ion-input
          formControlName="customer_last"
          (ionInput)="forceUpper('customer_last', $event)"
          autocomplete="family-name">
        </ion-input>
      </ion-item>

      <ion-item lines="full">
        <ion-label position="stacked">Nome</ion-label>
        <ion-input
          formControlName="customer_first"
          (ionInput)="forceUpper('customer_first', $event)"
          autocomplete="given-name">
        </ion-input>
      </ion-item>

      <ion-item lines="full">
        <ion-label position="stacked">Telefono</ion-label>
        <ion-input formControlName="phone" inputmode="tel" autocomplete="tel"></ion-input>
      </ion-item>

      <ion-item lines="full">
        <ion-label position="stacked">Email</ion-label>
        <ion-input formControlName="email" type="email" autocomplete="email" inputmode="email"></ion-input>
      </ion-item>

      <ion-item lines="none">
        <ion-note color="danger" *ngIf="emailCtrl.invalid && (emailCtrl.dirty || emailCtrl.touched)">
          Inserisci un’email valida (opzionale).
        </ion-note>
      </ion-item>
    </ion-list>

    <!-- ===== Sezione 2: Coperti ===== -->
    <ion-list inset="true" style="margin-top: 12px">
      <ion-item lines="full">
        <ion-label>Coperti</ion-label>
        <div slot="end" style="display:flex; align-items:center; gap:8px;">
          <ion-button fill="outline" size="default" (click)="decParty()" aria-label="Diminuisci coperti">
            <ion-icon name="remove-circle"></ion-icon>
          </ion-button>
          <span style="min-width: 2ch; text-align:center;">{{ form.value.party_size || 1 }}</span>
          <ion-button fill="outline" size="default" (click)="incParty()" aria-label="Aumenta coperti">
            <ion-icon name="add-circle"></ion-icon>
          </ion-button>
        </div>
      </ion-item>
    </ion-list>

    <!-- ===== Sezione 3: Data & Orario ===== -->
    <ion-list inset="true" style="margin-top: 12px">
      <ion-item lines="full">
        <ion-label position="stacked">
          Data
          <div style="font-size:.8rem; font-weight:400">Oggi: {{ todayLabel() }}</div>
        </ion-label>

        <!-- Quick day picker (7 giorni) -->
        <app-date-quick
          [selected]="selectedDateISO()"
          (selectedChange)="onQuickDate($event)">
        </app-date-quick>
      </ion-item>

      <!-- PRANZO -->
      <div *ngIf="lunchSlots.length" style="padding: 8px 12px 8px">
        <div style="margin-bottom:6px; font-weight:600;">Pranzo</div>
        <div style="display:flex; flex-wrap:wrap; gap:8px;">
          <ion-button
            *ngFor="let t of lunchSlots"
            [fill]="selectedTime() === t ? 'solid' : 'outline'"
            [disabled]="isSlotDisabled(selectedDateISO(), t)"
            (click)="onSelectTime(t)">
            {{ t }}
          </ion-button>
        </div>
      </div>

      <!-- CENA -->
      <div *ngIf="dinnerSlots.length" style="padding: 0 12px 12px">
        <div style="margin-bottom:6px; font-weight:600;">Cena</div>
        <div style="display:flex; flex-wrap:wrap; gap:8px;">
          <ion-button
            *ngFor="let t of dinnerSlots"
            [fill]="selectedTime() === t ? 'solid' : 'outline'"
            [disabled]="isSlotDisabled(selectedDateISO(), t)"
            (click)="onSelectTime(t)">
            {{ t }}
          </ion-button>
        </div>
      </div>

      <ion-item lines="none">
        <ion-note *ngIf="form.value.start_at" color="primary" style="display:block; width:100%;">
          Selezionato: {{ selectedDateHuman() }}, {{ selectedTime() }}
        </ion-note>
      </ion-item>

      <!-- Toggle calendario avanzato -->
      <div style="padding: 6px 12px 0;">
        <ion-button fill="clear" size="small" (click)="toggleAdvanced()">
          {{ showAdvanced() ? 'Chiudi calendario' : 'Scegli da calendario' }}
        </ion-button>
        <div *ngIf="showAdvanced()">
          <ion-datetime
            presentation="date-time"
            [value]="advancedValue()"
            (ionChange)="onAdvancedPick($event)">
          </ion-datetime>
        </div>
      </div>

      <ion-item lines="none" style="margin-top:6px">
        <ion-note color="danger" *ngIf="startCtrl.invalid && (startCtrl.dirty || startCtrl.touched)">
          Scegli data e ora (obbligatorio).
        </ion-note>
      </ion-item>
    </ion-list>

    <!-- ===== Sezione 4: Sala/Tavolo ===== -->
    <ion-list inset="true" style="margin-top: 12px">
      <ion-item lines="full">
        <ion-label position="stacked">Sala</ion-label>
        <ion-select
          formControlName="room_id"
          interface="popover"
          placeholder="Seleziona sala"
          (ionChange)="onRoomChange()">
          <ion-select-option *ngFor="let r of rooms()" [value]="r.id">
            {{ r.name }}
          </ion-select-option>
        </ion-select>
      </ion-item>

      <ion-item lines="full" style="margin-top: 8px">
        <ion-label position="stacked">Tavolo</ion-label>
        <ion-select
          formControlName="table_id"
          interface="popover"
          placeholder="Seleziona tavolo"
          [disabled]="!form.value.room_id || !tables().length">
          <ion-select-option *ngFor="let t of tables()" [value]="t.id">
            Tavolo {{ t.table_number || t.label || t.id }} ({{ t.capacity || '?' }})
          </ion-select-option>
        </ion-select>
      </ion-item>
    </ion-list>

    <!-- ===== Sezione 5: Note ===== -->
    <ion-list inset="true" style="margin-top: 12px">
      <ion-item lines="full">
        <ion-label position="stacked">Note</ion-label>
        <ion-textarea
          formControlName="notes"
          autoGrow="true"
          enterkeyhint="done"
          placeholder="Es. intolleranze, preferenza tavolo, segnalazioni…">
        </ion-textarea>
      </ion-item>
    </ion-list>

    <!-- CTA -->
    <div style="padding: 12px 8px">
      <ion-button expand="block" size="large" type="submit" [disabled]="loading() || form.invalid">
        {{ loading() ? 'Creazione…' : 'Crea prenotazione' }}
      </ion-button>
    </div>
  </form>

  <!-- === FAB (mobile) ====================================================== -->
  <ion-fab slot="fixed" horizontal="end" vertical="bottom" class="ion-hide-md-up fab-resv">
    <ion-fab-button title="Azioni">
      <ion-icon name="ellipsis-vertical"></ion-icon>
    </ion-fab-button>
    <ion-fab-list side="top">
      <ion-fab-button routerLink="/reservations" title="Vai alla lista">
        <ion-icon name="list"></ion-icon>
      </ion-fab-button>
      <ion-fab-button (click)="clearForm()" title="Pulisci form">
        <ion-icon name="remove-circle"></ion-icon>
      </ion-fab-button>
    </ion-fab-list>
  </ion-fab>
  <!-- ====================================================================== -->

</ion-content>
```

### ./src/app/features/reservations/new-reservation.page.ts
```
import { Component, inject, signal, computed, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';

// Angular
import { NgIf, NgFor } from '@angular/common';

// Ionic standalone
import {
  IonContent, IonHeader, IonToolbar, IonTitle,
  IonItem, IonLabel, IonInput, IonButton, IonSelect, IonSelectOption,
  IonTextarea, IonDatetime, IonNote, IonList,
  IonIcon, IonFab, IonFabButton, IonFabList
} from '@ionic/angular/standalone';
import { ToastController } from '@ionic/angular';

// API FE
import { ReservationsApi, Room, Table, Reservation } from '../../core/reservations/reservations.service';

// UI: date quick (7 giorni)
import { DateQuickComponent } from '../../features/reservations/_components/ui/date-quick/date-quick.component';

// Google contacts
import {
  GContactsAutocompleteComponent,
  GContactPick
} from './_components/gcontacts-autocomplete/gcontacts-autocomplete.component';
import { GoogleContactsService } from '../../core/google/google-contacts.service';

// Notifiche
import { EmailNotifyService } from '../../core/notifications/email-notify.service';
import { WhatsAppService } from '../../core/notifications/whatsapp.service';

@Component({
  standalone: true,
  selector: 'app-new-reservation',
  templateUrl: './new-reservation.page.html',
  imports: [
    ReactiveFormsModule, NgIf, NgFor, RouterLink,
    IonContent, IonHeader, IonToolbar, IonTitle,
    IonItem, IonLabel, IonInput, IonButton, IonSelect, IonSelectOption,
    IonTextarea, IonDatetime, IonNote, IonList, IonIcon,
    IonFab, IonFabButton, IonFabList,
    DateQuickComponent,
    GContactsAutocompleteComponent,
  ]
})
export class NewReservationPage implements OnDestroy {
  private fb     = inject(FormBuilder);
  private api    = inject(ReservationsApi);
  private router = inject(Router);
  private toast  = inject(ToastController);
  private gcs    = inject(GoogleContactsService);
  private mail   = inject(EmailNotifyService);
  private wa     = inject(WhatsAppService);

  // ==== UI state ====
  loading = signal(false);
  rooms   = signal<Room[]>([]);
  tables  = signal<Table[]>([]);

  // ==== Google Contacts ====
  gcResults   = signal<GContactPick[]>([]);
  gcSearching = this.gcs.searching;

  async onGcQueryChange(q: string) {
    const query = (q || '').trim();
    if (query.length < 2) { this.gcResults.set([]); return; }
    try {
      const rows = await this.gcs.searchContacts(query, 12);
      this.gcResults.set(rows || []);
    } catch (e) {
      console.warn('🔎 [NewReservation] Google search KO', e);
      this.gcResults.set([]);
    }
  }

  onContactSelected(pick: GContactPick | null) {
    if (!pick) return;
    this.form.patchValue({
      customer_last:  pick.familyName ?? pick.displayName ?? '',
      customer_first: pick.givenName ?? '',
      phone:          pick.phone ?? '',
      email:          pick.email ?? '',
    }, { emitEvent: true });
  }

  // ==== Orari predefiniti ====
  lunchSlots  = ['12:00','12:30','13:00','13:30','14:00'];
  dinnerSlots = ['19:00','19:30','20:00','20:30','21:00','21:30','22:00'];

  // ==== UI data (data/ora) ====
  private pickedDateISO = signal<string>(this.todayISO());
  private pickedTime    = signal<string | null>(null);

  todayLabel = computed(() =>
    new Intl.DateTimeFormat('it-IT', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' })
      .format(new Date())
  );

  selectedDateISO() { return this.pickedDateISO(); }
  selectedTime()    { return this.pickedTime() || ''; }

  onQuickDate(dateISO: string) {
    this.pickedDateISO.set(dateISO);
    if (this.pickedTime()) this.patchStartFromPick();
  }
  onSelectTime(t: string) {
    this.pickedTime.set(t);
    this.patchStartFromPick();
  }
  isSlotDisabled(dateISO: string, t: string): boolean {
    const todayISO = this.todayISO();
    if (dateISO !== todayISO) return false;
    const now = new Date();
    const [hh, mm] = t.split(':').map(n => +n);
    return now.getHours() > hh || (now.getHours() === hh && now.getMinutes() > mm);
  }
  selectedDateHuman(): string {
    const [y,m,d] = this.pickedDateISO().split('-').map(n => +n);
    return new Intl.DateTimeFormat('it-IT', { weekday:'long', day:'2-digit', month:'2-digit', year:'numeric' })
      .format(new Date(y, m-1, d));
  }

  // ==== Form ====
  form = this.fb.group({
    customer_last : ['' as string | null, [Validators.required]],
    customer_first: ['' as string | null, [Validators.required]],
    phone         : ['' as string | null],
    email         : ['' as string | null, Validators.email],
    party_size    : [2,  [Validators.required, Validators.min(1)]],
    start_at      : ['' as string | null, [Validators.required]],
    end_at        : ['' as string | null],
    room_id       : [null as number | null],
    table_id      : [null as number | null],
    notes         : ['' as string | null],
  });

  get emailCtrl(): AbstractControl { return this.form.controls.email!; }
  get startCtrl(): AbstractControl { return this.form.controls.start_at!; }

  forceUpper(ctrl: 'customer_last'|'customer_first', ev: CustomEvent) {
    const v = (ev?.detail?.value ?? '') as string;
    this.form.controls[ctrl].setValue(v.toUpperCase());
  }

  incParty() { const n = (this.form.value.party_size || 1) + 1; this.form.patchValue({ party_size: n }); }
  decParty() { const n = Math.max(1, (this.form.value.party_size || 1) - 1); this.form.patchValue({ party_size: n }); }

  // ==== Calendario avanzato ====
  private advancedOpen = signal(false);
  showAdvanced() { return this.advancedOpen(); }
  toggleAdvanced() { this.advancedOpen.set(!this.advancedOpen()); }
  advancedValue() {
    const v = this.form.value.start_at || (this.pickedDateISO() + 'T' + (this.pickedTime() || '20:00'));
    return v;
  }
  onAdvancedPick(ev: CustomEvent) {
    const raw = (ev.detail as any)?.value as string | null;
    if (raw) this.form.patchValue({ start_at: raw, end_at: null });
    const dt = raw?.split('T') ?? null;
    if (dt?.length === 2) {
      this.pickedDateISO.set(dt[0]);
      this.pickedTime.set(dt[1].slice(0,5));
    }
  }

  // ==== Sale/Tavoli ====
  async ngOnInit() {
    try {
      const rooms = await firstValueFrom(this.api.listRooms());
      this.rooms.set(rooms || []);
      if (this.rooms().length && !this.form.value.room_id) {
        this.form.patchValue({ room_id: this.rooms()[0].id });
      }
    } catch (e) {
      console.warn('Rooms load KO', e);
    }
  }
  ngOnDestroy() {}

  async onRoomChange() {
    const roomId = this.form.value.room_id;
    this.tables.set([]);
    if (!roomId) return;
    try {
      const tables = await firstValueFrom(this.api.listTablesByRoom(roomId));
      this.tables.set(tables || []);
    } catch (e) {
      console.warn('Tables load KO', e);
    }
  }

  // ==== Submit ====
  onSubmit() { this.submit(); } // alias per template

  async submit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.loading.set(true);
    try {
      // Normalizzo 'YYYY-MM-DDTHH:mm' per il BE (o lascia così se già accetta ISO locale)
      const startIsoLocal = this.form.value.start_at as string; // es. 2025-10-26T20:00
      const payload = {
        customer_first: this.form.value.customer_first?.trim() || null,
        customer_last : this.form.value.customer_last?.trim()  || null,
        phone         : this.form.value.phone?.trim()          || null,
        email         : this.form.value.email?.trim()          || null,
        party_size    : this.form.value.party_size || 1,
        start_at      : startIsoLocal, // mantieni "locale ISO" se il BE lo gestisce
        end_at        : null,
        room_id       : this.form.value.room_id || null,
        table_id      : this.form.value.table_id || null,
        notes         : this.form.value.notes || null,
      };

      const created = await firstValueFrom(this.api.create(payload));
      await (await this.toast.create({ message: 'Prenotazione creata ✅', duration: 1400 })).present();

      // === Notifiche anche su PENDING ===
      if (created?.status === 'pending') {
        this.mail.sendReservationPendingAdmin(created as Reservation).subscribe(r => {
          console.log('📧 [Mail] admin pending OK?', r.ok);
        });
        this.mail.sendReservationPendingCustomer(created as Reservation).subscribe(r => {
          console.log('📧 [Mail] customer pending OK?', r.ok);
        });
        this.wa.sendReservationPending('twilio', created as Reservation).subscribe(r => {
          console.log('💬 [WA] pending OK?', r.ok);
        });
      }

      this.router.navigate(['/reservations']);
    } catch (err: any) {
      const msg = err?.message || 'Errore creazione';
      (await this.toast.create({ message: msg, duration: 2200, color: 'danger' })).present();
    } finally {
      this.loading.set(false);
    }
  }

  clearForm() {
    this.form.reset({
      party_size: 2,
      start_at: null,
      end_at: null,
      room_id: null,
      table_id: null,
      notes: null,
      customer_last: '',
      customer_first: '',
      phone: '',
      email: '',
    });
    this.pickedDateISO.set(this.todayISO());
    this.pickedTime.set(null);
    this.tables.set([]);
  }

  // ==== helpers ====
  private patchStartFromPick() {
    if (!this.pickedTime()) return;
    const v = `${this.pickedDateISO()}T${this.pickedTime()}`;
    this.form.patchValue({ start_at: v, end_at: null });
  }
  private todayISO(): string {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  }
}
```

### ./src/app/features/reservations/reservations-list.page.html
```
<ion-header>
  <ion-toolbar>
    <ion-title>Prenotazioni</ion-title>
    <ion-buttons slot="end">
      <ion-button routerLink="/reservations/new" routerDirection="forward">Nuova</ion-button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>

<!-- QUICK DAY PICKER come filtro -->
<app-date-quick
  [title]="'Giorno rapido'"
  [showTodayLine]="false"
  [days]="7"
  [selected]="selectedDayForPicker()"
  (selectedChange)="onQuickFilterDay($event)">
</app-date-quick>

<ion-content>
  <div style="padding: 12px;">
    <!-- segment range -->
    <ion-segment [value]="rangePreset()" (ionChange)="onPresetChange($event)" mode="md">
      <ion-segment-button value="today">Oggi</ion-segment-button>
      <ion-segment-button value="7d">Ultimi 7 giorni</ion-segment-button>
      <ion-segment-button value="all">Tutte</ion-segment-button>
    </ion-segment>

    <div style="height: 8px;"></div>

    <!-- segment status -->
    <ion-segment [value]="status()" (ionChange)="onStatusChange($event)" mode="md">
      <ion-segment-button value="all">Tutti</ion-segment-button>
      <ion-segment-button value="pending">In attesa</ion-segment-button>
      <ion-segment-button value="accepted">Accettate</ion-segment-button>
      <ion-segment-button value="rejected">Rifiutate</ion-segment-button>
      <ion-segment-button value="cancelled">Cancellate</ion-segment-button>
    </ion-segment>

    <div style="display:flex; align-items:center; gap:8px; padding: 6px 12px; font-size:12px; opacity:.8;">
      <ion-icon name="calendar-outline"></ion-icon>
      <span>{{ rangeLabel() }}</span>
      <ion-badge *ngIf="resultsCount()">{{ resultsCount() }}</ion-badge>
    </div>

    <!-- bottoni (desktop) -->
    <div class="ion-hide-md-down" style="padding: 12px; display:flex; gap:8px; flex-wrap:wrap;">
      <ion-button fill="outline" size="small" (click)="load()">Ricarica</ion-button>
      <ion-button size="small" [disabled]="printing()" (click)="printPlacecardsToday()">
        {{ printing() ? 'Invio…' : 'Segnaposti (oggi)' }}
      </ion-button>
      <ion-button size="small" [disabled]="printing()" (click)="printTodayThermal()">
        {{ printing() ? 'Stampa…' : 'Stampa termica (oggi)' }}
      </ion-button>
      <ion-button size="small" (click)="openFilterSheet()">Filtri</ion-button>
    </div>

    <div style="height: 8px;"></div>

    <ion-searchbar
      placeholder="Cerca per nome / telefono / email"
      [value]="q()"
      (ionInput)="onSearchChange($event)"
      (ionClear)="clearSearch()
      "
      showCancelButton="never"
      mode="md">
    </ion-searchbar>
  </div>

  <ion-refresher slot="fixed" (ionRefresh)="load($event)">
    <ion-refresher-content></ion-refresher-content>
  </ion-refresher>

  <div *ngIf="error()" style="padding: 12px; color:#dc2626;">
    {{ error() }}
  </div>

  <ion-list *ngIf="!error()">
    <!-- Tap riga → EDIT via TS; il bottone Azioni non naviga -->
    <ion-item
      button
      detail="false"
      *ngFor="let r of rows(); trackBy: trackById"
      (click)="openEdit(r)"
      class="resv-row">
      <ion-buttons slot="end">
        <!-- 🔒 blocca la propagazione e apri il quick sheet -->
        <ion-button type="button" (click)="onActionsClick($event, r)">Azioni</ion-button>
      </ion-buttons>

      <ion-label>
        <div style="display:flex; align-items:center; gap:6px;">
          <b>{{ r.customer_first || '—' }} {{ r.customer_last || '' }}</b>
          <ion-badge [color]="getStatusColor(r.status)">{{ r.status }}</ion-badge>
        </div>
        <div style="font-size:13px; margin-top:2px;">
          {{ r.phone || '—' }}
          <span *ngIf="r.email" style="opacity:.6"> &middot; {{ r.email }}</span>
          <span style="opacity:.6"> &middot; {{ r.party_size }} coperti</span>
        </div>
        <div style="font-size:12px; margin-top:2px; opacity:.8;">
          {{ r.start_at | date:'EEEE dd/MM/yyyy h:mm a':'':'it-IT' }} →
          {{ r.end_at   | date:'EEEE dd/MM/yyyy, h:mm a':'':'it-IT' }}
          <span *ngIf="r.table_number"> &middot; Tavolo {{ r.table_number }}</span>
        </div>
        <div *ngIf="r.notes" style="margin-top:4px; opacity:.7;">Note: {{ r.notes }}</div>
      </ion-label>
    </ion-item>
  </ion-list>

  <div *ngIf="!loading() && !error() && !rows().length" style="padding: 12px; opacity:.7;">
    Nessuna prenotazione trovata per i filtri selezionati.
  </div>

  <!-- FAB mobile -->
  <ion-fab slot="fixed" horizontal="end" vertical="bottom" class="ion-hide-md-up">
    <ion-fab-button>
      <ion-icon name="add-outline"></ion-icon>
    </ion-fab-button>
    <ion-fab-list side="top">
      <ion-fab-button (click)="openFilterSheet()" title="Filtri">
        <ion-icon name="funnel-outline"></ion-icon>
      </ion-fab-button>
      <ion-fab-button [disabled]="printing()" (click)="printTodayThermal()" title="Stampa termica (oggi)">
        <ion-icon name="print-outline"></ion-icon>
      </ion-fab-button>
      <ion-fab-button [disabled]="printing()" (click)="printPlacecardsToday()" title="Segnaposti (oggi)">
        <ion-icon name="document-text-outline"></ion-icon>
      </ion-fab-button>
      <ion-fab-button routerLink="/reservations/new" title="Nuova">
        <ion-icon name="create-outline"></ion-icon>
      </ion-fab-button>
    </ion-fab-list>
  </ion-fab>
</ion-content>
```

### ./src/app/features/reservations/reservations-list.page.ts
```
import { Component, computed, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { NgFor, NgIf, DatePipe, AsyncPipe } from '@angular/common';

import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel,
  IonBadge, IonButtons, IonButton, IonIcon, IonRefresher, IonRefresherContent,
  IonSearchbar, IonSegment, IonSegmentButton,
  IonFab, IonFabButton, IonFabList
} from '@ionic/angular/standalone';
import { Router, RouterLink, NavigationEnd, ActivatedRoute } from '@angular/router';

import { ModalController, ToastController, ActionSheetController, AlertController } from '@ionic/angular';
import { StatusActionModalComponent } from './_components/status-action.modal';
import { FilterSheetComponent, FilterSheetResult } from './_components/filter-sheet/filter-sheet.component';
import { filter, map, distinctUntilChanged, Subscription, firstValueFrom } from 'rxjs';

import {
  ReservationsApi,
  Reservation,
  ReservationStatus,
} from '../../core/reservations/reservations.service';

import { addDays, fmtDate, todayISO } from '../../shared/utils.date';
import { DateQuickComponent } from './_components/ui/date-quick/date-quick.component';

@Component({
  standalone: true,
  selector: 'app-reservations-list',
  templateUrl: './reservations-list.page.html',
  imports: [
    NgFor, NgIf, DatePipe, AsyncPipe, RouterLink,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonList, IonItem, IonLabel, IonBadge, IonButtons, IonButton, IonIcon,
    IonRefresher, IonRefresherContent, IonSearchbar, IonSegment, IonSegmentButton,
    IonFab, IonFabButton, IonFabList, DateQuickComponent
  ],
  providers: [ModalController, ToastController, ActionSheetController, AlertController],
})
export class ReservationsListPage implements OnInit, OnDestroy {
  private api = inject(ReservationsApi);
  private router = inject(Router);
  private route  = inject(ActivatedRoute);
  private modalCtrl = inject(ModalController);
  private toast = inject(ToastController);
  private sheet = inject(ActionSheetController);
  private alert = inject(AlertController);

  // 🔧 switch da query (?force=&?notify=)
  private forceDelete  = (this.route.snapshot.queryParamMap.get('force')  ?? '').toLowerCase() === 'true';
  private notifyDelete = (this.route.snapshot.queryParamMap.get('notify') ?? '').toLowerCase() !== 'false';

  // Giorno selezionato per il quick filter (se non è custom singolo, mostro oggi)
  selectedDayForPicker = computed(() => {
    const isSingleDay = this.rangePreset() === 'custom' && !!this.from() && this.from() === this.to();
    return isSingleDay ? (this.from() as string) : todayISO();
  });

  // handler quick day
  onQuickFilterDay(dateISO: string) {
    this.rangePreset.set('custom');
    this.from.set(dateISO);
    this.to.set(dateISO);
    this.load();
  }

  private sub?: Subscription;

  printing = signal(false);

  // Oggi + label leggibile
  today = signal(new Date());
  todayLabel = computed(() =>
    new Intl.DateTimeFormat('it-IT', {
      weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric'
    }).format(this.today())
  );

  // Filtri
  rangePreset = signal<'today' | '7d' | 'all' | 'custom'>('today');
  status = signal<ReservationStatus | 'all'>('all');
  q = signal<string>('');
  from = signal<string | undefined>(undefined);
  to   = signal<string | undefined>(undefined);

  // Etichetta compatta del range
  rangeLabel = computed(() => {
    const p = this.rangePreset();
    const fmt = (d: Date) =>
      new Intl.DateTimeFormat('it-IT', {
        weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric'
      }).format(d);
    const today = new Date();
    if (p === 'today') return `Oggi, ${fmt(today)}`;
    if (p === '7d') {
      const from = addDays(new Date(), -7);
      return `${fmt(from)} → ${fmt(today)}`;
    }
    if (p === 'custom') {
      const a = this.from() ?? '—';
      const b = this.to()   ?? '—';
      return `${a} → ${b}`;
    }
    return 'Tutte le date';
  });

  // Dati
  loading = signal(false);
  error = signal<string | null>(null);
  rows = signal<Reservation[]>([]);
  resultsCount = computed(() => this.rows().length);

  ngOnInit() {
    this.load();
    this.sub = this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map(() => this.router.url.split('?')[0]),
      distinctUntilChanged()
    ).subscribe(url => {
      if (url === '/reservations') this.load();
    });
  }
  ngOnDestroy() { this.sub?.unsubscribe(); }

  getStatusColor(s: ReservationStatus) {
    switch (s) {
      case 'pending':   return 'warning';
      case 'accepted':  return 'success';
      case 'rejected':  return 'danger';
      case 'cancelled': return 'medium';
      default:          return 'medium';
    }
  }

  private buildListParams() {
    const p = this.rangePreset();
    let from: string|undefined;
    let to  : string|undefined;

    if (p === 'today') {
      from = todayISO();
      to   = fmtDate(new Date());
    } else if (p === '7d') {
      from = fmtDate(addDays(new Date(), -7));
      to   = fmtDate(new Date());
    } else if (p === 'custom') {
      from = this.from() || undefined;
      to   = this.to()   || undefined;
    } else {
      from = undefined; to = undefined;
    }

    return { from, to, status: this.status(), q: this.q().trim() || undefined };
  }

  async load(ev?: CustomEvent) {
    this.loading.set(true);
    this.error.set(null);
    try {
      const data = await firstValueFrom(this.api.list(this.buildListParams()));
      this.rows.set(Array.isArray(data) ? data : []);
    } catch (e: any) {
      this.error.set(e?.message ?? 'Errore durante il caricamento');
    } finally {
      this.loading.set(false);
      if (ev) (ev.target as any)?.complete?.();
    }
  }

  onPresetChange(ev: CustomEvent) {
    this.rangePreset.set((ev.detail as any).value || 'today');
    if (this.rangePreset() !== 'custom') { this.from.set(undefined); this.to.set(undefined); }
    this.load();
  }
  onStatusChange(ev: CustomEvent) {
    this.status.set((ev.detail as any).value || 'all');
    this.load();
  }
  onSearchChange(ev: CustomEvent) {
    this.q.set((ev.detail as any).value || '');
    this.load();
  }
  clearSearch() {
    if (this.q()) { this.q.set(''); this.load(); }
  }

  trackById(_i: number, r: Reservation) { return r.id; }

  // Modal dettagli (resta disponibile)
  async openStatusActions(resv: Reservation) {
    const modal = await this.modalCtrl.create({
      component: StatusActionModalComponent,
      componentProps: { reservationId: resv.id },
      backdropDismiss: false,
    });
    await modal.present();
    const { data, role } = await modal.onDidDismiss();
    if (role !== 'confirm' || !data) {
      (await this.toast.create({ message: 'Chiuso senza modifiche', duration: 900 })).present();
      return;
    }
    const { action, reason } = data as { action: 'accept'|'reject'|'cancel'; reason?: string };
    await this.sendStatus(resv.id, action, reason);
  }

  // Policy locale per hard delete
  private canHardDelete(r: Reservation) {
    return r.status === 'cancelled' || this.forceDelete;
  }

  // Quick action sheet (stato + stampa singola + hard delete)
  async openQuickStatus(resv: Reservation) {
    const buttons: any[] = [
      {
        text: 'Accetta',
        icon: 'checkmark-circle-outline',
        handler: () => this.sendStatus(resv.id, 'accept')
      },
      {
        text: 'Rifiuta…',
        icon: 'close-circle-outline',
        handler: async () => {
          const reason = await this.askReason('reject');
          await this.sendStatus(resv.id, 'reject', reason);
        }
      },
      {
        text: 'Cancella…',
        icon: 'trash-outline',
        handler: async () => {
          const reason = await this.askReason('cancel');
          await this.sendStatus(resv.id, 'cancel', reason);
        }
      },
      // 🖨️ Stampa segnaposto singolo
      {
        text: 'Stampa segnaposto',
        icon: 'print-outline',
        handler: async () => {
          if (this.printing()) return;
          this.printing.set(true);
          try {
            (await this.toast.create({ message: 'Invio segnaposto…', duration: 900 })).present();
            await firstValueFrom(this.api.printPlacecardOne(resv.id));
            (await this.toast.create({ message: 'Segnaposto inviato ✅', duration: 1500 })).present();
          } catch (err: any) {
            console.error('🖨️❌ [List] printPlacecardOne KO', err);
            (await this.toast.create({
              message: `Errore stampa: ${err?.error?.error || err?.message || 'unknown'}`,
              duration: 2500, color: 'danger'
            })).present();
          } finally {
            this.printing.set(false);
          }
        }
      },
      {
        text: 'Dettagli…',
        icon: 'information-circle-outline',
        handler: () => this.openStatusActions(resv)
      },
      { text: 'Chiudi', role: 'cancel' }
    ];

    // “Elimina definitivamente” se consentito
    if (this.canHardDelete(resv)) {
      buttons.splice(buttons.length - 1, 0, {
        text: 'Elimina definitivamente',
        icon: 'trash-bin-outline',
        role: 'destructive',
        handler: () => this.onHardDelete(resv)
      });
    }

    const sheet = await this.sheet.create({ header: 'Cambia stato / Azioni rapide', buttons });
    await sheet.present();
  }

  private async askReason(kind: 'reject'|'cancel'): Promise<string | undefined> {
    const header = kind === 'reject' ? 'Motivo rifiuto' : 'Motivo cancellazione';
    const alert = await this.alert.create({
      header,
      inputs: [{ name: 'reason', type: 'textarea', placeholder: 'Motivo (opzionale)' }],
      buttons: [
        { text: 'Annulla', role: 'cancel' },
        { text: 'OK', role: 'confirm' }
      ]
    });
    await alert.present();
    const { role, data } = await alert.onDidDismiss();
    if (role !== 'confirm') return undefined;
    const val = (data?.values?.reason ?? '').toString().trim();
    return val || undefined;
  }

  private async sendStatus(id: number, action: 'accept'|'reject'|'cancel', reason?: string) {
    (await this.toast.create({ message: 'Invio azione…', duration: 800 })).present();
    this.api.updateStatus(id, action, reason).subscribe({
      next: async () => {
        await this.load();
        (await this.toast.create({ message: 'Stato aggiornato ✅', duration: 1500 })).present();
      },
      error: async (err) => {
        (await this.toast.create({
          message: `Errore: ${err?.error?.error || (err as any)?.message}`,
          duration: 2500,
        })).present();
      }
    });
  }

  // Hard delete con conferma
  private async onHardDelete(resv: Reservation) {
    const alert = await this.alert.create({
      header: 'Eliminare definitivamente?',
      message: `Prenotazione #${resv.id} — azione irreversibile.`,
      buttons: [
        { text: 'Annulla', role: 'cancel' },
        {
          text: 'Elimina',
          role: 'destructive',
          handler: async () => {
            try {
              const res = await firstValueFrom(
                this.api.remove(resv.id, { force: this.forceDelete, notify: this.notifyDelete })
              );
              if (res?.ok) {
                (await this.toast.create({ message: 'Eliminata ✅', duration: 1200 })).present();
                await this.load();
              } else {
                (await this.toast.create({ message: 'Eliminazione non eseguita', duration: 1800 })).present();
              }
            } catch (err: any) {
              const msg = err?.error?.message || err?.error?.error || err?.message || 'Errore eliminazione';
              (await this.toast.create({ message: msg, duration: 2600, color: 'danger' })).present();
            }
          }
        }
      ]
    });
    await alert.present();
  }

  // Filter sheet “bottom sheet”
  async openFilterSheet() {
    const modal = await this.modalCtrl.create({
      component: FilterSheetComponent,
      componentProps: {
        preset: this.rangePreset(),
        status: this.status(),
        from: this.from(),
        to: this.to(),
      },
      breakpoints: [0, 0.5, 0.75, 1],
      initialBreakpoint: 0.75,
      backdropBreakpoint: 0.5,
      handle: true,
      cssClass: 'filter-sheet-modal'
    });
    await modal.present();
    const { data, role } = await modal.onDidDismiss<FilterSheetResult>();
    if (role === 'apply' && data) {
      this.rangePreset.set(data.preset);
      this.status.set(data.status);
      if (data.preset === 'custom') {
        this.from.set(data.from);
        this.to.set(data.to);
      } else {
        this.from.set(undefined);
        this.to.set(undefined);
      }
      this.load();
    } else if (role === 'clear') {
      this.rangePreset.set('all');
      this.status.set('all');
      this.from.set(undefined); this.to.set(undefined);
      this.q.set('');
      this.load();
    }
  }

  // Stampa termica (oggi)
  async printTodayThermal() {
    if (this.printing()) return;
    this.printing.set(true);
    try {
      const t = new Date();
      const date = `${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,'0')}-${String(t.getDate()).padStart(2,'0')}`;
      const res = await firstValueFrom(this.api.printDaily({ date, status: this.status() }));
      (await this.toast.create({
        message: res?.ok
          ? `Job inviato alla termica${(res as any)?.printed_count ? ` (${(res as any).printed_count} righe)` : ''}`
          : 'Invio stampante fallito',
        duration: 1800
      })).present();
    } catch (err: any) {
      (await this.toast.create({ message: `Errore stampa: ${err?.error?.error || err?.message || 'unknown'}`, duration: 2500 })).present();
    } finally {
      this.printing.set(false);
    }
  }

  // Stampa segnaposti (oggi)
  async printPlacecardsToday() {
    if (this.printing()) return;
    this.printing.set(true);
    try {
      const t = new Date();
      const date = `${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,'0')}-${String(t.getDate()).padStart(2,'0')}`;
      (await this.toast.create({ message: 'Invio stampa segnaposti…', duration: 900 })).present();
      await firstValueFrom(this.api.printPlacecards(date, 'accepted'));
      (await this.toast.create({ message: 'Segnaposti inviati ✅', duration: 1500 })).present();
    } catch (err: any) {
      (await this.toast.create({ message: `Errore stampa: ${err?.error?.error || err.message}`, duration: 2500 })).present();
    } finally {
      this.printing.set(false);
    }
  }

  // Navigazione all’edit quando si tocca la riga
  openEdit(r: Reservation) {
    this.router.navigate(['/reservations', r.id, 'edit']);
  }

  // Click sul bottone “Azioni”: blocca la riga e apri il quick sheet
  onActionsClick(ev: Event, r: Reservation) {
    ev.stopPropagation();
    ev.preventDefault();
    this.openQuickStatus(r);
  }
}
```

### ./src/app/icons.ts
```
// src/app/icons.ts
import { addIcons } from 'ionicons';
import {
  home, list, addCircle, removeCircle, ellipsisVertical,
  funnelOutline, printOutline, qrCodeOutline, addOutline, calendarOutline,
  documentTextOutline, createOutline, trashOutline, saveOutline,
  callOutline, mailOutline, peopleOutline, timeOutline, searchOutline,
  checkmarkOutline, closeOutline
} from 'ionicons/icons';

export function registerAppIcons() {
  addIcons({
    home, list,
    'add-circle': addCircle,
    'remove-circle': removeCircle,
    'ellipsis-vertical': ellipsisVertical,
    'funnel-outline': funnelOutline,
    'print-outline': printOutline,
    'qr-code-outline': qrCodeOutline,
    'add-outline': addOutline,
    'calendar-outline': calendarOutline,
    'document-text-outline': documentTextOutline,
    'create-outline': createOutline,
    'trash-outline': trashOutline,
    'save-outline': saveOutline,
    'call-outline': callOutline,
    'mail-outline': mailOutline,
    'people-outline': peopleOutline,
    'time-outline': timeOutline,
    'search-outline': searchOutline,
    'checkmark-outline': checkmarkOutline,
    'close-outline': closeOutline,
  });
}
```

### ./src/app/shared/utils.date.ts
```
// src/app/shared/date.util.ts
//
// 🕒 Utilità piccole ma solide per gestire date/ore tra FE e BE.
// Policy che stiamo seguendo:
// - DB/sessione in UTC (MySQL DATETIME salvato come tempo UTC).
// - FE mostra in locale (es. Europe/Rome) e quando invia al BE converte in UTC.
// - I campi dei form usano <input type="datetime-local"> → stringhe "YYYY-MM-DDTHH:mm" (locale).
//
// In questo file trovi:
// - fmtDate / todayISO / startOfDayISO / addDays  → helper “giornalieri” (già usati).
// - toLocalDateTimeInputValue(Date|string)        → converte un istante in valore per <input datetime-local> (locale).
// - toUTCFromLocalDateTimeInput("YYYY-MM-DDTHH:mm") → converte l’input locale in stringa UTC "YYYY-MM-DD HH:mm:ss" (per MySQL).
//
// Nota parsing stringhe di origine BE:
// - Se arriva "YYYY-MM-DD HH:mm:ss" (senza 'T' / 'Z'), la interpretiamo come UTC (perché dal DB).
// - Se arriva ISO con 'Z' è già UTC, ok.
// - Qualsiasi altro formato con 'T' ma senza 'Z' verrà considerato dal costruttore Date come locale (comportamento standard JS).
//

/* ------------------------------- Helper base ------------------------------- */

function pad2(n: number) {
  return String(n).padStart(2, '0');
}

/** Ritorna "YYYY-MM-DD" in **locale** (comodo per filtri, ecc.) */
export function fmtDate(d: Date) {
  const y = d.getFullYear();
  const m = pad2(d.getMonth() + 1);
  const day = pad2(d.getDate());
  return `${y}-${m}-${day}`;
}

/** Oggi in "YYYY-MM-DD" (locale) */
export function todayISO() {
  return fmtDate(new Date());
}

/** Inizio giorno in "YYYY-MM-DD" (locale) — utile per preset OGGI */
export function startOfDayISO(d = new Date()) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return fmtDate(x);
}

/** Aggiunge N giorni ad una data e ritorna un nuovo Date */
export function addDays(d: Date, n: number) {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}

/* --------------------------- Conversioni Local/UTC -------------------------- */

/**
 * Converte un istante (Date o stringa) nel valore richiesto da
 * <input type="datetime-local">, cioè "YYYY-MM-DDTHH:mm" **in fuso locale**.
 *
 * Esempi:
 *  - toLocalDateTimeInputValue(new Date()) → "2025-10-12T14:30"
 *  - toLocalDateTimeInputValue("2025-10-11 19:30:00") → "2025-10-11T21:30" (se locale = UTC+2)
 *    ↑ stringa senza 'T' e 'Z' è trattata come UTC (perché proviene dal DB)
 */
export function toLocalDateTimeInputValue(dateLike?: Date | string | null): string {
  const d = normalizeToDate(dateLike);

  // Estraggo i componenti in **locale** per popolare il controllo HTML
  const y = d.getFullYear();
  const m = pad2(d.getMonth() + 1);
  const day = pad2(d.getDate());
  const hh = pad2(d.getHours());
  const mm = pad2(d.getMinutes());

  return `${y}-${m}-${day}T${hh}:${mm}`;
}

/**
 * Converte il valore di un <input type="datetime-local"> (es. "2025-10-12T20:15")
 * in una stringa UTC **per MySQL DATETIME**: "YYYY-MM-DD HH:mm:ss".
 *
 * Flusso:
 *  - Prende la stringa locale e costruisce un Date **locale**.
 *  - Converte quel momento in UTC e formatta "YYYY-MM-DD HH:mm:ss".
 *
 * Esempio (locale = Europe/Rome, UTC+2):
 *  - Input:  "2025-10-12T20:15"
 *  - UTC:    "2025-10-12 18:15:00"  ← pronto per salvarlo in DATETIME (UTC).
 */
export function toUTCFromLocalDateTimeInput(value: string): string {
  if (!value) throw new Error('datetime-local value mancante');

  // value è "YYYY-MM-DDTHH:mm" (locale)
  const [datePart, timePart] = value.split('T');
  if (!datePart || !timePart) throw new Error('Formato datetime-local non valido');

  const [y, m, d] = datePart.split('-').map((s) => parseInt(s, 10));
  const [hh, mm] = timePart.split(':').map((s) => parseInt(s, 10));

  // Costruisco una data **locale**
  const local = new Date(y, (m || 1) - 1, d || 1, hh || 0, mm || 0, 0, 0);

  // Estraggo i componenti **UTC** per generare stringa MySQL-friendly
  const uy = local.getUTCFullYear();
  const um = pad2(local.getUTCMonth() + 1);
  const ud = pad2(local.getUTCDate());
  const uh = pad2(local.getUTCHours());
  const umin = pad2(local.getUTCMinutes());
  const us = pad2(local.getUTCSeconds());

  return `${uy}-${um}-${ud} ${uh}:${umin}:${us}`;
}

/* --------------------------------- Interni -------------------------------- */

/**
 * Normalizza in Date:
 * - Date → ritorna clone
 * - stringa:
 *    * "YYYY-MM-DD HH:mm:ss"   → trattata come UTC (tipica dal DB), aggiungo 'Z'
 *    * ISO con 'Z'             → è già UTC, ok
 *    * altro con 'T' senza 'Z' → lasciamo al costruttore (locale)
 * - null/undefined → uso new Date()
 */
function normalizeToDate(input?: Date | string | null): Date {
  if (!input) return new Date();

  if (input instanceof Date) {
    return new Date(input.getTime()); // clone
  }

  const s = String(input).trim();

  // Caso classico dal DB: "YYYY-MM-DD HH:mm:ss" (senza T/Z) → interpreta come UTC
  if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(s)) {
    return new Date(s.replace(' ', 'T') + 'Z');
  }

  // ISO con Z → già UTC
  if (s.endsWith('Z')) {
    return new Date(s);
  }

  // Altri casi (con 'T' ma senza 'Z') → il costruttore li interpreta in locale
  return new Date(s);
}

/* ------------------------------- Esempi d'uso ------------------------------
 *
 * // In una pagina "Nuova prenotazione":
 * form.patchValue({
 *   // Mostra di default il prossimo quarto d'ora nel controllo datetime-local
 *   start_at_local: toLocalDateTimeInputValue(new Date())
 * });
 *
 * // In submit:
 * const startUtc = toUTCFromLocalDateTimeInput(this.form.value.start_at_local!);
 * // → invia al BE come start_at (UTC, "YYYY-MM-DD HH:mm:ss")
 *
 * -------------------------------------------------------------------------- */
```

### ./src/app/shell/shell.page.html
```
<!-- src/app/shell/shell.page.html -->

<!-- Header superiore -->
<ion-header>
  <ion-toolbar>
    <!-- 🔧 In desktop vogliamo vedere SEMPRE l’hamburger -->
    <ion-buttons slot="start">
      <ion-menu-button [autoHide]="false"></ion-menu-button>
    </ion-buttons>

    <ion-title>Admin</ion-title>

    <ion-buttons slot="end">
      <ion-button (click)="onLogout()">Logout</ion-button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>

<!-- Layout a due colonne: menu a sinistra, contenuti a destra -->
<!-- when="(min-width: 992px)" => da 992px in su il menu resta sempre visibile -->
<ion-split-pane when="(min-width: 992px)" contentId="main-content">
  <!-- SIDEMENU -->
  <ion-menu contentId="main-content" type="overlay">
    <ion-header>
      <ion-toolbar>
        <ion-title>Menu</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <!-- 🧠 TRUCCO: [autoHide]="false"
             Se lasci auto-hide="true", in split-pane (desktop) gli item si nascondono! -->
        <ion-menu-toggle [autoHide]="false" *ngFor="let item of items">
          <ion-item button [routerLink]="item.path" routerLinkActive="ion-activated">
            <!-- Le icone appaiono se sono state registrate (vedi icons.ts) -->
            <ion-icon slot="start" *ngIf="item.icon" [name]="item.icon"></ion-icon>
            <ion-label>{{ item.label }}</ion-label>

            <!-- === INIZIO MODIFICA (badge "In attesa") === -->
            <!-- ✅ Se la voce è la lista prenotazioni e abbiamo un numero valido, mostro il badge -->
            <ion-badge *ngIf="item.badge && pendingToday() >= 0" slot="end" color="warning">
              {{ pendingToday() }}
            </ion-badge>
            <!-- === FINE MODIFICA === -->
          </ion-item>
        </ion-menu-toggle>
      </ion-list>
    </ion-content>
  </ion-menu>

  <!-- AREA CONTENUTI (deve avere lo stesso id di contentId sopra) -->
  <ion-content id="main-content">
    <ion-router-outlet></ion-router-outlet>
  </ion-content>
</ion-split-pane>
```

### ./src/app/shell/shell.page.scss
```
/* Evidenzia la voce attiva in lista */
ion-item.ion-activated {
  --background: rgba(56, 128, 255, 0.12);
}

/* (Se avevi regole “mobile-only” che nascondevano l’hamburger su desktop, rimuovile) */
/*
.mobile-only { display: none; }
@media (max-width: 991px) {
  .mobile-only { display: flex; }
}
*/
```

### ./src/app/shell/shell.page.ts
```
// src/app/shell/shell.page.ts
import { Component, inject, signal } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonMenuButton,
  IonSplitPane, IonMenu, IonContent, IonList, IonMenuToggle, IonItem, IonIcon,
  IonLabel, IonBadge, IonRouterOutlet
} from '@ionic/angular/standalone';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../core/auth/auth.service';
import { ReservationsApi } from '../core/reservations/reservations.service';

// === Tipizzazione voce di menu (badge opzionale) ============================
interface MenuItem {
  label: string;
  path: string;
  icon?: string;
  badge?: boolean; // se true, mostro il badge "In attesa"
}

@Component({
  selector: 'app-shell',
  standalone: true,
  templateUrl: './shell.page.html',
  styleUrls: ['./shell.page.scss'],
  imports: [
    // Angular
    CommonModule, NgFor, RouterLink, RouterLinkActive,
    // Ionic
    IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonMenuButton,
    IonSplitPane, IonMenu, IonContent, IonList, IonMenuToggle, IonItem,
    IonIcon, IonLabel, IonBadge, IonRouterOutlet,
    // Router outlet
    RouterOutlet,
  ],
})
export class ShellPage {
  private auth  = inject(AuthService);
  private router = inject(Router);
  private api    = inject(ReservationsApi);

  // 🔖 Voci del menù (rotta + icona)
  items: MenuItem[] = [
    { label: 'Dashboard',            path: '/diagnostics',      icon: 'home' },
    { label: 'Lista prenotazioni',   path: '/reservations',     icon: 'list',       badge: true },
    { label: 'Nuova prenotazione',   path: '/reservations/new', icon: 'add-circle' },
    { label: 'Ordini (live)',      path: '/orders',           icon: 'time-outline' },
    { label: 'Nuovo ordine',       path: '/orders/new',       icon: 'create-outline' },
    { label: 'Prenota',      path: '/prenota',           icon: 'time-outline' },
  ];

  // === Badge "in attesa" =====================================================
  pendingToday = signal<number>(0);
  private timer: any;

  constructor() {
    this.refreshPendingBadge();
    this.timer = setInterval(() => this.refreshPendingBadge(), 60_000);
    console.log('🧭 [Shell] menu items:', this.items);
  }

  ngOnDestroy(): void {
    if (this.timer) clearInterval(this.timer);
  }

  // Calcolo YYYY-MM-DD locale (coerente FE → BE)
  private todayISO(): string {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  // Chiamo il BE per aggiornare il conteggio; log a emoji per debug veloce
  refreshPendingBadge() {
    const from = this.todayISO();
    const to = from;
    this.api.countByStatus({ from, to }).subscribe({
      next: (res) => {
        const n = Number((res as any)?.pending ?? 0);
        this.pendingToday.set(n);
        console.log('🟡 [Shell] pending today =', n);
      },
      error: (err) => {
        console.warn('⚠️ [Shell] countByStatus KO', err);
        this.pendingToday.set(0);
      }
    });
  }

  onLogout() {
    console.log('🔐 [Shell] logout()');
    this.auth.logout();
    this.router.navigate(['/login'], { queryParams: { redirect: '/diagnostics' } });
  }
}
```

### ./src/index.html
```
<!doctype html>
<html lang="en">
<head>
  <script src="https://accounts.google.com/gsi/client" async defer></script>
  <meta charset="utf-8">
  <title>AdminPwa</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <link rel="manifest" href="manifest.webmanifest">
  <meta name="theme-color" content="#3880ff">
</head>
<body>
  <app-root></app-root>
</body>
</html>
```

### ./src/main.ts
```
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';
registerLocaleData(localeIt);

bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));
```

### ./src/styles.scss
```
/* src/styles.scss
 * ============================================================================
 * Import CSS Ionic + piccoli fix per z-index FAB e tap su iOS/Android
 * (abilito pointer-events sui pulsanti nello slot=end della riga).
 * Mantengo la tua UI, solo ritocchi per allineamento icone/pulsanti.
 * ============================================================================
 */
@import '@ionic/angular/css/core.css';
@import '@ionic/angular/css/normalize.css';
@import '@ionic/angular/css/structure.css';
@import '@ionic/angular/css/typography.css';
@import '@ionic/angular/css/display.css';
@import '@ionic/angular/css/padding.css';
@import '@ionic/angular/css/float-elements.css';
@import '@ionic/angular/css/text-alignment.css';
@import '@ionic/angular/css/text-transformation.css';
@import '@ionic/angular/css/flex-utils.css';

/* FAB sempre sopra */
ion-fab { z-index: 9999; }

/* Sblocco tap su iOS/Android:
   - se la tua lista usa ion-buttons nello slot=end */
.resv-row ion-buttons[slot='end'] { pointer-events: auto; }
.resv-row ion-buttons[slot='end'] ion-button { pointer-events: auto; }

/* E nel caso in cui in qualche vista ci siano ion-button direttamente nello slot=end */
.resv-row ion-button[slot='end'] { pointer-events: auto; }

/* FAB (mobile) – icone perfettamente centrate */
.fab-resv ion-fab-button {
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.fab-resv ion-fab-list ion-fab-button {
  width: 48px;
  height: 48px;
}
.fab-resv ion-icon {
  font-size: 24px;
  line-height: 1;
}

/* Bottoni orari compatti: icona/testo allineati */
ion-button[fill="outline"] ion-icon,
ion-button[fill="solid"]   ion-icon {
  vertical-align: middle;
}

/* Migliora target touch su mobile (>=44px) solo dove serve */
@media (pointer: coarse) {
  ion-button { min-height: 44px; }
}

/* Nessun cambiamento di palette/tema: lasciamo tutto com’è */
    ```

### ./tsconfig.app.json
```
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/app",
    "types": [],
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "useDefineForClassFields": false
  },
  "files": ["src/main.ts"],
  "include": ["src/**/*.d.ts"]
}
```

### ./tsconfig.json
```
/* To learn more about Typescript configuration file: https://www.typescriptlang.org/docs/handbook/tsconfig-json.html. */
/* To learn more about Angular compiler options: https://angular.dev/reference/configs/angular-compiler-options. */
{
  "compileOnSave": false,
  "compilerOptions": {
    "strict": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": false,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "skipLibCheck": true,
    "isolatedModules": true,
    "experimentalDecorators": true,
    "importHelpers": true,
    "target": "ES2022",
    "module": "preserve"
  },
  "angularCompilerOptions": {
    "enableI18nLegacyMessageIdFormat": false,
    "strictInjectionParameters": true,
    "strictInputAccessModifiers": true,
    "typeCheckHostBindings": true,
    "strictTemplates": true
  },
  "files": [],
  "references": [
    {
      "path": "./tsconfig.app.json"
    },
    {
      "path": "./tsconfig.spec.json"
    }
  ]
}
```

### ./tsconfig.spec.json
```
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "types": ["jasmine", "node"] // or your test runner types
  }
}
```
