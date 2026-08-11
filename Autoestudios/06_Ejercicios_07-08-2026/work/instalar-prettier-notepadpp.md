# Instalar Prettier para formateo automático en Notepad++

## 1. Instalar Node.js (si no lo tienes)

Descarga e instala Node.js desde [nodejs.org](https://nodejs.org). Verifica la instalación:

```bash
node --version
npm --version
```

## 2. Instalar Prettier en el proyecto

Parado en la carpeta raíz de tu proyecto (por ejemplo `D:\UNA\Paradigmas\ale_notes\05\work`):

```bash
npm init -y
npm install --save-dev prettier
```

## 3. (Opcional) Configurar el estilo de Prettier

Crea un archivo `.prettierrc` en la raíz del proyecto:

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2
}
```

## 4. Instalar los plugins de Notepad++

En Notepad++: **Plugins > Plugins Admin**, busca e instala:

- **NppExec**
- **NppEventExec**

Reinicia Notepad++ si te lo pide.

## 5. Crear el script en NppExec

**Plugins > NppExec > Execute**, escribe:

```
cmd /c npx prettier --write "$(FULL_CURRENT_PATH)"
```

Guárdalo con un nombre, por ejemplo `FormatFile`.

## 6. Crear la regla en NppEventExec

**Plugins > NppEventExec**, crea una nueva regla:

| Campo | Valor |
|---|---|
| Name | Format on save |
| Event | `NPPN_FILESAVED` |
| Regex | `.*\.(js\|jsx\|ts\|tsx)$` |
| NppExec command | `FormatFile` |
| Enabled? | ✅ |

Dale **Apply** y luego **Save**.

## 7. Probar

Guarda cualquier archivo `.js`, `.jsx`, `.ts` o `.tsx`. Revisa la consola de NppExec: debería mostrar `Process finished. (Exit code 0)` sin errores.

> **Nota:** Prettier modifica el archivo en disco, pero el buffer abierto en Notepad++ no se refresca solo. Cierra y reabre el archivo (o recárgalo) para ver el formateo aplicado.
