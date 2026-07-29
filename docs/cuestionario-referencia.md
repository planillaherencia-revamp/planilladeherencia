# Cuestionario de Caudal Relicto — referencia para la Fase 2

Extraído del PDF oficial que usa Marisol hoy (`Cuestionario Caudal Relicto.pdf`,
10 páginas: 8 de cuestionario + Modelo SC 2745 de 2 páginas).
Este documento manda sobre el modelo de datos del cuestionario en línea.

## Datos clave confirmados

- La planilla se tramita en **SURI** (Sistema Unificado de Rentas Internas).
- Nombre correcto: **Planilla Informativa de Caudal Relicto**.
- **Plazo: 12 meses** desde el fallecimiento, para causantes fallecidos **a
  partir del 1 de enero de 2018**. Para fallecimientos anteriores aplican
  formularios y plazos distintos. *(El sitio decía 9 meses — corregido.)*
- **Modelo SC 2745 = «Poder y Declaración de Representación»** — es la
  autorización para representar al contribuyente, NO el Relevo. Requiere copia
  de identificación con foto vigente. Vigencia la fija el contribuyente, máximo
  1 año.
- Marisol firma como **Especialista en Planillas** (designación «c» en la
  Declaración del Representante del SC 2745).
- Contacto: planillaherencia@gmail.com · 787-553-3290
- Las certificaciones (CRIM, Registro Demográfico, tribunales) **caducan**; si
  el caso se dilata hay que volver a solicitarlas antes de radicar.

## Secciones del cuestionario

### I. Administrador (solo uno)
Nombre completo · fecha de nacimiento · dirección postal · ciudad/estado/CP ·
ciudadanía · seguro social · teléfono · correo · **relación con el causante**
(heredero forzoso, cónyuge supérstite, albacea, contador partidor, administrador
judicial).

> Ojo: el administrador es una entidad distinta del «cliente». Puede o no ser
> heredero.

### II. Causante
Nombre completo con ambos apellidos · variaciones del nombre usadas · última
dirección conocida · ciudad/estado/CP · seguro social · fecha y lugar de
nacimiento · ciudadanía · ¿nacido en PR? · ¿residente de PR al fallecer? ·
¿ciudadano de EE.UU.? · fecha y lugar de fallecimiento · ocupación u oficio.

> `fecha_fallecimiento` es un campo **crítico**: decide el plazo (12 meses) y si
> el valor de los bienes se reporta como *base* o como *tasación* (ver VII).

### III. Padres del causante
Madre y padre: nombre completo · fecha de nacimiento · lugar de nacimiento ·
fecha de fallecimiento (si aplica).

### IV. Estado civil del causante — **condicional**
Estado civil al fallecer: Soltero(a) / Casado(a) / Divorciado(a) / Viudo(a).

- **Si casado(a):** nombre del cónyuge · seguro social · fecha y lugar de
  nacimiento · ¿está vivo? · si falleció, fecha · fecha y lugar del matrimonio ·
  **régimen económico** (sociedad legal de gananciales / separación de bienes /
  otro).
- **Si viudo(a):** nombre del cónyuge fallecido · fecha de fallecimiento.
- **Si divorciado(a):** fecha del divorcio.
- Campo libre para capitulaciones u observaciones.

> El régimen económico determina la columna Privativo/Ganancial de cada bien.

### V. Herederos / beneficiarios (repetible, N filas)
Nombre completo · relación con el causante · fecha de nacimiento · dirección ·
teléfono · correo.

### VI. Testamento y situación — **condicional**
- ¿Dejó testamento? Sí/No
  - **Sí:** tipo (Cerrado / Abierto / Ológrafo) · fecha de otorgación · nombre
    del notario (abierto o cerrado) · número de caso de protocolización
    (ológrafo).
  - **No:** número de caso de la Declaratoria de Herederos.
- ¿Propiedades fuera de Puerto Rico? Sí/No
- ¿Cajas de seguridad? Sí/No → banco y número de caja
- ¿Deudas contributivas al fallecer? Sí/No

### VII. Bienes — tabla única con código de tipo

**Una sola tabla**, no una por categoría. Columnas:

