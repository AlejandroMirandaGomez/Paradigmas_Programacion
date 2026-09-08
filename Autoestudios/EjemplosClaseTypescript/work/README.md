<div style="
    background-color: #f8fafc; 
    border-left: 6px solid #1d4ed8; 
    padding: 24px; 
    border-radius: 8px; 
    font-family: system-ui, sans-serif; 
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    margin-bottom: 25px;
">
    <div style="font-size: 0.85em; text-transform: uppercase; letter-spacing: 1px; color: #64748b; font-weight: 600; margin-bottom: 8px;">
       Universidad Nacional de Costa Rica (UNA)
    </div>
    <div><strong>Escuela de Informática </strong>
    </div>
    
    <h1 style="margin: 0 0 12px 0; color: #1e293b; font-size: 1.5em; line-height: 1.2;">
        EIF400-II-2026: Paradigmas de Programación
    </h1>
    
    <hr style="border: 0; border-top: 1px solid #e2e8f0; margin-bottom: 16px;">
    
    <div style="display: flex; gap: 40px; flex-wrap: wrap; color: #334155; font-size: 0.65em;">
        <div>
            <span style="color: #64748b; font-weight: 500;">Docente:</span>
            <strong>Carlos Loría-Sáenz.   <pre>carlos.loria.saenz@una.cr</pre></strong>
        </div>

</div>

---
# Entorno de Programación Consola en TS

Entorno básico para experimentar con `Javascript` y `TypeScript` desde una consola (desarrollo minimalista).

## Requisitos Previos
* Usar los archivos `package.json` y `tsconfig.json` adjuntos. No usarlos puede generar errores que requieren `hacks` a veces muy técnicos.
* Uso básico de consola
* Tener instalado `node` (versión 18+).
* Tener `nodemon` instalado globalmente. Para instalarlo en una consola (admin):
```bash
npm install -g nodemon
```
* **Nota**: Estos requisitos se cumplen en el Lab.

## Pasos

### 0. Crear un directorio de trabajo
Si no existe, crea ahí un archivo de trabajo, por ejemplo, `Work.ts` en un editor de código (ej. `Notepad++`) y codificar ahí alguna *solución* o prueba. 

En ese directorio copiar `package.json` y `tsconfig.json` adjuntos.

### 1. Instalar dependencias
Descargar las herramientas necesarias para la ejecución `en memoria` (y el autocompletado del editor si se usara alguno), según se explica. 

Lo siguiente usa el `package.json` para instalar esas dependencias (entre ellas especialmente `tsx`)

```bash
npm install
```

### 2. Iniciar el entorno experimental

* **Nota** si se cambia el nombre del archivo de trabajo  modificar el `package.json` tag de scripts.

En una consola ubicada **en el directorio de trabajo**: ejecutar el script de watch automático. 

La consola compilará en memoria y se reiniciará sola cada vez que haya cambios. Hay dos opciones **equivalentes**:
* Así
```bash
tsx watch Work.ts
```
* O así usando el script step `dev` del `package.json`
```bash
npm run dev
```

### 3. Forma de Trabajo
1. Es trabajo sin tipar (**solo transpilar** de ts a js y ejecutar)

2. Una vez funcionando una caso correr la verificación de tipos manualmente. En una consola aparte posicionada en el mismo directorio del archivo de trabajo haga alguna opción entre las siguiente:

*  Para hacer chequeo de tipos de vez en cuando
```bash
tsc --noEmit
```

* Para hacer chequeo de tipos después de cada cambio: 
```bash
nodemon -e ts js --exec "tsc --noEmit"
```
---

## Ventajas y Alcances de este modelo de trabajo
* Simple para empezar a experimentar sin usar un IDE (es **minimalista**)
* **Sin archivos basura:** No genera archivos `.js` o derivados. Todo se ejecuta directamente en memoria.
* **Genéricos limpios:** Simplifica la sintaxis de funciones flecha estándar para tus genéricos (`<T>`) sin necesidad de hacks decorativos o comas ficticias.

