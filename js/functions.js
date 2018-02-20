/*globals html2canvas, console, jQuery, $, reemplazo_texto, formatear, validar, recopilar_formulario, alert*/

String.prototype.safeCharacters = function () {
    "use strict";
	return this.replace(/\á/g, "a")
				.replace(/\é/g, "e")
				.replace(/\í/g, "i")
				.replace(/\ó/g, "o")
				.replace(/\ú/g, "u");
};

function to_canvas_and_download(elemento_objetivo, ancho, nombre_archivo) {
	"use strict";
	var nombre = nombre_archivo !== undefined ? nombre_archivo + ".jpg" : new Date().getTime() + ".jpg";

	html2canvas(elemento_objetivo, {
		removeContainer: true,
		width: ancho
	}).then(function (canvas) {
		var a = document.createElement('a');
		document.body.appendChild(canvas);
		a.href = canvas.toDataURL("image/jpeg", 1).replace("image/jpeg", "image/octet-stream");
		a.download = nombre;
		a.click();
	});
}

function ejecucion(array_objetos_reemplazos, elemento_plantilla) {
	"use strict";
	var plantilla = elemento_plantilla instanceof jQuery ? elemento_plantilla : $(elemento_plantilla);
	plantilla.show();
	
	setTimeout(function () {
		array_objetos_reemplazos.forEach(function (value) {
			var objetivo = plantilla.clone(),
				texto = objetivo.html(),
				salida = reemplazo_texto(texto, value),
				inner_html,
				div;

			div = document.createElement("div");
			inner_html = objetivo[0].outerHTML.split(">")[0] + ">" + salida + objetivo[0].outerHTML.split(" ")[0].replace("<", "</") + ">";

			div.innerHTML = inner_html;
			document.body.appendChild(div);

			if (value.hasOwnProperty("nombre")) {
				if (value.nombre.indexOf("{{") >= 0 && value.nombre.indexOf("}}") >= 0) {
					value.nombre = reemplazo_texto(value.nombre, value);
					to_canvas_and_download(div, plantilla.width(), value.nombre.toLowerCase().replace(/\ /g, "-").safeCharacters());
				} else {
					to_canvas_and_download(div, plantilla.width(), value.nombre.toLowerCase());
				}
			} else {
				to_canvas_and_download(div, plantilla.width());
			}
		});
	}, 500);
}

function procesar_opciones(obj) {
	"use strict";
	
	if (obj.hasOwnProperty("texto_franja")) {
		if (obj.texto_franja !== "") {
			$("p.franja").addClass("franja-smaller").html(obj.texto_franja);
		}
	}
	
	obj.fecha_inicio = new Date(obj.fecha_inicio.replace(/\-/g, "/"));
	obj.fecha_fin = new Date(obj.fecha_fin.replace(/\-/g, "/"));
	
	obj.fecha_inicio = (obj.fecha_inicio.getDate() < 10 ? "0" : "") + obj.fecha_inicio.getDate() + "/" + (obj.fecha_inicio.getMonth() < 9 ? "0" : "") + (obj.fecha_inicio.getMonth() + 1) + "/" + obj.fecha_inicio.getFullYear();
	obj.fecha_fin = (obj.fecha_fin.getDate() < 10 ? "0" : "") + obj.fecha_fin.getDate() + "/" + (obj.fecha_fin.getMonth() < 9 ? "0" : "") + (obj.fecha_fin.getMonth() + 1) + "/" + obj.fecha_fin.getFullYear();
	
	//aviso miercoles
	ejecucion([{
		titulo: obj.titulo,
		nombre: "Academia Toyota {{tipo}} Avance Miercoles {{titulo}}",
		tipo: "ventas"
	}], document.getElementById("plantilla-aviso-miercoles"));

	//aviso reporte final
	ejecucion([{
		titulo: obj.titulo,
		nombre: "Academia Toyota {{tipo}} Avance Reporte final {{titulo}}",
		tipo: obj.tipo
	}], document.getElementById("plantilla-aviso-reporte-final"));

	//aviso viernes
	ejecucion([{
		titulo: obj.titulo,
		nombre: "Academia Toyota {{tipo}} Avance Viernes {{titulo}}",
		tipo: obj.tipo
	}], document.getElementById("plantilla-aviso-viernes"));

	//aviso 2 dias
	ejecucion([{
		titulo: obj.titulo,
		nombre: "Academia Toyota {{tipo}} Curso {{titulo}} Aviso 2 dias",
		tipo: obj.tipo,
		fecha_inicio: obj.fecha_inicio,
		fecha_fin: obj.fecha_fin
	}], document.getElementById("plantilla-aviso-2-dias"));

	//aviso ultimo dia
	ejecucion([{
		titulo: obj.titulo,
		nombre: "Academia Toyota {{tipo}} Curso {{titulo}} Aviso Ultimo dia",
		tipo: obj.tipo,
		fecha_inicio: obj.fecha_inicio,
		fecha_fin: obj.fecha_fin
	}], document.getElementById("plantilla-aviso-ultimo-dia"));

	ejecucion([{
		titulo: obj.titulo,
		nombre: "Academia Toyota {{tipo}} Nuevo Curso {{titulo}}",
		tipo: obj.tipo,
		fecha_inicio: obj.fecha_inicio,
		fecha_fin: obj.fecha_fin
	}], document.getElementById("plantilla-aviso-nuevo-curso"));
}