| Campo | Notas |
| --- | --- |
| Partida núm. | correlativo |
| Tipo (código) | A–J, ver abajo |
| Descripción de la propiedad | inmuebles: descripción registral (Karibe/escritura) — cabida, linderos, número de finca, tomo y folio |
| Cómo se adquirió (código) | C compraventa · H herencia · D donación · P permuta · O otros |
| Núm. de identificación | catastro (inmuebles) o número de cuenta (bancos/inversiones) |
| Localizada en PR | S/N |
| Privativo (P) / Ganancial (G) | depende del régimen económico (sección IV) |
| % de participación | numérico |
| Valor / Base | ver regla condicional abajo |

**Códigos de tipo de propiedad:**

| Código | Tipo |
| --- | --- |
| A | Bienes raíces |
| B | Efectivo (bancos y casas de corretaje) |
| C | Acciones y otros valores |
| D | Hipotecas y pagarés |
| E | Automóviles, aviones o embarcaciones |
| F | Contenido en cajas de seguridad |
| G | Muebles, enseres o equipo del hogar |
| H | Arte o joyería |
| I | Otros bienes muebles |
| J | Otros bienes inmuebles |

**Regla condicional de valoración** (depende de `fecha_fallecimiento`):

- Falleció **desde el 1 de enero de 2018** → se informa la **base** de la
  propiedad en manos del causante (costo de adquisición más mejoras), conforme a
  la Sección 1034.02 del Código.
- Falleció **antes** → se informa el **valor de tasación** (valor justo de
  mercado) a la fecha del fallecimiento, y hace falta **informe de tasación**.

### VIII. Asesores profesionales (opcional)
Contable · abogado(a) · asesor(a) financiero(a) · agente de seguros.
Para cada uno: nombre de contacto · compañía/oficina · dirección · teléfono ·
correo. Solo si aportan información o gestiones al caso.

### IX. Hoja de cotejo de documentos

**Parte A — obligatorios en TODOS los casos**
- Certificado de defunción
- Declaratoria de herederos o testamento
- Certificación de valores contributivos del CRIM (sin deuda)
- (más el SC 2745 firmado + copia de identificación con foto vigente)

**Parte B — condicionales, según los bienes**

| Documento | Se activa cuando |
| --- | --- |
| Número de catastro de las propiedades inmuebles | hay bienes tipo A o J |
| Copia de escritura o descripción registral de Karibe | hay bienes tipo A o J |
| Estados bancarios más recientes de todas las cuentas | hay bienes tipo B |
| Estados de cuentas de inversión, valores u otros | hay bienes tipo B o C |
| Licencias de vehículos, embarcaciones, etc. | hay bienes tipo E |
| Acta de apertura de caja de seguridad | ¿cajas de seguridad? = Sí (sección VI) o bienes tipo F |
| Informe de tasación a la fecha del fallecimiento | `fecha_fallecimiento` < 2018-01-01 |
| Pólizas de seguro de vida, incapacidad u otras | el causante tenía pólizas |

## Implicaciones para el modelo de datos

Esto **reemplaza** el diseño de 8 tablas tipadas (`asset_real_estate`,
`asset_bank_accounts`, …) del plan original. El formulario oficial usa una tabla
única con código de tipo, así que el esquema debe seguirlo:

- `case_assets` — una fila por partida, con `type_code` (A–J),
  `acquisition_code` (C/H/D/P/O), `description`, `identification_number`,
  `located_in_pr`, `ownership_type` (P/G), `participation_pct`, `value_base`.
- Entidades nuevas que no estaban en el plan: `administrators`,
  `decedent_parents`, `spouse_info`, `will_info`, `professional_advisors`.
- `document_requirements` — derivadas automáticamente de los tipos de bien
  presentes y de la fecha de fallecimiento (tabla de arriba). Esto es lo que
  hace que el cuestionario sea «condicionado»: la lista de documentos que se le
  pide al cliente se calcula, no se pregunta.

## Pendiente de confirmar con Marisol

- Si el cuestionario en línea debe permitir que **el cliente** lo llene, o si
  siempre lo llena ella con la información que el cliente le provee.
- Si hace falta capturar deudas y gastos deducibles (gastos funerarios,
  hipotecas) como partidas — el PDF no tiene sección aparte para ellos, pero la
  planilla SC 2800 sí los contempla.
- Cómo se numeran las partidas cuando hay más bienes de los que caben en la
  tabla (el PDF dice «anexe páginas adicionales»).
