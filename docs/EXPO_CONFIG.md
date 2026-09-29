# Configuración de Expo — LevelYourDraw

## Estado actual

El proyecto ya está configurado con Expo SDK 57 y es compatible con Expo Go (sin dev-client ni módulos nativos fuera del SDK).

## Archivos de configuración

### app.json
Configuración principal de Expo:
- **Nombre**: LevelYourDraw
- **Slug**: levelyourdraw
- **Orientación**: portrait
- **Android**: package `com.example.levelyourdraw` con permisos de cámara y almacenamiento
- **Permisos Android**: CAMERA, READ_EXTERNAL_STORAGE, WRITE_EXTERNAL_STORAGE
- **Proyecto EAS**: configurado para builds en la nube

### package.json
Dependencias principales:
- Expo SDK 57
- React Native 0.86.3
- React Navigation (bottom tabs + native stack)
- Expo Font, File System, Linear Gradient, Status Bar
- AsyncStorage para persistencia local
- React Native SVG

### tsconfig.json
TypeScript estricto (sin `any`), extendiendo la base de Expo.

### eas.json
Configuración de EAS Build:
- **development**: dev-client, distribución interna, APK
- **preview**: distribución interna
- **production**: auto-incremento de versión

## Scripts disponibles

```bash
npm start          # Iniciar servidor de desarrollo
npm run android    # Ejecutar en Android
npm run ios        # Ejecutar en iOS
npm run web        # Ejecutar en web
npm run lint       # Ejecutar ESLint
npm run lint:fix   # Auto-corregir ESLint
npm run format     # Formatear con Prettier
```

## Variables de entorno

El proyecto usa variables de entorno para configuración opcional (endpoint, banderas). Ver `.env.example` en `LevelYourDraw/`.

**Importante**: Nunca commitear `.env`, solo `.env.example`.

## Convenciones del proyecto

- **Offline primero**: La app funciona sin backend
- **Compatible con Expo Go**: Sin dev-client ni módulos nativos fuera del SDK
- **Permisos mínimos**: Cámara y galería solo cuando la función los exige
- **Seguridad**: Sin secretos en el repositorio, solo `.env.example`
- **Build de entrega**: Se define en S3 (configuración pendiente)

## Próximos pasos según PLAN.md

1. Generador con descarte por sesión + toggle ES/EN (Hito S1)
2. Pantalla de brief + historial de sesión
3. Persistencia local: últimos briefs y favoritos
