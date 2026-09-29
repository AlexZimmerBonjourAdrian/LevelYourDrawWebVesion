# Seguridad — LevelYourDraw

## Lo que nunca entra al repositorio

- Contrasenas, tokens, claves de API.
- Archivos de firma: `.keystore`, `.jks`, `.p8`, `.p12`, `.mobileprovision`.
- `google-services.json`, `GoogleService-Info.plist`.
- Cualquier `.env`. Solo `.env.example` con relleno.

Si un secreto llega a un commit, se rota. Borrarlo despues no alcanza.

## Donde vive cada cosa

| Que | Donde |
|---|---|
| URL del backend | Variable de entorno |
| Token de sesion | Almacen seguro del SO |
| Preferencias | Almacenamiento comun, solo preferencias |

## Reglas

- Al cerrar sesion se borra todo rastro de la sesion.
- Sin datos de usuarios en logs de produccion.
- Todo por HTTPS, sin excepciones temporales.
- Permisos minimos en tiendas.