//ejecucion(data, document.getElementById("plantilla"))
//ejecucion(data2, document.getElementById("plantilla3"))

/*
//aviso miercoles
ejecucion([{
	titulo: "Curso Guía para el Catalogo de Repuestos (Parte 1)",
	nombre: "Academia Toyota {{tipo}} Avance Miercoles {{titulo}}",
	tipo: "ventas",
}], document.getElementById("plantilla-aviso-miercoles"));

//aviso reporte final
ejecucion([{
	titulo: "Curso Guía para el Catalogo de Repuestos (Parte 1)",
	nombre: "Academia Toyota {{tipo}} Avance Reporte final {{titulo}}",
	tipo: "ventas",
}], document.getElementById("plantilla-aviso-reporte-final"));

//aviso viernes
ejecucion([{
	titulo: "Curso Guía para el Catalogo de Repuestos (Parte 1)",
	nombre: "Academia Toyota {{tipo}} Avance Viernes {{titulo}}",
	tipo: "ventas",
}], document.getElementById("plantilla-aviso-viernes"));

//aviso 2 dias
ejecucion([{
	titulo: "Curso Guía para el Catalogo de Repuestos (Parte 1)",
	nombre: "Academia Toyota {{tipo}} Curso {{titulo}} Aviso 2 dias",
	tipo: "ventas",
	fecha_inicio: "02/03/2018",
	fecha_fin: "07/03/2018"
}], document.getElementById("plantilla-aviso-2-dias"));

//aviso ultimo dia
ejecucion([{
	titulo: "Curso Guía para el Catalogo de Repuestos (Parte 1)",
	nombre: "Academia Toyota {{tipo}} Curso {{titulo}} Aviso Ultimo dia",
	tipo: "ventas",
	fecha_inicio: "02/03/2018",
	fecha_fin: "07/03/2018"
}], document.getElementById("plantilla-aviso-ultimo-dia"));

ejecucion([{
	titulo: "Curso Guía para el Catalogo de Repuestos (Parte 1)",
	nombre: "Academia Toyota {{tipo}} Curso {{titulo}} Aviso Ultimo dia",
	tipo: "ventas",
	fecha_inicio: "02/03/2018",
	fecha_fin: "07/03/2018"
}], document.getElementById("plantilla-aviso-nuevo-curso"));


*/



$("#btn-enviar-opciones").on("click", function () {
	"use strict";
	var obj = recopilar_formulario("#opciones");
	if (
		validar.tiene_valor(obj.titulo) &&
			validar.tiene_valor(obj.fecha_inicio) &&
			validar.tiene_valor(obj.fecha_fin) &&
			validar.tiene_valor(obj.tipo)
	) {
		procesar_opciones(obj);
	} else {
		alert("Ingrese todos los campos requeridos");
	}
});






















