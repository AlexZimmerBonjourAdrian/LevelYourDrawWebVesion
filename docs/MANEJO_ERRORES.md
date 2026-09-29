# Manejo de errores — LevelYourDraw (version purgada)

## Principios

1. Se muestra lo que dijo el servidor, textual, con identificador unico. Nunca generico.
2. Logs de red solo en desarrollo (`__DEV__`). En entrega van apagados.
3. Ningun dato critico se completa con un valor por defecto: si falta, se corta y se avisa.
4. La app calcula para mostrar; el servidor decide. Si difieren, manda el servidor y se reporta.

## Patron de cliente (logica reutilizada, nombres neutros)

- Interceptor unico: extrae `status`, `code`, mensaje del servidor; genera `ERR-<base36>-<azar>`.
- Respuesta 422 de validacion: aplana `detail[].msg`.
- En desarrollo imprime endpoint, identificador, estado y mensaje. En produccion no imprime cuerpo.

## UI

- Mensaje textual en monoespaciada + boton reintentar. Sin emojis.
- Try-catch en conversiones criticas (fechas, importes). Si un filtro falla, se registra y se continua sin romper.

