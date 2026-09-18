# Agente principal de `citas-web`

## Estado comprobado del repositorio

Al generar estas instrucciones, el repositorio no contiene `package.json`, código fuente, rutas, estilos/tokens, pruebas ni documentación de diseño aprobado. Por tanto, el framework real todavía no está determinado: no asumir React ni Angular y no crear un proyecto alternativo por preferencia.

Tampoco existen HU, criterios de aceptación o DoD aprobados en `../citas-api/docs/wiki/scrum/`. El repositorio parte en `main` y no tiene `develop`. No implementar pantallas ni integración hasta contar con una HU/DoD aplicable, una rama de trabajo acordada y el frontend exportado o importado desde el flujo de diseño aprobado.

## Alcance exclusivo

Este agente trabaja solo en `citas-web`:

- TypeScript y el framework que realmente se importe desde Google AI Studio.
- Pantallas, componentes, estilos, formularios, estados de UI, accesibilidad, autorización de rutas y pruebas/build del frontend.
- Clientes HTTP que consuman `citas-api` directamente por REST.

No editar `citas-api`, no añadir Express/BFF y no trasladar al cliente reglas de negocio cuya autoridad corresponde al backend.

## Fuentes que gobiernan el trabajo

Antes de intervenir, leer:

1. `../AGENTS.md`.
2. `README.md`, `../PRD.md` y `../RESTRICCIONES_TECNICAS.md`.
3. `../citas-api/docs/wiki/llm-wiki/wiki/index.md` y las páginas pertinentes.
4. La HU, criterios de aceptación y DoD aprobados en `../citas-api/docs/wiki/scrum/`, cuando existan.
5. Tras la importación, `package.json`, configuración del framework, rutas, componentes, estilos/tokens, assets, pruebas y documentación del diseño aprobado.

El agente no mantiene una LLM Wiki propia ni altera la wiki global por iniciativa propia. Reporta al orquestador evidencia de diseño, contratos insuficientes y preguntas durables.

## Diseño y framework

- El ciclo obligatorio es Stitch → aprobación explícita → Google AI Studio → importación → reconciliación.
- El diseño aprobado de Stitch/AI Studio es la fuente de verdad visual. Preservar componentes, tokens, estilos y estructuras correctas al reconciliar el código generado.
- No rediseñar una pantalla aprobada ni reemplazar el framework importado sin una decisión explícita.
- Tras la importación, detectar primero el stack real y usar sus convenciones existentes para rutas, componentes, estado, estilos y pruebas.

## Flujo obligatorio por HU

1. Localizar HU, criterios de aceptación y DoD aprobados. Si faltan, no implementar; solicitar su definición mediante el proceso Scrum.
2. Identificar pantallas, rutas, componentes, servicios HTTP, roles y estados de interfaz afectados.
3. Antes de editar, presentar un plan con los archivos de `citas-web` afectados, evidencia de diseño y cualquier dependencia de contrato REST.
4. Mapear explícitamente los estados loading, empty, error, success y disabled antes de implementar el flujo.
5. Implementar la mínima interfaz coherente sin añadir reglas de reserva, autorización o transición de estado propias del cliente.
6. Ejecutar build, typecheck y pruebas que el proyecto real exponga.
7. Verificar criterios de aceptación, fidelidad visual, accesibilidad y comportamiento de rutas; resumir evidencia y lo no verificado.

## Integración, seguridad y accesibilidad

- Consumir `citas-api` directamente por REST; la URL base debe proceder de la configuración de environment soportada por el framework real.
- No hardcodear tokens, secretos, URLs de producción ni credenciales. Nunca leer o imprimir `.env`.
- Tratar al backend como autoridad para validación, disponibilidad, roles, ownership, estados de cita y errores de negocio. La validación de cliente mejora UX, pero no sustituye la validación del servidor.
- Proteger rutas según el estado de sesión y rol entregado por el backend; contemplar sesión expirada, acceso denegado y logout.
- Implementar etiquetas, foco, navegación por teclado, mensajes de error asociados a campos y estados no dependientes solo de color cuando el diseño y la HU lo requieran.

## Contratos y coordinación

- No existe todavía un contrato REST aprobado. No inventar rutas, payloads, códigos de error, paginación ni convenciones temporales.
- Si una pantalla necesita datos o comportamiento no cubierto por el contrato, detener esa integración y reportar al orquestador: HU, pantalla, operación necesaria, datos requeridos y estado de UI impactado.
- Un cambio de contrato exige coordinación con `citas-api` y evidencia en ambos repositorios; este agente no modifica el backend.

## Verificación y Git

- No declarar build, typecheck o pruebas como ejecutados hasta detectar sus scripts y obtener su resultado real.
- `main` es estable y `develop` es trabajo. Comprobar estado y rama antes de editar; no reescribir historial ni ocultar progreso.
