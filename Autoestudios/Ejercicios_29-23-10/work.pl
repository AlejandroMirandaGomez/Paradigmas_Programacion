/*
1. En `Prolog` el modelo try-catch se modela con el metapredicado `catch(Goal, Error, GoalSurrogate)` donde se intenta (try) con el `Goal`. Si no hay excepción equivale a haber hecho `call(Goal)`. Si la hay, entonces `E` tiene un compund de error y se hace `call(GoalSurrogate)`.

Ejemplo
```prolog 
?- catch(X is 1/0, E, X is 0).
X = 0,
E = error(evaluation_error(zero_divisor), context((/)/2, _)).
```
Hay también `throw` para levantar excepciones.
Ejemplo:
```prolog
?- throw(error(verdad_absoluta('feo el team'), context(playing, 'campeonato 2026'))).
ERROR: Unknown error term: verdad_absoluta('feo el team') (campeonato 2026)
ERROR: In:
ERROR:   [12] throw(error(verdad_absoluta('feo el team'),context(playing,'campeonato 2026')))
ERROR:   [11] toplevel_call(user:user: ...) at c:/program files/swipl/boot/toplevel.pl:1529
```
Añada manejo de errores al predicado `parse_eval` (o `parse_evaluate`, según el horario)
*/
parse_evaluate(Codes, VN) :-
	read_term_from_codes(Codes, Goal, [variable_names(VN)]), 
	catch(call(Goal), E, parse_evaluate_from_atom(Codes))
.
