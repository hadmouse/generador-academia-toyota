/*globals html2canvas, console, jQuery, $, reemplazo_texto, formatear, validar, recopilar_formulario, alert, JSZip*/

//area, nombre_curso, fecha_inicio, fecha_termino

var conteo_global = 0,
	max_conteo = 6,
	fecha = function () {
		"use strict";
		var d = new Date();
		return d.getFullYear() + "." + (d.getMonth() + 1 < 10 ? "0" : "") + (d.getMonth() + 1) + "." + (d.getDate() < 10 ? "0" : "") + d.getDate() + " ";
	},
	templates = {
		dos_dias: {
			detalles: {
				nombre: fecha() + "Academia Toyota {{area}} Curso {{nombre_curso}} Aviso 2 dias",
				remitente: "Academia Toyota Chile <academia@toyota.cl>",
				asunto: "Quedan 2 días para realizar el curso {{nombre_curso}}",
				responsable: "academia@toyota.cl"
			},
			eventos: {
				enlace4: "http://academiatoyota.com",
				mailweb: `<table border="0" cellpadding="0" cellspacing="10" width="100%">
							<tbody>
								<tr>
									<td align="center"><img height="467" src="images/01.jpg" style="border-width: 0px; border-style: solid;" usemap="#Map" width="700"></td>
								</tr>
							</tbody>
						</table>

						<p>&nbsp;</p>
						<map name="Map"><area coords="366,344,513,386" href="[evento:enlace4]" shape="rect"></map>`
			},
			texto: `Si no puede ver correctamente este mensaje, por favor haga click aqui:[evento:mailweb]\n\nQuedan solo 2 dias para completar el curso: {{nombre_curso}}\n\nDisponible entre el {{fecha_inicio}} y el {{fecha_termino}} hasta las 18:00hrs\n\n* En Academia Toyota, ir al espacio de busqueda y escribir escribir CHILE  luego Academia Toyota Chile y a continuacion {{nombre_curso}}.\n\n				[evento:enlace4]`,
			html: `<table border="0" cellpadding="0" cellspacing="10" width="100%">
					<tbody>
						<tr>
							<td align="center" class="enlace" style="FONT-FAMILY: Arial, Helvetica, sans-serif; COLOR: #666666; FONT-SIZE: 11px">Si no puede ver correctamente este mensaje, por favor haga <a href="[evento:mailweb]" target="_cp">click aqu&iacute;</a></td>
						</tr>
						<tr>
							<td align="center"><img height="467" src="images/01.jpg" style="border-width: 0px; border-style: solid;" usemap="#Map" width="700"></td>
						</tr>
					</tbody>
				</table>

				<p>&nbsp;</p>
				<map name="Map"><area coords="366,344,513,386" href="[evento:enlace4]" shape="rect"></map>`,
		},
		final: {
			detalles: {
				nombre: fecha() + "Academia Toyota {{area}} Avance Reporte final {{nombre_curso}}",
				remitente: "Academia Toyota Chile <academia@toyota.cl>",
				asunto: "Reporte disponible en Academia Toyota",
				responsable: "academia@toyota.cl"
			},
			eventos: {
				enlace4: "http://www.intelimedia.cl/academia",
				mailweb: `<table border="0" cellpadding="0" cellspacing="10" width="100%">
						<tbody>
							<tr>
								<td align="center"><img height="467" src="images/01.jpg" style="border-width: 0px; border-style: solid;" usemap="#Map" width="700"></td>
							</tr>
						</tbody>
					</table>

					<p>&nbsp;</p>
					<map name="Map"><area coords="367,343,514,385" href="[evento:enlace4]" shape="rect"></map>`
			},
			texto: `Si no puede ver correctamente este mensaje, por favor haga click aqui: [evento:mailweb]\n\nUna nueva oportunidad de crecer en tu trabajo.\n\nYa esta disponible Reporte Parcial de la Academia Toyota.\nIngresa y actualiza tus conocimientos para hacer un mejor trabajo\n\n[evento:enlace4]\n\nSi desea ser removido de nuestros correos en el futuro, por favor haga click aqui:[evento:nomasmail]`,
			html: `<table border="0" cellpadding="0" cellspacing="10" width="100%">
					<tbody>
						<tr>
							<td align="center" class="enlace" style="FONT-FAMILY: Arial, Helvetica, sans-serif; COLOR: #666666; FONT-SIZE: 11px">Si no puede ver correctamente este mensaje, por favor haga <a href="[evento:mailweb]" target="_cp">click aqu&iacute;</a></td>
						</tr>
						<tr>
							<td align="center"><img height="467" src="images/01.jpg" style="border-width: 0px; border-style: solid;" usemap="#Map" width="700"></td>
						</tr>
					</tbody>
				</table>

				<p>&nbsp;</p>
				<map name="Map"><area coords="367,343,514,385" href="[evento:enlace4]" shape="rect"></map>`,
		},
		miercoles: {
			detalles: {
				nombre: fecha() + "Academia Toyota {{area}} Avance Miercoles {{nombre_curso}}",
				remitente: "Academia Toyota Chile <academia@toyota.cl>",
				asunto: "Reporte disponible en Academia Toyota",
				responsable: "academia@toyota.cl"
			},
			eventos: {
				enlace4: "http://www.intelimedia.cl/academia",
				mailweb: `<table border="0" cellpadding="0" cellspacing="10" width="100%">
					<tbody>
						<tr>
							<td align="center"><img height="467" src="images/01.jpg" style="border-width: 0px; border-style: solid;" usemap="#Map" width="700"></td>
						</tr>
					</tbody>
				</table>

				<p>&nbsp;</p>
				<map name="Map"><area coords="367,343,514,385" href="[evento:enlace4]" shape="rect"></map>`
			},
			texto: `Si no puede ver correctamente este mensaje, por favor haga click aqui:[evento:mailweb]\n\nUna nueva oportunidad de crecer en tu trabajo.\n\nYa esta disponible Reporte Parcial de la Academia Toyota.\nIngresa y actualiza tus conocimientos para hacer un mejor trabajo\n\n[evento:enlace4]\n\nSi desea ser removido de nuestros correos en el futuro, por favor haga click aqui:\n[evento:nomasmail]`,
			html: `<table border="0" cellpadding="0" cellspacing="10" width="100%">
						<tbody>
							<tr>
								<td align="center" class="enlace" style="FONT-FAMILY: Arial, Helvetica, sans-serif; COLOR: #666666; FONT-SIZE: 11px">Si no puede ver correctamente este mensaje, por favor haga <a href="[evento:mailweb]" target="_cp">click aqu&iacute;</a></td>
							</tr>
							<tr>
								<td align="center"><img height="467" src="images/01.jpg" style="border-width: 0px; border-style: solid;" usemap="#Map" width="700"></td>
							</tr>
						</tbody>
					</table>

					<p>&nbsp;</p>
					<map name="Map"><area coords="367,343,514,385" href="[evento:enlace4]" shape="rect"></map>`
		},
		nuevo_curso: {
			detalles: {
				nombre: fecha() + "Academia Toyota {{area}} Nuevo Curso {{nombre_curso}}",
				remitente: "Academia Toyota Chile <academia@toyota.cl>",
				asunto: "Nuevo Curso en Academia Toyota",
				responsable: "academia@toyota.cl"
			},
			eventos: {
				enlace2: "http://academiatoyota.com",
				mailweb: `<table border="0" cellpadding="0" cellspacing="10" width="100%">
						<tbody>
							<tr>
								<td align="center"><img alt="" height="467" src="images/01.jpg" style="border-width: 0px; border-style: solid;" usemap="#Map" width="700"></td>
							</tr>
						</tbody>
					</table>
					<map name="Map"><area coords="365,344,513,385" href="[evento:enlace2]" shape="rect"></map>`
			},
			texto: `Si no puede ver correctamente este mensaje, por favor haga click aqui: [evento:mailweb]\n\n\nNuevo Curso {{nombre_curso}}\n\nDisponible entre el {{fecha_inicio}} y el {{fecha_termino}} hasta las 18:00hrs\n\n* En Academia Toyota, ir al espacio de busqueda y escribir CHILE luego Academia Toyota Chile y a continuacion {{nombre_curso}}\n\n[evento:enlace2]`,
			html: `<table border="0" cellpadding="0" cellspacing="10" width="100%">
					<tbody>
						<tr>
							<td align="center" class="enlace" style="FONT-FAMILY: Arial, Helvetica, sans-serif; COLOR: #666666; FONT-SIZE: 11px">Si no puede ver correctamente este mensaje, por favor haga <a href="[evento:mailweb]" target="_cp">click aqu&iacute;</a></td>
						</tr>
						<tr>
							<td align="center"><img alt="" height="467" src="images/01.jpg" style="border-width: 0px; border-style: solid;" usemap="#Map" width="700"></td>
						</tr>
					</tbody>
				</table>
				<map name="Map"><area coords="365,344,513,385" href="[evento:enlace2]" shape="rect"></map>`,
		},
		ultimo_dia: {
			detalles: {
				nombre: fecha() + "Academia Toyota {{area}} Curso {{nombre_curso}} Aviso Ultimo dia",
				remitente: "Academia Toyota Chile <academia@toyota.cl>",
				asunto: "Mañana ultimo dia para realizar el curso {{nombre_curso}}",
				responsable: "academia@toyota.cl"
			},
			eventos: {
				enlace4: "http://academiatoyota.com",
				mailweb: `<table border="0" cellpadding="0" cellspacing="10" width="100%">
					<tbody>
						<tr>
							<td align="center"><img height="467" src="images/01.jpg" style="border-width: 0px; border-style: solid;" usemap="#Map" width="700"></td>
						</tr>
					</tbody>
				</table>

				<p>&nbsp;</p>
				<map name="Map"><area coords="366,344,513,386" href="[evento:enlace4]" shape="rect"></map>`
			},
			texto: `Si no puede ver correctamente este mensaje, por favor haga click aqui:[evento:mailweb]\n\nMañana ultimo día para completar el curso: {{nombre_curso}}\n\nDisponible entre el {{fecha_inicio}} y el {{fecha_termino}} hasta las 18:00hrs\n\n* En Academia Toyota, ir al espacio de búsqueda y escribir escribir CHILE  luego Academia Toyota Chile y a continuacion {{nombre_curso}}.\n\n[evento:enlace4]`,
			html: `<table border="0" cellpadding="0" cellspacing="10" width="100%">
						<tbody>
							<tr>
								<td align="center" class="enlace" style="FONT-FAMILY: Arial, Helvetica, sans-serif; COLOR: #666666; FONT-SIZE: 11px">Si no puede ver correctamente este mensaje, por favor haga <a href="[evento:mailweb]" target="_cp">click aqu&iacute;</a></td>
							</tr>
							<tr>
								<td align="center"><img height="467" src="images/01.jpg" style="border-width: 0px; border-style: solid;" usemap="#Map" width="700"></td>
							</tr>
						</tbody>
					</table>

					<p>&nbsp;</p>
					<map name="Map"><area coords="366,344,513,386" href="[evento:enlace4]" shape="rect"></map>`,
		},
		viernes: {
			detalles: {
				nombre: fecha() + "Academia Toyota {{area}} Avance Viernes {{nombre_curso}}",
				remitente: "Academia Toyota Chile <academia@toyota.cl>",
				asunto: "Reporte disponible en Academia Toyota",
				responsable: "academia@toyota.cl"
			},
			eventos: {
				enlace4: "http://www.intelimedia.cl/academia",
				mailweb: `<table border="0" cellpadding="0" cellspacing="10" width="100%">
					<tbody>
						<tr>
							<td align="center"><img height="467" src="images/01.jpg" style="border-width: 0px; border-style: solid;" usemap="#Map" width="700"></td>
						</tr>
					</tbody>
				</table>

				<p>&nbsp;</p>
				<map name="Map"><area coords="367,343,514,385" href="[evento:enlace4]" shape="rect"></map>`
			},
			texto: `Si no puede ver correctamente este mensaje, por favor haga click aqui: [evento:mailweb]\n\nUna nueva oportunidad de crecer en tu trabajo.\n\nYa esta disponible Reporte Parcial de la Academia Toyota.\n\nIngresa y actualiza tus conocimientos para hacer un mejor trabajo\n\n[evento:enlace4]\n\nSi desea ser removido de nuestros correos en el futuro, por favor haga click aqui:[evento:nomasmail]`,
			html: `<table border="0" cellpadding="0" cellspacing="10" width="100%">
					<tbody>
						<tr>
							<td align="center" class="enlace" style="FONT-FAMILY: Arial, Helvetica, sans-serif; COLOR: #666666; FONT-SIZE: 11px">Si no puede ver correctamente este mensaje, por favor haga <a href="[evento:mailweb]" target="_cp">click aqu&iacute;</a></td>
						</tr>
						<tr>
							<td align="center"><img height="467" src="images/01.jpg" style="border-width: 0px; border-style: solid;" usemap="#Map" width="700"></td>
						</tr>
					</tbody>
				</table>

				<p>&nbsp;</p>
				<map name="Map"><area coords="367,343,514,385" href="[evento:enlace4]" shape="rect"></map>`
		}
	},
	definir_plantilla = function (string) {
		"use strict";
		return string.replace("plantilla-aviso-", "").replace("reporte-", "").replace(/\-/g, "_");
	},
	object_a_parrafo = function (objeto) {
		"use strict";
		var o = Object.assign({}, objeto),
			t,
			v;

		Object.keys(o).forEach(function (value) {
			v = value.toUpperCase().substr(0, 1) + value.toLowerCase().substr(1, value.length - 1);
			o[v] = o[value];
			delete o[value];
		});
		
		t = JSON.stringify(o);
		t = t.substr(2, t.length - 4).replace(/\"\,\"/g, "\n\n").replace(/\"\:\"/g, ": ").replace(/\{\"/g, "").replace(/\:\ /g, ":\n");
		return t;
	},
	zip_file;

String.prototype.safeCharacters = function () {
    "use strict";
	return this.replace(/\á/g, "a")
				.replace(/\é/g, "e")
				.replace(/\í/g, "i")
				.replace(/\ó/g, "o")
				.replace(/\ú/g, "u")
				.replace(/\Á/g, "A")
				.replace(/\É/g, "E")
				.replace(/\Í/g, "I")
				.replace(/\Ó/g, "O")
				.replace(/\Ú/g, "U");
};

function to_canvas_and_download(elemento_objetivo, ancho, nombre_archivo, elemento_plantilla, data, callback, salida) {
	"use strict";
	var nombre = nombre_archivo !== undefined ? nombre_archivo + ".jpg" : new Date().getTime() + ".jpg",
		plantilla = templates[definir_plantilla(elemento_plantilla.getAttribute("id"))];
	
	html2canvas(elemento_objetivo, {
		removeContainer: true,
		width: ancho
	}).then(function (canvas) {
		var a = document.createElement('a'),
			url;
		document.body.appendChild(canvas);
		url = canvas.toDataURL("image/jpeg", 0.99).replace("image/jpeg", "image/octet-stream");
		
		if (salida === "zip") {
			toZip(url, nombre_archivo, data, plantilla);
		} else {
			if (conteo_global >= max_conteo - 1) {
				zip_file = imagesToZip(url, nombre, zip_file, true, "imagenes");
				console.log("descargar");
			} else {
				zip_file = imagesToZip(url, nombre, zip_file);
			}
			//a.href = url;
			//a.download = nombre;
			//a.click();
		}

		elemento_objetivo.parentNode.removeChild(elemento_objetivo);
		canvas.parentNode.removeChild(canvas);
		elemento_plantilla.style.display = "none";
		
		if (callback !== undefined) {
			callback(url);
		}
	});
}

function toZip(dataurl, nombre, data, plantilla) {
	"use strict";
	var zip = new JSZip(),
		d = data,
		contenido,
		key;
	
	d.area = data.tipo;
	d.nombre_curso = data.titulo;
	d.fecha_termino = data.fecha_fin;
	
	console.log(nombre, data, plantilla);
	
	//imagen
	contenido = dataurl.split("base64,")[1];
	zip.file("images/01.jpg", contenido, { base64: true });
	
	//detalles
	contenido = reemplazo_texto(object_a_parrafo(plantilla.detalles), d).safeCharacters();
	//console.log("Detalles: ", contenido);
	zip.file("detalles-manuales.txt", contenido, d);
	
	//eventos
	for (key in plantilla.eventos) {
		if (plantilla.eventos.hasOwnProperty(key)) {
			contenido = reemplazo_texto(plantilla.eventos[key], d).safeCharacters();
			//console.log(key + ": ", contenido);
			zip.file("evento_" + key + ".html", contenido);
		}
	}
	
	//texto
	contenido = reemplazo_texto(plantilla.texto, d).safeCharacters();
	//console.log("mail.txt: ", contenido);
	zip.file("mail.txt", contenido);
	
	//html
	contenido = reemplazo_texto(plantilla.html, d);
	//console.log("mail.html: ", contenido);
	zip.file("mail.html", contenido);
	
	zip.generateAsync({type: "base64"}).then(function (content) {
		var a = document.createElement("a");
		console.log(a);
		a.setAttribute("href", "data:application/zip;base64," + content);
		a.setAttribute("download", nombre + ".zip");

		document.body.appendChild(a);
		a.click();
	});
	return false;
}

function imagesToZip(dataurl, nombre, zip_file, descargar, nombre_descarga) {
	"use strict";
	var zip = typeof zip_file === "undefined" ? new JSZip() : zip_file;
	
	zip.file(nombre + ".jpg", dataurl.split("base64,")[1], { base64: true });
	
	if (descargar === true) {
		zip.generateAsync({type: "base64"}).then(function (content) {
			var a = document.createElement("a");
			a.setAttribute("href", "data:application/zip;base64," + content);
			a.setAttribute("download", (typeof nombre_descarga !== "undefined" ? nombre_descarga : nombre) + ".zip");
	
			document.body.appendChild(a);
			a.click();
		});
	} else {
		return zip;
	}
}

function ejecucion(array_objetos_reemplazos, elemento_plantilla, data, callback) {
	"use strict";
	var plantilla = elemento_plantilla instanceof jQuery ? elemento_plantilla : $(elemento_plantilla),
		output = array_objetos_reemplazos.hasOwnProperty("salida") ? array_objetos_reemplazos.salida : "img";
	
	plantilla.show();
	
	setTimeout(function () {
		array_objetos_reemplazos.forEach(function (value) {
			var objetivo = plantilla.clone(),
				texto = objetivo.html(),
				salida = reemplazo_texto(texto, value),
				inner_html,
				div;
			
			output = value.hasOwnProperty("salida") ? value.salida : "img";

			div = document.createElement("div");
			inner_html = objetivo[0].outerHTML.split(">")[0] + ">" + salida + objetivo[0].outerHTML.split(" ")[0].replace("<", "</") + ">";

			div.innerHTML = inner_html;
			document.body.appendChild(div);

			if (value.hasOwnProperty("nombre")) {
				if (value.nombre.indexOf("{{") >= 0 && value.nombre.indexOf("}}") >= 0) {
					value.nombre = reemplazo_texto(value.nombre, value);
					to_canvas_and_download(div, plantilla.width(), value.nombre.toLowerCase().replace(/\ /g, "-").safeCharacters(), elemento_plantilla, data, callback, output);
				} else {
					to_canvas_and_download(div, plantilla.width(), value.nombre.toLowerCase(), elemento_plantilla, data, callback, output);
				}
			} else {
				to_canvas_and_download(div, plantilla.width(), undefined, elemento_plantilla, data, callback, output);
			}
		});
	}, 1500);
}

function procesar_opciones(obj) {
	"use strict";
	var salida = obj.hasOwnProperty("salida") ? obj.salida : "img",
		contar = function () {
		conteo_global += 1;
		if (conteo_global >= max_conteo) {
			//alert("Listo");
			conteo_global = 0;
		}
	};
	
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
		tipo: "ventas",
		salida: salida
	}], document.getElementById("plantilla-aviso-miercoles"), obj, contar);

	//aviso reporte final
	ejecucion([{
		titulo: obj.titulo,
		nombre: "Academia Toyota {{tipo}} Avance Reporte final {{titulo}}",
		tipo: obj.tipo,
		salida: salida
	}], document.getElementById("plantilla-aviso-reporte-final"), obj, contar);

	//aviso viernes
	ejecucion([{
		titulo: obj.titulo,
		nombre: "Academia Toyota {{tipo}} Avance Viernes {{titulo}}",
		tipo: obj.tipo,
		salida: salida
	}], document.getElementById("plantilla-aviso-viernes"), obj, contar);

	//aviso 2 dias
	ejecucion([{
		titulo: obj.titulo,
		nombre: "Academia Toyota {{tipo}} Curso {{titulo}} Aviso 2 dias",
		tipo: obj.tipo,
		fecha_inicio: obj.fecha_inicio,
		fecha_fin: obj.fecha_fin,
		salida: salida
	}], document.getElementById("plantilla-aviso-dos-dias"), obj, contar);

	//aviso ultimo dia
	ejecucion([{
		titulo: obj.titulo,
		nombre: "Academia Toyota {{tipo}} Curso {{titulo}} Aviso Ultimo dia",
		tipo: obj.tipo,
		fecha_inicio: obj.fecha_inicio,
		fecha_fin: obj.fecha_fin,
		salida: salida
	}], document.getElementById("plantilla-aviso-ultimo-dia"), obj, contar);

	ejecucion([{
		titulo: obj.titulo,
		nombre: "Academia Toyota {{tipo}} Nuevo Curso {{titulo}}",
		tipo: obj.tipo,
		fecha_inicio: obj.fecha_inicio,
		fecha_fin: obj.fecha_fin,
		salida: salida
	}], document.getElementById("plantilla-aviso-nuevo-curso"), obj, contar);
	
}


$(".btn-enviar-opciones").on("click", function () {
	"use strict";
	var t = $(this),
		obj = recopilar_formulario("#opciones");
	if (
		validar.tiene_valor(obj.titulo) &&
			validar.tiene_valor(obj.fecha_inicio) &&
			validar.tiene_valor(obj.fecha_fin) &&
			validar.tiene_valor(obj.tipo)
	) {
		if (t.hasClass("btn-enviar-opciones-zip")) {
			obj.salida = "zip";
		}
		procesar_opciones(obj);
	} else {
		alert("Ingrese todos los campos requeridos");
	}
});






















