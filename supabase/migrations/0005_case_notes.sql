-- Notas libres del caso, capturadas en /comenzar (el formulario publico de
-- inicio) o anadidas por Marisol despues. No habia un lugar correcto para
-- esto — la version anterior del formulario intentaba guardarlo en
-- 'administrators', que no tiene esa columna.
alter table cases add column notes text;
