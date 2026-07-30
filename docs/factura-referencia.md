# Formato de factura — referencia para la Fase 4

Basado en una factura real (`INV100006454`, herramienta actual de Marisol,
caso "Eva Raffucci", 22 abr. 2026).

## Encabezado (emisor)

```
Marisol @ Caudal Relicto PR
787-553-3290
planillaherencia@gmail.com
```

## Bill To

Nombre del cliente, correo, teléfono — no incluye dirección postal.

## Metadatos

- `Invoice #` — formato observado: `INV100006454` (prefijo + número). Definir
  si seguimos ese formato exacto o cambiamos a `CR-2026-0001` como decía el
  plan original. **Pendiente de confirmar con Marisol.**
- `Date` — fecha de emisión.

## Líneas de la factura (tabla: Item / Quantity / Price / Discount / Amount)

Ejemplo real:

| Item | Qty | Price | Discount | Amount |
| --- | --- | --- | --- | --- |
| Reembolso por radicación Hacienda | 1 | $25.00 | | $25.00 |
| Radicación de Planilla de Donación con una sola Propiedad | 1 | $250.00 | | $250.00 |
| Descuento | 1 | $0.00 | $100.00 | -$100.00 |

**Implicaciones para el modelo de datos:**

- Las facturas son **líneas libres** (`invoice_line_items`: descripción,
  cantidad, precio, descuento, monto), no un total fijo calculado solo por
  `pricing.ts`. El cálculo automático ($300 + $50/propiedad + $25 Hacienda)
  genera las líneas por defecto, pero Marisol debe poder **editarlas,
  añadir, quitar, y agregar descuentos** antes de enviar.
- "Reembolso por radicación Hacienda" es su propia línea, no está mezclado
  en el precio base — coincide con el modelo de precios ya documentado
  (+$25 radicación, aparte de la tarifa base).
- El **tipo de planilla varía** ("Planilla de Donación" en este ejemplo, no
  "Caudal Relicto") — Marisol factura otros servicios además de Caudal
  Relicto con la misma herramienta. Para esta app, asumimos que el texto de
  la línea principal describe el servicio de Caudal Relicto, pero debe ser
  editable como texto libre.
- Descuento como **monto fijo**, no porcentaje.

## Totales

Subtotal → Total → Amount Due (aquí los tres son iguales, $175.00 — no hay
depósito parcial en este ejemplo, es cobro único al completar).

## Instrucciones de pago

Texto libre al final de la factura:

```
Puede enviar su pago mediante cheque a: 3819 Avenida Isla Verde apto. 14A, Carolina PR 00979
ATH Móvil: 787-553-3290 (mismo teléfono del negocio)
Venmo: [pendiente el @usuario — es la cuenta personal de Marisol, no del negocio]
```

**Implicación:** el plan original de pagos (Stripe Checkout + registro
manual) no mencionaba **ATH Móvil ni Venmo** explícitamente como métodos
visibles en la factura — hay que añadirlos como opciones de pago manual con
su propio label cada uno (`manual_ath_movil`, `manual_venmo`, ya cabe en el
enum `manual_other` del esquema original pero conviene su propio valor para
reportes). La factura debe *mostrarle al cliente* el número de ATH Móvil, el
@usuario de Venmo, y la dirección para cheque — no solo ofrecer un botón de
Stripe.

**Nota:** Venmo es la cuenta **personal** de Marisol, no la del negocio —
confirmar si eso es intencional (¿prefiere no exponer más su cuenta personal
en un documento de negocio?) antes de publicarlo en facturas generadas por la
app.

## Pendiente de confirmar con Marisol

- ¿Seguir el formato de número de factura `INV##########` o cambiar a
  `CR-2026-0001`?
- ¿Las facturas de Caudal Relicto siempre se dividen en depósito 50% / 50%
  final (como dice el plan), o a veces se cobra todo de una vez como en este
  ejemplo?
- ¿Debe la factura mostrar siempre las mismas instrucciones de pago (cheque +
  ATH Móvil), o eventualmente solo mostrar el método que aplique según cómo
  se generó (link de Stripe vs. factura para pago manual)?
