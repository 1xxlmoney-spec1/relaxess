/**
 * Terms of Use Screen
 *
 * Displays the full Relaxess Terms of Use as a native mobile screen.
 * Multilingual user-facing Terms of Use for Relaxess. English is the legal base version.
 * Supports Dark Mode, Light Mode, safe area, and full vertical scroll.
 */

import React from "react";
import { ScrollView, View, Text, Pressable, Linking, Platform } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useAppContext } from "@/lib/app-context";
import { useRouter } from "expo-router";
import { useColors } from "@/hooks/use-colors";
import * as Haptics from "expo-haptics";

// ─── Typography helpers ───────────────────────────────────────────────────────

function H2({ children, colors }: { children: string; colors: ReturnType<typeof useColors> }) {
  return (
    <Text
      style={{
        fontSize: 17,
        fontWeight: "700",
        color: colors.foreground,
        marginTop: 20,
        marginBottom: 6,
        lineHeight: 24,
      }}
    >
      {children}
    </Text>
  );
}

function H3({ children, colors }: { children: string; colors: ReturnType<typeof useColors> }) {
  return (
    <Text
      style={{
        fontSize: 15,
        fontWeight: "600",
        color: colors.foreground,
        marginTop: 14,
        marginBottom: 4,
        lineHeight: 22,
      }}
    >
      {children}
    </Text>
  );
}

function Body({ children, colors }: { children: React.ReactNode; colors: ReturnType<typeof useColors> }) {
  return (
    <Text
      style={{
        fontSize: 14,
        color: colors.muted,
        lineHeight: 22,
        marginBottom: 8,
      }}
    >
      {children}
    </Text>
  );
}

function BulletItem({ children, colors }: { children: string; colors: ReturnType<typeof useColors> }) {
  return (
    <View style={{ flexDirection: "row", marginBottom: 4, paddingLeft: 8 }}>
      <Text style={{ fontSize: 14, color: colors.muted, lineHeight: 22, marginRight: 6 }}>•</Text>
      <Text style={{ fontSize: 14, color: colors.muted, lineHeight: 22, flex: 1 }}>{children}</Text>
    </View>
  );
}

function LinkText({ url, label, colors }: { url: string; label: string; colors: ReturnType<typeof useColors> }) {
  return (
    <Text
      onPress={() => Linking.openURL(url)}
      style={{ fontSize: 14, color: colors.primary, lineHeight: 22, textDecorationLine: "underline" }}
    >
      {label}
    </Text>
  );
}

function Divider({ colors }: { colors: ReturnType<typeof useColors> }) {
  return (
    <View
      style={{
        height: 1,
        backgroundColor: colors.border,
        marginVertical: 16,
        opacity: 0.5,
      }}
    />
  );
}

const ES_TERMS: TermsDocument = {
  "title": "Términos de Uso de Relaxess",
  "effective": "25 de junio de 2026",
  "updated": "25 de junio de 2026",
  "blocks": [
    {
      "type": "note",
      "segments": [
        {
          "text": "Aviso sobre la traducción:",
          "bold": true
        },
        {
          "text": " Estos Términos de Uso son una traducción de la versión original en inglés. La versión en inglés es el documento legal oficial y de referencia. En caso de cualquier diferencia, conflicto, discrepancia de interpretación o inexactitud derivada de la traducción, la versión en inglés prevalecerá en la medida permitida por la legislación aplicable."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "1. Aceptación de los Términos"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Al descargar, instalar, acceder o utilizar la aplicación móvil Relaxess (la “Aplicación”), usted acepta quedar sujeto a estos Términos de Uso (el “Acuerdo”). Si no está de acuerdo con estos términos, no descargue ni utilice la Aplicación."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Estos Términos de Uso se aplican a todos los usuarios de la Aplicación."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "2. Descripción del Servicio"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "2.1 Descripción general"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Relaxess es una aplicación de bienestar y relajación diseñada para proporcionar:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Conversaciones de apoyo impulsadas por inteligencia artificial"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Ejercicios de relajación y respiración"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Contenido de audio para relajación"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Herramientas para el sueño y la reducción del estrés"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Funciones de apoyo al bienestar general"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "2.2 No es un servicio médico"
        }
      ]
    },
    {
      "type": "end",
      "segments": [
        {
          "text": "Relaxess NO es un servicio médico, de salud mental, de terapia ni de emergencia.",
          "bold": true
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "La Aplicación:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "No proporciona diagnósticos médicos"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "No proporciona tratamiento médico o psicológico"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "No sustituye a médicos, terapeutas, psicólogos, psiquiatras ni a otros profesionales cualificados"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "No debe utilizarse para diagnosticar, tratar, curar o prevenir ninguna enfermedad o trastorno"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "No está diseñada para responder a emergencias médicas o de salud mental"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Si considera que puede estar experimentando una emergencia médica o de salud mental, comuníquese inmediatamente con los servicios de emergencia locales o con un profesional cualificado."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "2.3 Inteligencia artificial"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Algunas funciones de Relaxess utilizan tecnología de inteligencia artificial proporcionada por servicios de terceros, incluido OpenAI."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Usted reconoce y acepta que:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Las respuestas generadas por IA pueden contener errores, imprecisiones o información incompleta"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Las respuestas de IA no deben considerarse asesoramiento médico, psicológico, legal, financiero ni profesional"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Usted es responsable de evaluar cualquier información proporcionada por la Aplicación"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "No debe tomar decisiones importantes relacionadas con su salud, seguridad o bienestar basándose únicamente en respuestas generadas por IA"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "3. Elegibilidad y uso de la Aplicación"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "3.1 Edad mínima"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Debe tener al menos 13 años para utilizar Relaxess."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Si tiene entre 13 años y la edad legal de mayoría de edad en su jurisdicción, solo puede utilizar la Aplicación con el consentimiento y bajo la supervisión de su padre, madre o tutor legal."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "3.2 Cumplimiento de la ley"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Usted acepta utilizar la Aplicación únicamente para fines legales y de conformidad con todas las leyes y regulaciones aplicables."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "3.3 Uso personal"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Relaxess se proporciona únicamente para uso personal y no comercial, salvo que Relaxess autorice expresamente lo contrario por escrito."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "4. Licencia de uso"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "4.1 Licencia limitada"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Sujeto a su cumplimiento de estos Términos de Uso, Relaxess le concede una licencia limitada, personal, no exclusiva, intransferible, no sublicenciable y revocable para descargar, instalar y utilizar la Aplicación en un dispositivo que usted posea o controle, de acuerdo con estos Términos de Uso y con las reglas aplicables de Apple App Store o Google Play."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "4.2 Restricciones"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Usted no puede:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Copiar, modificar, distribuir, vender, alquilar o sublicenciar la Aplicación, salvo cuando la ley aplicable lo permita expresamente"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Realizar ingeniería inversa, descompilar o intentar extraer el código fuente de la Aplicación, salvo cuando la ley aplicable lo permita expresamente"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Utilizar la Aplicación para cualquier propósito ilegal, fraudulento o abusivo"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Intentar obtener acceso no autorizado a la Aplicación, sus sistemas o servicios relacionados"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Interferir con el funcionamiento normal o la seguridad de la Aplicación"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Utilizar sistemas automatizados, bots, scripts u otros métodos para abusar de la Aplicación o sobrecargar sus servicios"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Eliminar, alterar u ocultar avisos de derechos de autor, marcas comerciales u otros avisos de propiedad"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "5. Suscripciones Premium y pagos"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "5.1 Planes Premium"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Relaxess puede ofrecer suscripciones Premium de renovación automática a través de Apple App Store y Google Play."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Los planes disponibles pueden incluir:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Plan mensual: $2.99 al mes"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Plan anual: $24.99 al año"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Los suscriptores Premium reciben:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Conversaciones ilimitadas con IA"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Acceso a todos los ejercicios de relajación"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Streaming de audio ilimitado"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "5.2 Facturación y renovación"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Las suscripciones se facturan a través de la cuenta de Apple App Store o Google Play asociada con su dispositivo."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Las suscripciones se renuevan automáticamente a menos que se cancelen"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "La cancelación debe realizarse a través de la configuración de suscripciones de la tienda de aplicaciones correspondiente"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Los precios y las condiciones de facturación que se muestran en Apple App Store o Google Play en el momento de la compra son los que se aplicarán a su transacción."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "5.3 Cancelación"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Puede cancelar su suscripción en cualquier momento a través de:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "iOS: Ajustes → [Su nombre] → Suscripciones → Relaxess → Cancelar suscripción"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Android: Google Play → Cuenta → Suscripciones → Relaxess → Cancelar"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "La cancelación generalmente entra en vigor al finalizar su período de facturación actual. La elegibilidad para un reembolso, si corresponde, se determina de acuerdo con las políticas aplicables de Apple App Store o Google Play y la legislación aplicable."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "5.4 Reembolsos"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Las solicitudes de reembolso de los cargos de suscripción se gestionan conforme a las políticas de la tienda de aplicaciones correspondiente:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "iOS: póngase en contacto con el Soporte de Apple a través de App Store"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Android: póngase en contacto con el Soporte de Google Play"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "La disponibilidad y el procesamiento de los reembolsos están sujetos a las políticas aplicables de Apple App Store o Google Play y a la legislación aplicable."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "6. Servicios de terceros"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "6.1 API de OpenAI"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Relaxess utiliza la API de OpenAI para proporcionar determinadas funciones de conversación mediante IA."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Cuando utiliza estas funciones:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Sus mensajes pueden enviarse a OpenAI para su procesamiento"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Las entradas de voz pueden convertirse en texto y procesarse mediante servicios de IA"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "El tratamiento de los datos por parte de OpenAI está sujeto a sus propios términos y políticas de privacidad"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Relaxess no controla las prácticas independientes de OpenAI y no es responsable de los actos u omisiones de OpenAI fuera del control razonable de Relaxess."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "6.2 Servicios de alojamiento y audio"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Relaxess puede utilizar servicios de infraestructura de terceros, incluido Amazon Web Services (AWS), para alojar y transmitir contenido de audio."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "El contenido de audio se transmite directamente desde servidores en la nube y requiere una conexión activa a Internet."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "6.3 Apple App Store y Google Play"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Si descarga la Aplicación o compra una suscripción a través de Apple App Store o Google Play:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "También está sujeto a los términos y políticas de la tienda correspondiente"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Apple o Google, según corresponda, procesa los pagos de la suscripción"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Las solicitudes de reembolso están sujetas a las políticas de la tienda correspondiente"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "La disponibilidad y el funcionamiento de la tienda están fuera del control de Relaxess"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "7. Uso aceptable"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Usted acepta no utilizar la Aplicación para:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Violar cualquier ley o regulación aplicable"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Infringir los derechos de cualquier persona o entidad"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Transmitir contenido ilegal, amenazante, abusivo, acosador o fraudulento"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Intentar obtener acceso no autorizado a sistemas, redes o datos"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Introducir virus, malware u otro código dañino"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Interferir o alterar la Aplicación, los servidores o las redes relacionadas"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Intentar eludir las restricciones, límites o medidas de seguridad de la Aplicación"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Utilizar la Aplicación de una manera que pueda dañar, deshabilitar, sobrecargar o perjudicar el servicio"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Utilizar las respuestas de IA para facilitar actividades ilegales o perjudiciales"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Podemos limitar, suspender o cancelar el acceso a la Aplicación cuando sea razonablemente necesario para proteger la Aplicación, nuestros usuarios, terceros o para cumplir con la ley."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "8. Propiedad intelectual"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "8.1 Propiedad de Relaxess"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "La Aplicación, incluyendo su diseño, software, código, gráficos, logotipos, textos, contenido de audio, elementos visuales y demás materiales proporcionados por Relaxess, está protegida por las leyes aplicables de propiedad intelectual."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Salvo que se indique lo contrario, Relaxess y sus licenciantes conservan todos los derechos, títulos e intereses sobre la Aplicación y su contenido."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "8.2 Marcas comerciales"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Relaxess, sus logotipos y otras marcas relacionadas pueden ser marcas comerciales o marcas de servicio de Relaxess."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "No puede utilizar dichas marcas sin autorización previa por escrito, salvo cuando dicho uso esté permitido por la legislación aplicable."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "8.3 Contenido de terceros"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Ciertos contenidos, tecnologías o servicios disponibles a través de la Aplicación pueden pertenecer a terceros y estar sujetos a licencias o términos independientes."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "9. Descargos de responsabilidad"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "9.1 Uso bajo su propia responsabilidad"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Su uso de la Aplicación es bajo su propia responsabilidad."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "En la máxima medida permitida por la legislación aplicable, la Aplicación se proporciona “tal cual” y “según disponibilidad”, sin garantías de ningún tipo, expresas o implícitas."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "9.2 Sin garantía de resultados"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Relaxess no garantiza que:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "La Aplicación satisfaga todas sus necesidades o expectativas"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Las respuestas generadas por IA sean siempre exactas, completas o apropiadas"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "El uso de la Aplicación produzca un resultado específico de relajación, bienestar o sueño"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "La Aplicación funcione sin interrupciones o errores"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Todos los defectos o errores sean corregidos"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "9.3 Disponibilidad del servicio"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Relaxess no garantiza que la Aplicación esté:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Disponible en todo momento"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Libre de virus o código dañino"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Segura o protegida contra todo acceso no autorizado"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "9.4 Dependencia de la información"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Cualquier confianza que deposite en información proporcionada por la Aplicación es bajo su propia responsabilidad."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Debe consultar a un profesional debidamente cualificado cuando necesite asesoramiento médico, psicológico, legal, financiero o de otro tipo profesional."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "9.5 Responsabilidad del usuario"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Usted es responsable de:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Su uso de la Aplicación"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Realizar copias de seguridad de sus datos personales cuando corresponda"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "10. Privacidad y protección de datos"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "10.1 Política de Privacidad"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Su uso de la Aplicación también se rige por nuestra Política de Privacidad, que se incorpora por referencia a estos Términos de Uso."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Puede consultar la Política de Privacidad en:"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "https://relaxess.app/privacy",
          "url": "https://relaxess.app/privacy"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "10.2 Recopilación y tratamiento de datos"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "La Aplicación recopila y procesa datos según se describe en la Política de Privacidad, incluyendo:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Mensajes de chat procesados mediante OpenAI"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Entradas de voz procesadas mediante OpenAI"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Preferencias locales almacenadas en su dispositivo"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Información del dispositivo utilizada para fines de funcionamiento y resolución de problemas"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "10.3 Derechos de privacidad"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Dependiendo de su lugar de residencia, puede tener determinados derechos respecto a sus datos personales conforme a las leyes de privacidad aplicables."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Consulte nuestra Política de Privacidad para obtener información detallada sobre esos derechos y sobre cómo ejercerlos."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "11. Terminación"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "11.1 Terminación por su parte"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Puede terminar este Acuerdo en cualquier momento mediante:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "La desinstalación de la Aplicación"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "La interrupción del uso de la Aplicación"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "La cancelación de su suscripción, si corresponde"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "11.2 Terminación o suspensión por nuestra parte"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Podemos terminar o suspender su acceso a la Aplicación si usted:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Viola estos Términos de Uso"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Participa en actividades ilegales"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Utiliza la Aplicación de manera abusiva o perjudicial"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Intenta comprometer la seguridad de la Aplicación"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Viola cualquier ley aplicable"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "La terminación o suspensión puede producirse sin previo aviso cuando sea razonablemente necesario debido a una infracción grave, por motivos de seguridad o para cumplir con la ley."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "11.3 Efectos de la terminación"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Tras la terminación:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Su licencia para utilizar la Aplicación queda revocada"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Debe dejar de utilizar la Aplicación"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Las disposiciones que por su naturaleza deban continuar vigentes después de la terminación permanecerán en vigor"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "12. Modificaciones de estos Términos"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Podemos modificar estos Términos de Uso ocasionalmente."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Cuando realicemos cambios, podremos actualizar la fecha de “Última actualización” y, cuando lo exija la legislación aplicable, proporcionar un aviso adicional."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Su uso continuado de la Aplicación después de que los cambios entren en vigor constituye su aceptación de los Términos de Uso actualizados, en la medida permitida por la legislación aplicable."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Si no acepta los Términos actualizados, debe dejar de utilizar la Aplicación."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "13. Modificaciones de la Aplicación"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Nos reservamos el derecho de modificar, actualizar, suspender o interrumpir cualquier parte de la Aplicación en cualquier momento, sujeto a la legislación aplicable."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Podemos:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Añadir o eliminar funciones"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Modificar funciones existentes"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Cambiar los límites de uso"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Actualizar el diseño o la funcionalidad"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Realizar tareas de mantenimiento"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Suspender temporalmente determinadas funciones o servicios"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "No garantizamos que ninguna función específica permanezca disponible permanentemente."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "14. Legislación aplicable y jurisdicción"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Estos Términos de Uso se regirán e interpretarán de conformidad con las leyes del Estado de Florida, Estados Unidos, sin tener en cuenta sus principios sobre conflicto de leyes."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Salvo respecto de las disputas sujetas a arbitraje vinculante conforme a la Sección 15, usted acepta someterse a la jurisdicción de los tribunales estatales y federales ubicados en Florida, Estados Unidos, para las disputas derivadas de estos Términos de Uso o de la Aplicación."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "15. Resolución de disputas"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "15.1 Resolución informal"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Antes de iniciar cualquier procedimiento legal, usted acepta intentar resolver la disputa de manera informal poniéndose en contacto con nosotros en:"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "support@relaxess.app",
          "url": "mailto:support@relaxess.app"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "15.2 Arbitraje"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Cualquier disputa que no pueda resolverse informalmente se resolverá mediante arbitraje vinculante en lugar de ante un tribunal, salvo lo dispuesto en la Sección 15.3 y salvo que la legislación aplicable disponga lo contrario."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "15.3 Excepción para demandas de menor cuantía"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Sin perjuicio de la Sección 15.2, cualquiera de las partes podrá presentar una reclamación individual ante un tribunal de demandas de menor cuantía competente, cuando dicha reclamación reúna los requisitos correspondientes."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "15.4 Sin acciones colectivas"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "En la medida permitida por la legislación aplicable, las disputas deberán presentarse únicamente a título individual y no como demandante o miembro de una clase en una acción colectiva, consolidada o representativa."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Nada de lo dispuesto en esta sección limita derechos que no puedan ser renunciados conforme a la legislación aplicable."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "16. Limitación de responsabilidad"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "En la máxima medida permitida por la legislación aplicable, Relaxess y sus afiliados, directivos, empleados, agentes, licenciantes y proveedores de servicios no serán responsables de daños indirectos, incidentales, especiales, consecuentes, ejemplares o punitivos derivados de su uso o imposibilidad de uso de la Aplicación."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Esto incluye, cuando corresponda:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Pérdida de datos"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Pérdida de beneficios o ingresos"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Pérdida de oportunidades"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Interrupción del servicio"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Daños derivados de la confianza depositada en respuestas generadas por IA"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Nada de estos Términos excluye o limita una responsabilidad que no pueda excluirse o limitarse legalmente."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "17. Indemnización"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "En la medida permitida por la legislación aplicable, usted acepta indemnizar y mantener indemne a Relaxess y a sus afiliados, directivos, empleados y agentes frente a reclamaciones, responsabilidades, daños, pérdidas y gastos razonables derivados de:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Su uso indebido de la Aplicación"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Su incumplimiento de estos Términos de Uso"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Su violación de la legislación aplicable"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Su infracción de los derechos de terceros"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Esta obligación no se aplicará en la medida en que una reclamación sea causada por actos u omisiones de Relaxess por los que Relaxess sea legalmente responsable."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "18. Fuerza mayor"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Relaxess no será responsable de ningún retraso o incumplimiento causado por circunstancias que estén fuera de nuestro control razonable, incluyendo:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Desastres naturales"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Fallos de Internet o de telecomunicaciones"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Fallos de infraestructura en la nube o de servicios de terceros"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Actos de autoridades gubernamentales"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Guerra, terrorismo, disturbios civiles o conflictos laborales"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Otros acontecimientos que no puedan prevenirse o controlarse razonablemente"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "19. Uso internacional"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Relaxess puede estar disponible para usuarios de distintos países."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Usted es responsable de cumplir las leyes locales aplicables al uso que haga de la Aplicación."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "No garantizamos que la Aplicación o todo su contenido sean apropiados, legales o estén disponibles en todas las jurisdicciones."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "20. Controles de exportación y sanciones"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Usted acepta no utilizar, exportar ni reexportar la Aplicación en violación de las leyes y regulaciones aplicables de los Estados Unidos sobre controles de exportación y sanciones."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Usted declara que no tiene prohibido recibir o utilizar la Aplicación conforme a las leyes aplicables."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "21. Condiciones de Apple App Store"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Si descargó la Aplicación a través de Apple App Store, reconoce y acepta que:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Estos Términos se celebran entre usted y Relaxess, y no con Apple"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Relaxess, y no Apple, es responsable de la Aplicación y de su contenido"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Apple no tiene obligación de proporcionar servicios de mantenimiento o soporte para la Aplicación"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "En caso de que la Aplicación no cumpla con alguna garantía aplicable, puede notificar a Apple, y Apple podrá reembolsar el precio de compra de la Aplicación cuando así lo dispongan las normas aplicables"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Apple no es responsable de atender reclamaciones relacionadas con la Aplicación, salvo en la medida exigida por la legislación aplicable"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Apple y sus subsidiarias son terceros beneficiarios de estos Términos en la medida prevista por las condiciones aplicables de Apple"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Su uso de la Aplicación también está sujeto a las condiciones aplicables de Apple App Store."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "22. Condiciones de Google Play"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Si descargó la Aplicación a través de Google Play, su uso de la Aplicación también está sujeto a las condiciones y políticas aplicables de Google Play."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "En caso de conflicto entre estos Términos y cualquier condición obligatoria de Google Play, prevalecerán las condiciones obligatorias de Google Play en la medida requerida."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "23. Actualizaciones de la Aplicación"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Podemos proporcionar periódicamente actualizaciones, correcciones de errores, parches o nuevas versiones de la Aplicación."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Algunas actualizaciones pueden ser necesarias para continuar utilizando determinadas funciones o para mantener la seguridad y el funcionamiento adecuado de la Aplicación."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Usted es responsable de mantener una versión compatible y razonablemente actualizada del sistema operativo de su dispositivo."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "24. Comentarios y sugerencias"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Si nos proporciona ideas, sugerencias, comentarios u otra información sobre Relaxess, nos concede el derecho a utilizar dichos comentarios para mejorar, desarrollar y operar nuestros productos y servicios sin obligación de compensarle, en la medida permitida por la legislación aplicable."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "No está obligado a proporcionarnos comentarios o sugerencias."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "25. Enlaces y servicios de terceros"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "La Aplicación o nuestro sitio web pueden contener enlaces a sitios web, servicios o recursos de terceros."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "No controlamos ni somos responsables del contenido, disponibilidad, seguridad o prácticas de privacidad de servicios independientes de terceros."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "El uso que haga de servicios de terceros está sujeto a los términos y políticas de esos terceros."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "26. Comunicaciones electrónicas"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Al utilizar la Aplicación o comunicarse con nosotros electrónicamente, acepta recibir comunicaciones nuestras en formato electrónico cuando sean necesarias para proporcionar el servicio, cumplir obligaciones legales o informarle sobre cambios importantes."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Estas comunicaciones pueden incluir avisos dentro de la Aplicación, publicaciones en nuestro sitio web o mensajes de correo electrónico si nos ha proporcionado su dirección de correo electrónico."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "27. Información de contacto"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Si tiene preguntas, comentarios o consultas relacionadas con estos Términos de Uso, puede ponerse en contacto con nosotros:"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Correo electrónico:",
          "bold": true
        },
        {
          "text": " "
        },
        {
          "text": "support@relaxess.app",
          "url": "mailto:support@relaxess.app"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Sitio web:",
          "bold": true
        },
        {
          "text": " "
        },
        {
          "text": "https://relaxess.app",
          "url": "https://relaxess.app"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "28. Notificaciones"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Las notificaciones requeridas o permitidas conforme a estos Términos pueden proporcionarse mediante:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Publicación de un aviso dentro de la Aplicación"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Publicación de un aviso en nuestro sitio web"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Correo electrónico, si nos ha proporcionado una dirección de correo electrónico válida"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Las notificaciones surtirán efecto de conformidad con la legislación aplicable y con la naturaleza de la notificación correspondiente."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "29. Acuerdo completo"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Estos Términos de Uso, junto con la Política de Privacidad y cualesquiera otros términos expresamente incorporados por referencia, constituyen el acuerdo completo entre usted y Relaxess con respecto al uso de la Aplicación y sustituyen cualquier acuerdo o entendimiento anterior sobre dicha materia."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "30. Cesión, divisibilidad y renuncia"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Usted no puede transferir ni ceder sus derechos u obligaciones conforme a estos Términos sin nuestro consentimiento previo por escrito, salvo cuando la legislación aplicable disponga lo contrario."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Podemos transferir nuestros derechos y obligaciones en relación con una fusión, adquisición, reorganización, venta de activos u otra operación permitida por la ley."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Si alguna disposición de estos Términos se considera inválida o inaplicable, las disposiciones restantes continuarán en pleno vigor y efecto en la máxima medida permitida por la ley."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "El hecho de que Relaxess no exija el cumplimiento de alguna disposición de estos Términos no constituye una renuncia a nuestro derecho a exigir posteriormente su cumplimiento."
        }
      ]
    },
    {
      "type": "end",
      "segments": [
        {
          "text": "Fin de los Términos de Uso",
          "bold": true
        }
      ]
    }
  ]
};

const DE_TERMS: TermsDocument = {
  "title": "Nutzungsbedingungen von Relaxess",
  "effective": "25. Juni 2026",
  "updated": "25. Juni 2026",
  "blocks": [
    {
      "type": "note",
      "segments": [
        {
          "text": "Hinweis zur Übersetzung:",
          "bold": true
        },
        {
          "text": " Diese Nutzungsbedingungen sind eine Übersetzung der englischen Originalfassung. Die englische Fassung ist das offizielle und maßgebliche Rechtsdokument. Bei Abweichungen, Widersprüchen, unterschiedlichen Auslegungen oder übersetzungsbedingten Ungenauigkeiten hat die englische Fassung Vorrang, soweit dies nach geltendem Recht zulässig ist."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "1. Annahme der Nutzungsbedingungen"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Durch das Herunterladen, Installieren, Aufrufen oder Verwenden der mobilen Relaxess-Anwendung (die „Anwendung“) erklären Sie sich mit diesen Nutzungsbedingungen (die „Vereinbarung“) einverstanden. Wenn Sie diesen Bedingungen nicht zustimmen, dürfen Sie die Anwendung nicht herunterladen oder verwenden."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Diese Nutzungsbedingungen gelten für alle Nutzer der Anwendung."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "2. Beschreibung des Dienstes"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "2.1 Überblick"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Relaxess ist eine Wellness- und Entspannungsanwendung, die Folgendes bereitstellt:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Unterstützende, durch künstliche Intelligenz gestützte Gespräche"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Entspannungs- und Atemübungen"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Audioinhalte zur Entspannung"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Hilfsmittel für Schlaf und Stressabbau"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Funktionen zur Unterstützung des allgemeinen Wohlbefindens"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "2.2 Kein medizinischer Dienst"
        }
      ]
    },
    {
      "type": "end",
      "segments": [
        {
          "text": "Relaxess ist KEIN medizinischer, psychotherapeutischer, therapeutischer oder Notfalldienst.",
          "bold": true
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Die Anwendung:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Stellt keine medizinischen Diagnosen"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Bietet keine medizinische oder psychologische Behandlung"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Ersetzt keine Ärzte, Therapeuten, Psychologen, Psychiater oder andere qualifizierte Fachkräfte"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Darf nicht zur Diagnose, Behandlung, Heilung oder Vorbeugung von Krankheiten oder Störungen verwendet werden"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Ist nicht für medizinische oder psychische Notfälle bestimmt"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Wenn Sie glauben, dass bei Ihnen ein medizinischer oder psychischer Notfall vorliegen könnte, wenden Sie sich unverzüglich an die örtlichen Notfalldienste oder an eine qualifizierte Fachkraft."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "2.3 Künstliche Intelligenz"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Einige Funktionen von Relaxess verwenden Technologien der künstlichen Intelligenz, die von Drittanbietern, einschließlich OpenAI, bereitgestellt werden."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Sie erkennen an und stimmen zu, dass:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "KI-generierte Antworten Fehler, Ungenauigkeiten oder unvollständige Informationen enthalten können"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "KI-Antworten nicht als medizinische, psychologische, rechtliche, finanzielle oder sonstige professionelle Beratung angesehen werden dürfen"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Sie selbst dafür verantwortlich sind, die von der Anwendung bereitgestellten Informationen zu beurteilen"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Sie wichtige Entscheidungen über Ihre Gesundheit, Sicherheit oder Ihr Wohlbefinden nicht ausschließlich auf Grundlage KI-generierter Antworten treffen sollten"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "3. Berechtigung und Nutzung der Anwendung"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "3.1 Mindestalter"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Sie müssen mindestens 13 Jahre alt sein, um Relaxess zu nutzen."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Wenn Sie zwischen 13 Jahren und dem gesetzlichen Volljährigkeitsalter in Ihrem Land oder Ihrer Rechtsordnung sind, dürfen Sie die Anwendung nur mit Zustimmung und unter Aufsicht eines Elternteils oder gesetzlichen Vertreters nutzen."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "3.2 Einhaltung geltender Gesetze"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Sie verpflichten sich, die Anwendung ausschließlich für rechtmäßige Zwecke und in Übereinstimmung mit allen anwendbaren Gesetzen und Vorschriften zu nutzen."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "3.3 Persönliche Nutzung"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Relaxess wird ausschließlich für die persönliche, nicht kommerzielle Nutzung bereitgestellt, sofern Relaxess nicht ausdrücklich schriftlich etwas anderes genehmigt."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "4. Nutzungslizenz"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "4.1 Beschränkte Lizenz"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Vorbehaltlich Ihrer Einhaltung dieser Nutzungsbedingungen gewährt Relaxess Ihnen eine beschränkte, persönliche, nicht ausschließliche, nicht übertragbare, nicht unterlizenzierbare und widerrufliche Lizenz zum Herunterladen, Installieren und Verwenden der Anwendung auf einem Gerät, das Ihnen gehört oder von Ihnen kontrolliert wird, gemäß diesen Nutzungsbedingungen und den jeweils geltenden Regeln des Apple App Store oder von Google Play."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "4.2 Einschränkungen"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Sie dürfen nicht:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Die Anwendung kopieren, verändern, verbreiten, verkaufen, vermieten oder unterlizenzieren, außer soweit dies nach geltendem Recht ausdrücklich zulässig ist"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Reverse Engineering durchführen, die Anwendung dekompilieren oder versuchen, ihren Quellcode zu extrahieren, außer soweit dies nach geltendem Recht ausdrücklich zulässig ist"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Die Anwendung für rechtswidrige, betrügerische oder missbräuchliche Zwecke verwenden"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Versuchen, sich unbefugten Zugang zur Anwendung, ihren Systemen oder damit verbundenen Diensten zu verschaffen"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Den normalen Betrieb oder die Sicherheit der Anwendung beeinträchtigen"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Automatisierte Systeme, Bots, Skripte oder andere Methoden verwenden, um die Anwendung zu missbrauchen oder ihre Dienste zu überlasten"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Urheberrechts-, Marken- oder sonstige Eigentumshinweise entfernen, verändern oder verbergen"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "5. Premium-Abonnements und Zahlungen"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "5.1 Premium-Abonnements"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Relaxess kann automatisch verlängerbare Premium-Abonnements über den Apple App Store und Google Play anbieten."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Zu den verfügbaren Abonnements können gehören:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Monatsabonnement: 2,99 US-Dollar pro Monat"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Jahresabonnement: 24,99 US-Dollar pro Jahr"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Premium-Abonnenten erhalten:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Unbegrenzte KI-Gespräche"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Zugriff auf alle Entspannungsübungen"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Unbegrenztes Audio-Streaming"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "5.2 Abrechnung und Verlängerung"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Abonnements werden über das mit Ihrem Gerät verbundene Apple-App-Store- oder Google-Play-Konto abgerechnet."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Abonnements verlängern sich automatisch, sofern sie nicht gekündigt werden"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Die Kündigung muss über die Abonnementeinstellungen des jeweiligen App-Stores vorgenommen werden"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Für Ihre Transaktion gelten die Preise und Abrechnungsbedingungen, die zum Zeitpunkt des Kaufs im Apple App Store oder bei Google Play angezeigt werden."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "5.3 Kündigung"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Sie können Ihr Abonnement jederzeit wie folgt kündigen:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "iOS: Einstellungen → [Ihr Name] → Abonnements → Relaxess → Abonnement kündigen"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Android: Google Play → Konto → Abonnements → Relaxess → Kündigen"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Die Kündigung wird in der Regel zum Ende Ihres aktuellen Abrechnungszeitraums wirksam. Ob ein Anspruch auf Rückerstattung besteht, richtet sich nach den jeweils geltenden Richtlinien des Apple App Store oder von Google Play sowie nach dem anwendbaren Recht."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "5.4 Rückerstattungen"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Anträge auf Rückerstattung von Abonnementgebühren werden gemäß den Richtlinien des jeweiligen App-Stores bearbeitet:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "iOS: Wenden Sie sich über den App Store an den Apple Support"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Android: Wenden Sie sich an den Google Play Support"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Die Verfügbarkeit und Bearbeitung von Rückerstattungen unterliegen den jeweils geltenden Richtlinien des Apple App Store oder von Google Play sowie dem anwendbaren Recht."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "6. Dienste von Drittanbietern"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "6.1 OpenAI API"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Relaxess verwendet die OpenAI API, um bestimmte KI-gestützte Gesprächsfunktionen bereitzustellen."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Wenn Sie diese Funktionen verwenden:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Können Ihre Nachrichten zur Verarbeitung an OpenAI übermittelt werden"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Können Spracheingaben in Text umgewandelt und durch KI-Dienste verarbeitet werden"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Unterliegt die Verarbeitung von Daten durch OpenAI den eigenen Bedingungen und Datenschutzrichtlinien von OpenAI"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Relaxess kontrolliert die unabhängigen Geschäftspraktiken von OpenAI nicht und ist nicht für Handlungen oder Unterlassungen von OpenAI verantwortlich, die außerhalb der angemessenen Kontrolle von Relaxess liegen."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "6.2 Hosting- und Audiodienste"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Relaxess kann Infrastrukturdienste von Drittanbietern, einschließlich Amazon Web Services (AWS), zum Hosten und Streamen von Audioinhalten verwenden."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Audioinhalte werden direkt von Cloud-Servern gestreamt und erfordern eine aktive Internetverbindung."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "6.3 Apple App Store und Google Play"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Wenn Sie die Anwendung über den Apple App Store oder Google Play herunterladen oder dort ein Abonnement erwerben:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Unterliegen Sie zusätzlich den Bedingungen und Richtlinien des jeweiligen App-Stores"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Werden Abonnementzahlungen je nach Fall von Apple oder Google verarbeitet"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Unterliegen Rückerstattungsanträge den Richtlinien des jeweiligen App-Stores"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Liegen Verfügbarkeit und Betrieb des App-Stores außerhalb der Kontrolle von Relaxess"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "7. Zulässige Nutzung"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Sie verpflichten sich, die Anwendung nicht zu folgenden Zwecken zu verwenden:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Verletzung geltender Gesetze oder Vorschriften"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Verletzung der Rechte einer Person oder Organisation"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Übermittlung rechtswidriger, bedrohlicher, missbräuchlicher, belästigender oder betrügerischer Inhalte"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Versuch, unbefugten Zugriff auf Systeme, Netzwerke oder Daten zu erlangen"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Einschleusen von Viren, Schadsoftware oder anderem schädlichen Code"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Beeinträchtigung oder Störung der Anwendung, ihrer Server oder verbundener Netzwerke"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Versuch, Beschränkungen, Limits oder Sicherheitsmaßnahmen der Anwendung zu umgehen"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Nutzung der Anwendung in einer Weise, die den Dienst beschädigen, deaktivieren, überlasten oder beeinträchtigen könnte"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Nutzung von KI-Antworten zur Unterstützung rechtswidriger oder schädlicher Aktivitäten"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Wir können den Zugriff auf die Anwendung beschränken, aussetzen oder beenden, wenn dies vernünftigerweise erforderlich ist, um die Anwendung, unsere Nutzer oder Dritte zu schützen oder gesetzliche Verpflichtungen zu erfüllen."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "8. Geistiges Eigentum"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "8.1 Eigentum von Relaxess"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Die Anwendung einschließlich ihres Designs, ihrer Software, ihres Codes, ihrer Grafiken, Logos, Texte, Audioinhalte, visuellen Elemente und sonstigen von Relaxess bereitgestellten Materialien ist durch die geltenden Gesetze zum Schutz geistigen Eigentums geschützt."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Sofern nicht anders angegeben, behalten Relaxess und seine Lizenzgeber sämtliche Rechte, Eigentumsrechte und Ansprüche an der Anwendung und ihren Inhalten."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "8.2 Marken"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Relaxess, seine Logos und andere damit verbundene Kennzeichen können Marken oder Dienstleistungsmarken von Relaxess sein."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Sie dürfen diese Kennzeichen ohne vorherige schriftliche Genehmigung nicht verwenden, soweit eine solche Nutzung nicht nach geltendem Recht zulässig ist."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "8.3 Inhalte Dritter"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Bestimmte Inhalte, Technologien oder Dienste, die über die Anwendung verfügbar sind, können Dritten gehören und unabhängigen Lizenzen oder Bedingungen unterliegen."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "9. Haftungsausschlüsse"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "9.1 Nutzung auf eigenes Risiko"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Die Nutzung der Anwendung erfolgt auf Ihr eigenes Risiko."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Soweit nach geltendem Recht zulässig, wird die Anwendung „wie besehen“ und „wie verfügbar“ ohne ausdrückliche oder stillschweigende Gewährleistungen jeglicher Art bereitgestellt."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "9.2 Keine Ergebnisgarantie"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Relaxess garantiert nicht, dass:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Die Anwendung alle Ihre Bedürfnisse oder Erwartungen erfüllt"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "KI-generierte Antworten stets richtig, vollständig oder angemessen sind"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Die Nutzung der Anwendung zu einem bestimmten Ergebnis hinsichtlich Entspannung, Wohlbefinden oder Schlaf führt"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Die Anwendung ohne Unterbrechungen oder Fehler funktioniert"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Alle Mängel oder Fehler behoben werden"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "9.3 Verfügbarkeit des Dienstes"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Relaxess garantiert nicht, dass die Anwendung:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Jederzeit verfügbar ist"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Frei von Viren oder schädlichem Code ist"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Sicher oder vor jedem unbefugten Zugriff geschützt ist"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "9.4 Vertrauen auf Informationen"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Jegliches Vertrauen auf Informationen, die von der Anwendung bereitgestellt werden, erfolgt auf Ihr eigenes Risiko."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Wenn Sie medizinische, psychologische, rechtliche, finanzielle oder sonstige professionelle Beratung benötigen, sollten Sie eine entsprechend qualifizierte Fachkraft konsultieren."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "9.5 Verantwortung des Nutzers"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Sie sind verantwortlich für:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Ihre Nutzung der Anwendung"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Die Sicherung Ihrer persönlichen Daten, soweit dies erforderlich ist"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "10. Datenschutz und Schutz personenbezogener Daten"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "10.1 Datenschutzrichtlinie"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Ihre Nutzung der Anwendung unterliegt außerdem unserer Datenschutzrichtlinie, die durch Verweis Bestandteil dieser Nutzungsbedingungen ist."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Die Datenschutzrichtlinie finden Sie unter:"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "https://relaxess.app/privacy",
          "url": "https://relaxess.app/privacy"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "10.2 Erhebung und Verarbeitung von Daten"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Die Anwendung erhebt und verarbeitet Daten wie in der Datenschutzrichtlinie beschrieben, einschließlich:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Chat-Nachrichten, die über OpenAI verarbeitet werden"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Spracheingaben, die über OpenAI verarbeitet werden"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Lokale Einstellungen, die auf Ihrem Gerät gespeichert werden"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Geräteinformationen, die für den Betrieb und die Fehlerbehebung verwendet werden"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "10.3 Datenschutzrechte"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Abhängig von Ihrem Wohnort können Ihnen nach den geltenden Datenschutzgesetzen bestimmte Rechte in Bezug auf Ihre personenbezogenen Daten zustehen."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Weitere Informationen über diese Rechte und deren Ausübung finden Sie in unserer Datenschutzrichtlinie."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "11. Beendigung"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "11.1 Beendigung durch Sie"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Sie können diese Vereinbarung jederzeit beenden, indem Sie:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Die Anwendung deinstallieren"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Die Nutzung der Anwendung einstellen"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Ihr Abonnement kündigen, sofern zutreffend"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "11.2 Beendigung oder Aussetzung durch uns"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Wir können Ihren Zugang zur Anwendung beenden oder aussetzen, wenn Sie:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Gegen diese Nutzungsbedingungen verstoßen"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Rechtswidrige Aktivitäten durchführen"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Die Anwendung missbräuchlich oder schädlich verwenden"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Versuchen, die Sicherheit der Anwendung zu beeinträchtigen"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Gegen geltendes Recht verstoßen"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Eine Beendigung oder Aussetzung kann ohne vorherige Ankündigung erfolgen, wenn dies aufgrund eines schwerwiegenden Verstoßes, aus Sicherheitsgründen oder zur Erfüllung gesetzlicher Verpflichtungen vernünftigerweise erforderlich ist."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "11.3 Folgen der Beendigung"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Nach der Beendigung:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Wird Ihre Lizenz zur Nutzung der Anwendung widerrufen"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Müssen Sie die Nutzung der Anwendung einstellen"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Bleiben Bestimmungen, die ihrer Natur nach über die Beendigung hinaus gelten sollen, weiterhin in Kraft"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "12. Änderungen dieser Nutzungsbedingungen"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Wir können diese Nutzungsbedingungen von Zeit zu Zeit ändern."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Wenn wir Änderungen vornehmen, können wir das Datum „Zuletzt aktualisiert“ aktualisieren und, soweit nach geltendem Recht erforderlich, eine zusätzliche Mitteilung bereitstellen."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Ihre fortgesetzte Nutzung der Anwendung nach Inkrafttreten der Änderungen gilt im gesetzlich zulässigen Umfang als Zustimmung zu den aktualisierten Nutzungsbedingungen."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Wenn Sie den aktualisierten Bedingungen nicht zustimmen, müssen Sie die Nutzung der Anwendung einstellen."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "13. Änderungen der Anwendung"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Wir behalten uns das Recht vor, Teile der Anwendung jederzeit zu ändern, zu aktualisieren, auszusetzen oder einzustellen, vorbehaltlich des geltenden Rechts."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Wir können:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Funktionen hinzufügen oder entfernen"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Bestehende Funktionen ändern"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Nutzungsbeschränkungen ändern"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Design oder Funktionalität aktualisieren"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Wartungsarbeiten durchführen"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Bestimmte Funktionen oder Dienste vorübergehend aussetzen"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Wir garantieren nicht, dass eine bestimmte Funktion dauerhaft verfügbar bleibt."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "14. Anwendbares Recht und Gerichtsstand"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Diese Nutzungsbedingungen unterliegen den Gesetzen des Bundesstaates Florida, Vereinigte Staaten, und sind nach diesen auszulegen, ohne Berücksichtigung der dortigen Grundsätze des Kollisionsrechts."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Mit Ausnahme von Streitigkeiten, die gemäß Abschnitt 15 einem verbindlichen Schiedsverfahren unterliegen, erklären Sie sich damit einverstanden, sich für Streitigkeiten aus diesen Nutzungsbedingungen oder der Anwendung der Gerichtsbarkeit der staatlichen und bundesstaatlichen Gerichte in Florida, Vereinigte Staaten, zu unterwerfen."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "15. Streitbeilegung"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "15.1 Informelle Beilegung"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Bevor Sie ein Gerichts- oder anderes rechtliches Verfahren einleiten, erklären Sie sich damit einverstanden, zunächst zu versuchen, die Streitigkeit informell zu lösen, indem Sie uns unter folgender Adresse kontaktieren:"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "support@relaxess.app",
          "url": "mailto:support@relaxess.app"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "15.2 Schiedsverfahren"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Jede Streitigkeit, die nicht informell beigelegt werden kann, wird durch ein verbindliches Schiedsverfahren anstelle eines Gerichtsverfahrens entschieden, soweit in Abschnitt 15.3 nichts anderes vorgesehen ist und soweit das geltende Recht nichts anderes bestimmt."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "15.3 Ausnahme für Bagatellverfahren"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Ungeachtet Abschnitt 15.2 kann jede Partei einen individuellen Anspruch vor einem zuständigen Gericht für geringfügige Forderungen geltend machen, sofern der Anspruch die entsprechenden Voraussetzungen erfüllt."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "15.4 Keine Sammelklagen"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Soweit nach geltendem Recht zulässig, dürfen Streitigkeiten ausschließlich auf individueller Basis und nicht als Kläger oder Mitglied einer Gruppe in einem Sammel-, konsolidierten oder repräsentativen Verfahren geltend gemacht werden."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Dieser Abschnitt beschränkt keine Rechte, auf die nach geltendem Recht nicht wirksam verzichtet werden kann."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "16. Haftungsbeschränkung"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Soweit nach geltendem Recht maximal zulässig, haften Relaxess und seine verbundenen Unternehmen, leitenden Angestellten, Mitarbeiter, Vertreter, Lizenzgeber und Dienstleister nicht für indirekte, beiläufig entstandene, besondere, Folge-, exemplarische oder strafähnliche Schäden, die aus Ihrer Nutzung oder der Unmöglichkeit der Nutzung der Anwendung entstehen."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Dies umfasst, soweit zutreffend:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Verlust von Daten"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Verlust von Gewinnen oder Einnahmen"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Verlust von Geschäftsmöglichkeiten"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Unterbrechung des Dienstes"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Schäden aufgrund des Vertrauens auf KI-generierte Antworten"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Nichts in diesen Nutzungsbedingungen schließt eine Haftung aus oder beschränkt sie, soweit ein solcher Ausschluss oder eine solche Beschränkung gesetzlich unzulässig ist."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "17. Freistellung"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Soweit nach geltendem Recht zulässig, erklären Sie sich damit einverstanden, Relaxess sowie seine verbundenen Unternehmen, leitenden Angestellten, Mitarbeiter und Vertreter von Ansprüchen, Haftungen, Schäden, Verlusten und angemessenen Kosten freizustellen, die sich ergeben aus:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Ihrer missbräuchlichen Nutzung der Anwendung"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Ihrem Verstoß gegen diese Nutzungsbedingungen"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Ihrem Verstoß gegen geltendes Recht"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Ihrer Verletzung von Rechten Dritter"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Diese Verpflichtung gilt nicht, soweit ein Anspruch durch Handlungen oder Unterlassungen von Relaxess verursacht wurde, für die Relaxess gesetzlich verantwortlich ist."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "18. Höhere Gewalt"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Relaxess haftet nicht für Verzögerungen oder Nichterfüllung, die durch Umstände verursacht werden, die außerhalb unserer angemessenen Kontrolle liegen, einschließlich:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Naturkatastrophen"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Internet- oder Telekommunikationsausfälle"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Ausfälle von Cloud-Infrastruktur oder Diensten Dritter"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Maßnahmen staatlicher Behörden"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Krieg, Terrorismus, Unruhen oder Arbeitskonflikte"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Andere Ereignisse, die vernünftigerweise nicht verhindert oder kontrolliert werden können"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "19. Internationale Nutzung"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Relaxess kann Nutzern in verschiedenen Ländern zur Verfügung stehen."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Sie sind dafür verantwortlich, die lokalen Gesetze einzuhalten, die für Ihre Nutzung der Anwendung gelten."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Wir garantieren nicht, dass die Anwendung oder sämtliche ihrer Inhalte in allen Rechtsordnungen geeignet, rechtmäßig oder verfügbar sind."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "20. Exportkontrollen und Sanktionen"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Sie verpflichten sich, die Anwendung nicht unter Verstoß gegen geltende US-amerikanische Exportkontroll- oder Sanktionsgesetze und -vorschriften zu nutzen, zu exportieren oder zu reexportieren."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Sie erklären, dass es Ihnen nach geltendem Recht nicht untersagt ist, die Anwendung zu erhalten oder zu nutzen."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "21. Bedingungen des Apple App Store"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Wenn Sie die Anwendung über den Apple App Store heruntergeladen haben, erkennen Sie an und stimmen zu, dass:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Diese Nutzungsbedingungen zwischen Ihnen und Relaxess und nicht mit Apple geschlossen werden"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Relaxess und nicht Apple für die Anwendung und deren Inhalte verantwortlich ist"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Apple nicht verpflichtet ist, Wartungs- oder Supportleistungen für die Anwendung bereitzustellen"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Sie Apple benachrichtigen können, wenn die Anwendung eine anwendbare Gewährleistung nicht erfüllt, und Apple den Kaufpreis der Anwendung erstatten kann, soweit dies nach den geltenden Bedingungen vorgesehen ist"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Apple nicht für die Bearbeitung von Ansprüchen im Zusammenhang mit der Anwendung verantwortlich ist, außer soweit dies nach geltendem Recht erforderlich ist"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Apple und seine Tochtergesellschaften Drittbegünstigte dieser Nutzungsbedingungen sind, soweit dies in den anwendbaren Bedingungen von Apple vorgesehen ist"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Ihre Nutzung der Anwendung unterliegt außerdem den jeweils geltenden Bedingungen des Apple App Store."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "22. Bedingungen von Google Play"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Wenn Sie die Anwendung über Google Play heruntergeladen haben, unterliegt Ihre Nutzung der Anwendung außerdem den jeweils geltenden Bedingungen und Richtlinien von Google Play."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Bei einem Widerspruch zwischen diesen Nutzungsbedingungen und zwingenden Bedingungen von Google Play gelten die zwingenden Bedingungen von Google Play im erforderlichen Umfang."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "23. Aktualisierungen der Anwendung"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Wir können von Zeit zu Zeit Aktualisierungen, Fehlerbehebungen, Patches oder neue Versionen der Anwendung bereitstellen."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Bestimmte Aktualisierungen können erforderlich sein, um bestimmte Funktionen weiterhin nutzen zu können oder die Sicherheit und ordnungsgemäße Funktion der Anwendung aufrechtzuerhalten."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Sie sind dafür verantwortlich, eine kompatible und angemessen aktuelle Version des Betriebssystems Ihres Geräts zu verwenden."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "24. Feedback"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Wenn Sie uns Ideen, Vorschläge, Kommentare oder sonstiges Feedback zu Relaxess übermitteln, gewähren Sie uns das Recht, dieses Feedback zur Verbesserung, Entwicklung und zum Betrieb unserer Produkte und Dienste ohne Verpflichtung zu einer Vergütung zu verwenden, soweit dies nach geltendem Recht zulässig ist."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Sie sind nicht verpflichtet, uns Feedback zu geben."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "25. Links und Dienste Dritter"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Die Anwendung oder unsere Website kann Links zu Websites, Diensten oder Ressourcen Dritter enthalten."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Wir kontrollieren unabhängige Dienste Dritter nicht und sind nicht für deren Inhalte, Verfügbarkeit, Sicherheit oder Datenschutzpraktiken verantwortlich."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Ihre Nutzung von Diensten Dritter unterliegt den Bedingungen und Richtlinien der jeweiligen Drittanbieter."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "26. Elektronische Kommunikation"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Durch die Nutzung der Anwendung oder die elektronische Kommunikation mit uns erklären Sie sich damit einverstanden, elektronische Mitteilungen von uns zu erhalten, soweit diese zur Bereitstellung des Dienstes, zur Erfüllung gesetzlicher Verpflichtungen oder zur Information über wesentliche Änderungen erforderlich sind."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Solche Mitteilungen können Hinweise innerhalb der Anwendung, Veröffentlichungen auf unserer Website oder E-Mails umfassen, sofern Sie uns Ihre E-Mail-Adresse mitgeteilt haben."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "27. Kontaktinformationen"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Wenn Sie Fragen, Kommentare oder Anliegen zu diesen Nutzungsbedingungen haben, können Sie uns wie folgt kontaktieren:"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "E-Mail:",
          "bold": true
        },
        {
          "text": " "
        },
        {
          "text": "support@relaxess.app",
          "url": "mailto:support@relaxess.app"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Website:",
          "bold": true
        },
        {
          "text": " "
        },
        {
          "text": "https://relaxess.app",
          "url": "https://relaxess.app"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "28. Mitteilungen"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Mitteilungen, die nach diesen Nutzungsbedingungen erforderlich oder zulässig sind, können auf folgende Weise bereitgestellt werden:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Veröffentlichung eines Hinweises innerhalb der Anwendung"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Veröffentlichung eines Hinweises auf unserer Website"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Per E-Mail, sofern Sie uns eine gültige E-Mail-Adresse mitgeteilt haben"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Mitteilungen werden entsprechend dem geltenden Recht und der Art der jeweiligen Mitteilung wirksam."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "29. Gesamte Vereinbarung"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Diese Nutzungsbedingungen bilden zusammen mit der Datenschutzrichtlinie und allen anderen ausdrücklich durch Verweis einbezogenen Bedingungen die gesamte Vereinbarung zwischen Ihnen und Relaxess hinsichtlich Ihrer Nutzung der Anwendung und ersetzen alle vorherigen Vereinbarungen oder Absprachen zu diesem Gegenstand."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "30. Abtretung, salvatorische Klausel und Verzicht"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Sie dürfen Ihre Rechte oder Pflichten aus diesen Nutzungsbedingungen ohne unsere vorherige schriftliche Zustimmung nicht übertragen oder abtreten, sofern das geltende Recht nichts anderes vorsieht."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Wir können unsere Rechte und Pflichten im Zusammenhang mit einer Fusion, Übernahme, Umstrukturierung, einem Verkauf von Vermögenswerten oder einer anderen gesetzlich zulässigen Transaktion übertragen."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Sollte eine Bestimmung dieser Nutzungsbedingungen für ungültig oder nicht durchsetzbar erklärt werden, bleiben die übrigen Bestimmungen im größtmöglichen gesetzlich zulässigen Umfang vollständig wirksam."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Die Nichtdurchsetzung einer Bestimmung dieser Nutzungsbedingungen durch Relaxess stellt keinen Verzicht auf das Recht dar, diese Bestimmung später durchzusetzen."
        }
      ]
    },
    {
      "type": "end",
      "segments": [
        {
          "text": "Ende der Nutzungsbedingungen",
          "bold": true
        }
      ]
    }
  ]
};

const FR_TERMS: TermsDocument = {
  "title": "Conditions d’utilisation de Relaxess",
  "effective": "25 juin 2026",
  "updated": "25 juin 2026",
  "blocks": [
    {
      "type": "note",
      "segments": [
        {
          "text": "Avis concernant la traduction :",
          "bold": true
        },
        {
          "text": " Les présentes Conditions d’utilisation sont une traduction de la version originale en anglais. La version anglaise constitue le document juridique officiel et faisant foi. En cas de différence, de conflit, de divergence d’interprétation ou d’inexactitude résultant de la traduction, la version anglaise prévaudra dans la mesure permise par la législation applicable."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "1. Acceptation des Conditions"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "En téléchargeant, installant, accédant à ou utilisant l’application mobile Relaxess (l’« Application »), vous acceptez d’être lié par les présentes Conditions d’utilisation (l’« Accord »). Si vous n’acceptez pas ces conditions, ne téléchargez pas et n’utilisez pas l’Application."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Les présentes Conditions d’utilisation s’appliquent à tous les utilisateurs de l’Application."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "2. Description du Service"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "2.1 Présentation générale"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Relaxess est une application de bien-être et de relaxation conçue pour fournir :"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Des conversations de soutien alimentées par l’intelligence artificielle"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Des exercices de relaxation et de respiration"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Du contenu audio destiné à la relaxation"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Des outils favorisant le sommeil et la réduction du stress"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Des fonctionnalités destinées à soutenir le bien-être général"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "2.2 Absence de service médical"
        }
      ]
    },
    {
      "type": "end",
      "segments": [
        {
          "text": "Relaxess N’EST PAS un service médical, de santé mentale, de thérapie ou d’urgence.",
          "bold": true
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "L’Application :"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Ne fournit aucun diagnostic médical"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Ne fournit aucun traitement médical ou psychologique"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Ne remplace pas les médecins, thérapeutes, psychologues, psychiatres ou autres professionnels qualifiés"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Ne doit pas être utilisée pour diagnostiquer, traiter, guérir ou prévenir une maladie ou un trouble"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "N’est pas conçue pour répondre aux urgences médicales ou de santé mentale"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Si vous pensez être confronté à une urgence médicale ou de santé mentale, contactez immédiatement les services d’urgence locaux ou un professionnel qualifié."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "2.3 Intelligence artificielle"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Certaines fonctionnalités de Relaxess utilisent une technologie d’intelligence artificielle fournie par des services tiers, notamment OpenAI."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Vous reconnaissez et acceptez que :"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Les réponses générées par l’IA peuvent contenir des erreurs, des inexactitudes ou des informations incomplètes"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Les réponses de l’IA ne doivent pas être considérées comme des conseils médicaux, psychologiques, juridiques, financiers ou autres conseils professionnels"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Vous êtes responsable de l’évaluation de toute information fournie par l’Application"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Vous ne devez pas prendre de décisions importantes concernant votre santé, votre sécurité ou votre bien-être en vous fondant uniquement sur des réponses générées par l’IA"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "3. Admissibilité et utilisation de l’Application"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "3.1 Âge minimum"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Vous devez être âgé d’au moins 13 ans pour utiliser Relaxess."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Si vous avez entre 13 ans et l’âge légal de la majorité dans votre juridiction, vous ne pouvez utiliser l’Application qu’avec le consentement et sous la supervision d’un parent ou d’un tuteur légal."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "3.2 Respect de la législation"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Vous acceptez d’utiliser l’Application uniquement à des fins légales et conformément à toutes les lois et réglementations applicables."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "3.3 Utilisation personnelle"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Relaxess est fourni uniquement pour un usage personnel et non commercial, sauf autorisation écrite expresse contraire de Relaxess."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "4. Licence d’utilisation"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "4.1 Licence limitée"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Sous réserve de votre respect des présentes Conditions d’utilisation, Relaxess vous accorde une licence limitée, personnelle, non exclusive, non transférable, non sous-licenciable et révocable vous permettant de télécharger, installer et utiliser l’Application sur un appareil que vous possédez ou contrôlez, conformément aux présentes Conditions d’utilisation et aux règles applicables de l’Apple App Store ou de Google Play."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "4.2 Restrictions"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Vous ne pouvez pas :"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Copier, modifier, distribuer, vendre, louer ou sous-licencier l’Application, sauf dans la mesure expressément autorisée par la législation applicable"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Procéder à l’ingénierie inverse, décompiler ou tenter d’extraire le code source de l’Application, sauf dans la mesure expressément autorisée par la législation applicable"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Utiliser l’Application à des fins illégales, frauduleuses ou abusives"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Tenter d’obtenir un accès non autorisé à l’Application, à ses systèmes ou aux services associés"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Perturber le fonctionnement normal ou la sécurité de l’Application"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Utiliser des systèmes automatisés, des robots, des scripts ou d’autres méthodes pour abuser de l’Application ou surcharger ses services"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Supprimer, modifier ou masquer les mentions de droits d’auteur, de marques commerciales ou autres mentions de propriété"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "5. Abonnements Premium et paiements"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "5.1 Abonnements Premium"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Relaxess peut proposer des abonnements Premium à renouvellement automatique par l’intermédiaire de l’Apple App Store et de Google Play."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Les abonnements disponibles peuvent inclure :"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Abonnement mensuel : 2,99 $ US par mois"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Abonnement annuel : 24,99 $ US par an"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Les abonnés Premium bénéficient de :"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Conversations illimitées avec l’IA"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Accès à tous les exercices de relaxation"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Streaming audio illimité"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "5.2 Facturation et renouvellement"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Les abonnements sont facturés par l’intermédiaire du compte Apple App Store ou Google Play associé à votre appareil."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Les abonnements sont renouvelés automatiquement sauf s’ils sont annulés"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "L’annulation doit être effectuée dans les paramètres d’abonnement de la boutique d’applications concernée"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Les prix et conditions de facturation affichés dans l’Apple App Store ou Google Play au moment de l’achat sont ceux qui s’appliquent à votre transaction."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "5.3 Annulation"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Vous pouvez annuler votre abonnement à tout moment par l’intermédiaire de :"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "iOS : Réglages → [Votre nom] → Abonnements → Relaxess → Annuler l’abonnement"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Android : Google Play → Compte → Abonnements → Relaxess → Annuler"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "L’annulation prend généralement effet à la fin de votre période de facturation en cours. L’éligibilité à un remboursement, le cas échéant, est déterminée conformément aux politiques applicables de l’Apple App Store ou de Google Play ainsi qu’à la législation applicable."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "5.4 Remboursements"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Les demandes de remboursement des frais d’abonnement sont traitées conformément aux politiques de la boutique d’applications concernée :"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "iOS : contactez l’assistance Apple par l’intermédiaire de l’App Store"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Android : contactez l’assistance Google Play"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "La disponibilité et le traitement des remboursements sont soumis aux politiques applicables de l’Apple App Store ou de Google Play ainsi qu’à la législation applicable."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "6. Services tiers"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "6.1 API OpenAI"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Relaxess utilise l’API OpenAI afin de fournir certaines fonctionnalités de conversation basées sur l’IA."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Lorsque vous utilisez ces fonctionnalités :"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Vos messages peuvent être transmis à OpenAI afin d’être traités"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Les entrées vocales peuvent être converties en texte et traitées par des services d’IA"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Le traitement des données par OpenAI est soumis à ses propres conditions et politiques de confidentialité"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Relaxess ne contrôle pas les pratiques indépendantes d’OpenAI et n’est pas responsable des actes ou omissions d’OpenAI qui échappent au contrôle raisonnable de Relaxess."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "6.2 Services d’hébergement et audio"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Relaxess peut utiliser des services d’infrastructure tiers, notamment Amazon Web Services (AWS), pour héberger et diffuser du contenu audio."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Le contenu audio est diffusé directement depuis des serveurs cloud et nécessite une connexion Internet active."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "6.3 Apple App Store et Google Play"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Si vous téléchargez l’Application ou achetez un abonnement par l’intermédiaire de l’Apple App Store ou de Google Play :"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Vous êtes également soumis aux conditions et politiques de la boutique concernée"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Apple ou Google, selon le cas, traite les paiements liés à l’abonnement"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Les demandes de remboursement sont soumises aux politiques de la boutique concernée"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "La disponibilité et le fonctionnement de la boutique échappent au contrôle de Relaxess"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "7. Utilisation acceptable"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Vous acceptez de ne pas utiliser l’Application pour :"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Violer une loi ou une réglementation applicable"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Porter atteinte aux droits d’une personne ou d’une organisation"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Transmettre du contenu illégal, menaçant, abusif, harcelant ou frauduleux"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Tenter d’obtenir un accès non autorisé à des systèmes, réseaux ou données"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Introduire des virus, logiciels malveillants ou autres codes nuisibles"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Interférer avec ou perturber l’Application, ses serveurs ou les réseaux associés"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Tenter de contourner les restrictions, limites ou mesures de sécurité de l’Application"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Utiliser l’Application d’une manière susceptible d’endommager, de désactiver, de surcharger ou de compromettre le service"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Utiliser les réponses de l’IA pour faciliter des activités illégales ou préjudiciables"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Nous pouvons limiter, suspendre ou mettre fin à l’accès à l’Application lorsque cela est raisonnablement nécessaire pour protéger l’Application, nos utilisateurs ou des tiers, ou pour respecter la législation."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "8. Propriété intellectuelle"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "8.1 Propriété de Relaxess"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "L’Application, notamment sa conception, ses logiciels, son code, ses éléments graphiques, ses logos, ses textes, son contenu audio, ses éléments visuels et les autres contenus fournis par Relaxess, est protégée par les lois applicables en matière de propriété intellectuelle."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Sauf indication contraire, Relaxess et ses concédants de licence conservent tous les droits, titres et intérêts relatifs à l’Application et à son contenu."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "8.2 Marques commerciales"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Relaxess, ses logos et les autres signes associés peuvent constituer des marques commerciales ou des marques de service de Relaxess."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Vous ne pouvez pas utiliser ces marques sans autorisation écrite préalable, sauf lorsque cette utilisation est autorisée par la législation applicable."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "8.3 Contenu de tiers"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Certains contenus, technologies ou services accessibles par l’intermédiaire de l’Application peuvent appartenir à des tiers et être soumis à des licences ou conditions distinctes."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "9. Exclusions de garantie"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "9.1 Utilisation à vos propres risques"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Vous utilisez l’Application à vos propres risques."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Dans toute la mesure permise par la législation applicable, l’Application est fournie « en l’état » et « selon disponibilité », sans garantie d’aucune sorte, expresse ou implicite."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "9.2 Absence de garantie de résultats"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Relaxess ne garantit pas que :"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "L’Application répondra à tous vos besoins ou attentes"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Les réponses générées par l’IA seront toujours exactes, complètes ou appropriées"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "L’utilisation de l’Application produira un résultat particulier en matière de relaxation, de bien-être ou de sommeil"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "L’Application fonctionnera sans interruption ni erreur"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Tous les défauts ou toutes les erreurs seront corrigés"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "9.3 Disponibilité du service"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Relaxess ne garantit pas que l’Application sera :"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Disponible à tout moment"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Exempte de virus ou de code nuisible"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Sécurisée ou protégée contre tout accès non autorisé"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "9.4 Utilisation des informations"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Toute confiance accordée aux informations fournies par l’Application relève de votre propre responsabilité."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Vous devez consulter un professionnel dûment qualifié lorsque vous avez besoin de conseils médicaux, psychologiques, juridiques, financiers ou de tout autre conseil professionnel."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "9.5 Responsabilité de l’utilisateur"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Vous êtes responsable de :"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Votre utilisation de l’Application"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "La sauvegarde de vos données personnelles lorsque cela est nécessaire"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "10. Confidentialité et protection des données"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "10.1 Politique de confidentialité"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Votre utilisation de l’Application est également régie par notre Politique de confidentialité, qui est intégrée par référence aux présentes Conditions d’utilisation."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Vous pouvez consulter la Politique de confidentialité à l’adresse suivante :"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "https://relaxess.app/privacy",
          "url": "https://relaxess.app/privacy"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "10.2 Collecte et traitement des données"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "L’Application collecte et traite les données comme décrit dans la Politique de confidentialité, notamment :"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Les messages de chat traités par OpenAI"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Les entrées vocales traitées par OpenAI"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Les préférences locales stockées sur votre appareil"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Les informations relatives à l’appareil utilisées pour le fonctionnement et le dépannage"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "10.3 Droits relatifs à la confidentialité"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Selon votre lieu de résidence, vous pouvez disposer de certains droits concernant vos données personnelles en vertu des lois applicables en matière de protection de la vie privée."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Veuillez consulter notre Politique de confidentialité pour obtenir des informations détaillées sur ces droits et sur la manière de les exercer."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "11. Résiliation"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "11.1 Résiliation par vous"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Vous pouvez mettre fin au présent Accord à tout moment en :"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Désinstallant l’Application"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Cessant d’utiliser l’Application"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Annulant votre abonnement, le cas échéant"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "11.2 Résiliation ou suspension par Relaxess"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Nous pouvons mettre fin à votre accès à l’Application ou le suspendre si vous :"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Enfreignez les présentes Conditions d’utilisation"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Participez à des activités illégales"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Utilisez l’Application de manière abusive ou préjudiciable"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Tentez de compromettre la sécurité de l’Application"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Enfreignez toute loi applicable"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "La résiliation ou la suspension peut intervenir sans préavis lorsqu’elle est raisonnablement nécessaire en raison d’une violation grave, pour des raisons de sécurité ou afin de respecter la législation."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "11.3 Effets de la résiliation"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "À la suite de la résiliation :"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Votre licence d’utilisation de l’Application est révoquée"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Vous devez cesser d’utiliser l’Application"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Les dispositions qui, par leur nature, sont destinées à survivre à la résiliation restent en vigueur"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "12. Modifications des présentes Conditions"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Nous pouvons modifier les présentes Conditions d’utilisation de temps à autre."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Lorsque nous apportons des modifications, nous pouvons mettre à jour la date de « Dernière mise à jour » et, lorsque la législation applicable l’exige, fournir un avis supplémentaire."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Votre utilisation continue de l’Application après l’entrée en vigueur des modifications constitue votre acceptation des Conditions d’utilisation mises à jour, dans la mesure permise par la législation applicable."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Si vous n’acceptez pas les Conditions mises à jour, vous devez cesser d’utiliser l’Application."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "13. Modifications de l’Application"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Nous nous réservons le droit de modifier, mettre à jour, suspendre ou interrompre toute partie de l’Application à tout moment, sous réserve de la législation applicable."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Nous pouvons :"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Ajouter ou supprimer des fonctionnalités"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Modifier des fonctionnalités existantes"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Modifier les limites d’utilisation"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Mettre à jour la conception ou les fonctionnalités"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Effectuer des opérations de maintenance"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Suspendre temporairement certaines fonctionnalités ou certains services"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Nous ne garantissons pas qu’une fonctionnalité particulière restera disponible de façon permanente."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "14. Droit applicable et juridiction"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Les présentes Conditions d’utilisation sont régies et interprétées conformément aux lois de l’État de Floride, États-Unis, sans égard à ses principes relatifs aux conflits de lois."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "À l’exception des litiges soumis à un arbitrage contraignant conformément à la Section 15, vous acceptez de vous soumettre à la juridiction des tribunaux d’État et fédéraux situés en Floride, États-Unis, pour les litiges découlant des présentes Conditions d’utilisation ou de l’Application."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "15. Résolution des litiges"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "15.1 Résolution informelle"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Avant d’engager toute procédure judiciaire ou autre procédure juridique, vous acceptez de tenter de résoudre le litige à l’amiable en nous contactant à l’adresse suivante :"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "support@relaxess.app",
          "url": "mailto:support@relaxess.app"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "15.2 Arbitrage"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Tout litige qui ne peut être résolu à l’amiable sera réglé par arbitrage contraignant plutôt que devant un tribunal, sauf dans les cas prévus à la Section 15.3 et sauf disposition contraire de la législation applicable."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "15.3 Exception pour les litiges de faible montant"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Nonobstant la Section 15.2, chaque partie peut présenter une demande individuelle devant un tribunal compétent pour les litiges de faible montant, lorsque cette demande remplit les conditions applicables."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "15.4 Absence d’actions collectives"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Dans la mesure permise par la législation applicable, les litiges doivent être présentés uniquement à titre individuel et non en qualité de demandeur ou de membre d’un groupe dans le cadre d’une action collective, consolidée ou représentative."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Aucune disposition de cette section ne limite les droits auxquels il ne peut être renoncé en vertu de la législation applicable."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "16. Limitation de responsabilité"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Dans toute la mesure permise par la législation applicable, Relaxess ainsi que ses sociétés affiliées, dirigeants, employés, agents, concédants de licence et prestataires de services ne pourront être tenus responsables des dommages indirects, accessoires, spéciaux, consécutifs, exemplaires ou punitifs résultant de votre utilisation ou de votre incapacité à utiliser l’Application."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Cela comprend, le cas échéant :"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "La perte de données"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "La perte de bénéfices ou de revenus"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "La perte d’opportunités"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "L’interruption du service"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Les dommages résultant de la confiance accordée aux réponses générées par l’IA"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Aucune disposition des présentes Conditions n’exclut ni ne limite une responsabilité qui ne peut légalement être exclue ou limitée."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "17. Indemnisation"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Dans la mesure permise par la législation applicable, vous acceptez d’indemniser et de dégager de toute responsabilité Relaxess ainsi que ses sociétés affiliées, dirigeants, employés et agents à l’égard des réclamations, responsabilités, dommages, pertes et dépenses raisonnables résultant de :"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Votre utilisation abusive de l’Application"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Votre violation des présentes Conditions d’utilisation"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Votre violation de la législation applicable"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Votre violation des droits de tiers"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Cette obligation ne s’applique pas dans la mesure où une réclamation résulte d’actes ou d’omissions de Relaxess pour lesquels Relaxess est légalement responsable."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "18. Force majeure"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Relaxess ne pourra être tenu responsable de tout retard ou manquement résultant de circonstances échappant raisonnablement à notre contrôle, notamment :"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Les catastrophes naturelles"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Les pannes d’Internet ou de télécommunications"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Les défaillances de l’infrastructure cloud ou de services tiers"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Les actes des autorités gouvernementales"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "La guerre, le terrorisme, les troubles civils ou les conflits du travail"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Tout autre événement qui ne peut raisonnablement être empêché ou contrôlé"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "19. Utilisation internationale"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Relaxess peut être accessible aux utilisateurs dans différents pays."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Vous êtes responsable du respect des lois locales applicables à votre utilisation de l’Application."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Nous ne garantissons pas que l’Application ou l’ensemble de son contenu soient appropriés, légaux ou disponibles dans toutes les juridictions."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "20. Contrôles à l’exportation et sanctions"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Vous acceptez de ne pas utiliser, exporter ou réexporter l’Application en violation des lois et réglementations applicables des États-Unis relatives aux contrôles à l’exportation et aux sanctions."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Vous déclarez qu’il ne vous est pas interdit de recevoir ou d’utiliser l’Application en vertu de la législation applicable."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "21. Conditions de l’Apple App Store"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Si vous avez téléchargé l’Application par l’intermédiaire de l’Apple App Store, vous reconnaissez et acceptez que :"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Les présentes Conditions sont conclues entre vous et Relaxess, et non avec Apple"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Relaxess, et non Apple, est responsable de l’Application et de son contenu"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Apple n’a aucune obligation de fournir des services de maintenance ou d’assistance pour l’Application"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Si l’Application ne respecte pas une garantie applicable, vous pouvez en informer Apple, et Apple peut rembourser le prix d’achat de l’Application lorsque les règles applicables le prévoient"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Apple n’est pas responsable du traitement des réclamations relatives à l’Application, sauf dans la mesure exigée par la législation applicable"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Apple et ses filiales sont des tiers bénéficiaires des présentes Conditions dans la mesure prévue par les conditions applicables d’Apple"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Votre utilisation de l’Application est également soumise aux conditions applicables de l’Apple App Store."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "22. Conditions de Google Play"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Si vous avez téléchargé l’Application par l’intermédiaire de Google Play, votre utilisation de l’Application est également soumise aux conditions et politiques applicables de Google Play."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "En cas de conflit entre les présentes Conditions et toute condition obligatoire de Google Play, les conditions obligatoires de Google Play prévalent dans la mesure requise."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "23. Mises à jour de l’Application"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Nous pouvons périodiquement fournir des mises à jour, des corrections de bugs, des correctifs ou de nouvelles versions de l’Application."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Certaines mises à jour peuvent être nécessaires pour continuer à utiliser certaines fonctionnalités ou pour maintenir la sécurité et le bon fonctionnement de l’Application."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Vous êtes responsable de maintenir une version compatible et raisonnablement à jour du système d’exploitation de votre appareil."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "24. Commentaires et suggestions"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Si vous nous fournissez des idées, suggestions, commentaires ou autres observations concernant Relaxess, vous nous accordez le droit d’utiliser ces commentaires afin d’améliorer, développer et exploiter nos produits et services sans obligation de vous verser une compensation, dans la mesure permise par la législation applicable."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Vous n’êtes pas tenu de nous fournir des commentaires ou suggestions."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "25. Liens et services tiers"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "L’Application ou notre site web peuvent contenir des liens vers des sites web, services ou ressources de tiers."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Nous ne contrôlons pas les services indépendants de tiers et ne sommes pas responsables de leur contenu, disponibilité, sécurité ou pratiques en matière de confidentialité."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Votre utilisation de services tiers est soumise aux conditions et politiques des tiers concernés."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "26. Communications électroniques"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "En utilisant l’Application ou en communiquant avec nous par voie électronique, vous acceptez de recevoir des communications électroniques de notre part lorsqu’elles sont nécessaires pour fournir le service, respecter des obligations légales ou vous informer de modifications importantes."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Ces communications peuvent comprendre des notifications dans l’Application, des publications sur notre site web ou des courriers électroniques si vous nous avez fourni votre adresse électronique."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "27. Coordonnées"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Si vous avez des questions, commentaires ou demandes concernant les présentes Conditions d’utilisation, vous pouvez nous contacter :"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "E-mail :",
          "bold": true
        },
        {
          "text": " "
        },
        {
          "text": "support@relaxess.app",
          "url": "mailto:support@relaxess.app"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Site web :",
          "bold": true
        },
        {
          "text": " "
        },
        {
          "text": "https://relaxess.app",
          "url": "https://relaxess.app"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "28. Notifications"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Les notifications requises ou autorisées en vertu des présentes Conditions peuvent être fournies par :"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "La publication d’une notification dans l’Application"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "La publication d’une notification sur notre site web"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Courrier électronique, si vous nous avez fourni une adresse électronique valide"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Les notifications prennent effet conformément à la législation applicable et à la nature de la notification concernée."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "29. Intégralité de l’accord"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Les présentes Conditions d’utilisation, ainsi que la Politique de confidentialité et toutes autres conditions expressément incorporées par référence, constituent l’intégralité de l’accord entre vous et Relaxess concernant votre utilisation de l’Application et remplacent tout accord ou arrangement antérieur relatif au même objet."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "30. Cession, divisibilité et renonciation"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Vous ne pouvez transférer ni céder vos droits ou obligations découlant des présentes Conditions sans notre consentement écrit préalable, sauf disposition contraire de la législation applicable."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Nous pouvons transférer nos droits et obligations dans le cadre d’une fusion, d’une acquisition, d’une réorganisation, d’une vente d’actifs ou de toute autre opération autorisée par la loi."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Si une disposition des présentes Conditions est déclarée invalide ou inapplicable, les autres dispositions resteront pleinement en vigueur dans toute la mesure permise par la loi."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Le fait que Relaxess n’exige pas l’application d’une disposition des présentes Conditions ne constitue pas une renonciation à son droit d’en exiger ultérieurement l’application."
        }
      ]
    },
    {
      "type": "end",
      "segments": [
        {
          "text": "Fin des Conditions d’utilisation",
          "bold": true
        }
      ]
    }
  ]
};

const PT_TERMS: TermsDocument = {
  "title": "Termos de Uso do Relaxess",
  "effective": "25 de junho de 2026",
  "updated": "25 de junho de 2026",
  "blocks": [
    {
      "type": "note",
      "segments": [
        {
          "text": "Aviso sobre a tradução:",
          "bold": true
        },
        {
          "text": " Estes Termos de Uso são uma tradução da versão original em inglês. A versão em inglês constitui o documento jurídico oficial e de referência. Em caso de qualquer diferença, conflito, divergência de interpretação ou imprecisão decorrente da tradução, a versão em inglês prevalecerá na medida permitida pela legislação aplicável."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "1. Aceitação dos Termos"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Ao baixar, instalar, acessar ou utilizar o aplicativo móvel Relaxess (o “Aplicativo”), você concorda em ficar vinculado a estes Termos de Uso (o “Acordo”). Se você não concordar com estes termos, não baixe nem utilize o Aplicativo."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Estes Termos de Uso aplicam-se a todos os usuários do Aplicativo."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "2. Descrição do Serviço"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "2.1 Visão geral"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Relaxess é um aplicativo de bem-estar e relaxamento desenvolvido para fornecer:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Conversas de apoio com tecnologia de inteligência artificial"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Exercícios de relaxamento e respiração"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Conteúdo de áudio para relaxamento"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Ferramentas para auxiliar no sono e na redução do estresse"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Recursos destinados a apoiar o bem-estar geral"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "2.2 Não é um serviço médico"
        }
      ]
    },
    {
      "type": "end",
      "segments": [
        {
          "text": "Relaxess NÃO é um serviço médico, de saúde mental, de terapia ou de emergência.",
          "bold": true
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "O Aplicativo:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Não fornece diagnósticos médicos"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Não fornece tratamento médico ou psicológico"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Não substitui médicos, terapeutas, psicólogos, psiquiatras ou outros profissionais qualificados"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Não deve ser utilizado para diagnosticar, tratar, curar ou prevenir qualquer doença ou transtorno"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Não foi desenvolvido para responder a emergências médicas ou de saúde mental"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Se você acredita que pode estar enfrentando uma emergência médica ou de saúde mental, entre imediatamente em contato com os serviços de emergência locais ou com um profissional qualificado."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "2.3 Inteligência artificial"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Alguns recursos do Relaxess utilizam tecnologia de inteligência artificial fornecida por serviços de terceiros, incluindo a OpenAI."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Você reconhece e concorda que:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "As respostas geradas por IA podem conter erros, imprecisões ou informações incompletas"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "As respostas de IA não devem ser consideradas aconselhamento médico, psicológico, jurídico, financeiro ou outro aconselhamento profissional"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Você é responsável por avaliar qualquer informação fornecida pelo Aplicativo"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Você não deve tomar decisões importantes relacionadas à sua saúde, segurança ou bem-estar com base exclusivamente em respostas geradas por IA"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "3. Elegibilidade e uso do Aplicativo"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "3.1 Idade mínima"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Você deve ter pelo menos 13 anos de idade para utilizar o Relaxess."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Se você tiver entre 13 anos e a idade legal de maioridade em sua jurisdição, somente poderá utilizar o Aplicativo com o consentimento e sob a supervisão de um dos pais ou responsável legal."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "3.2 Cumprimento da legislação"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Você concorda em utilizar o Aplicativo somente para fins legais e em conformidade com todas as leis e regulamentações aplicáveis."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "3.3 Uso pessoal"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "O Relaxess é fornecido exclusivamente para uso pessoal e não comercial, salvo autorização expressa e por escrito do Relaxess em contrário."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "4. Licença de uso"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "4.1 Licença limitada"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Sujeito ao cumprimento destes Termos de Uso, o Relaxess concede a você uma licença limitada, pessoal, não exclusiva, intransferível, não sublicenciável e revogável para baixar, instalar e utilizar o Aplicativo em um dispositivo que você possua ou controle, de acordo com estes Termos de Uso e com as regras aplicáveis da Apple App Store ou do Google Play."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "4.2 Restrições"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Você não pode:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Copiar, modificar, distribuir, vender, alugar ou sublicenciar o Aplicativo, exceto quando expressamente permitido pela legislação aplicável"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Realizar engenharia reversa, descompilar ou tentar extrair o código-fonte do Aplicativo, exceto quando expressamente permitido pela legislação aplicável"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Utilizar o Aplicativo para qualquer finalidade ilegal, fraudulenta ou abusiva"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Tentar obter acesso não autorizado ao Aplicativo, aos seus sistemas ou aos serviços relacionados"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Interferir no funcionamento normal ou na segurança do Aplicativo"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Utilizar sistemas automatizados, bots, scripts ou outros métodos para abusar do Aplicativo ou sobrecarregar seus serviços"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Remover, alterar ou ocultar avisos de direitos autorais, marcas comerciais ou outros avisos de propriedade"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "5. Assinaturas Premium e pagamentos"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "5.1 Assinaturas Premium"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "O Relaxess pode oferecer assinaturas Premium com renovação automática por meio da Apple App Store e do Google Play."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Os planos disponíveis podem incluir:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Plano mensal: US$ 2,99 por mês"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Plano anual: US$ 24,99 por ano"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Os assinantes Premium recebem:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Conversas ilimitadas com IA"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Acesso a todos os exercícios de relaxamento"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Streaming de áudio ilimitado"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "5.2 Cobrança e renovação"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "As assinaturas são cobradas por meio da conta da Apple App Store ou do Google Play associada ao seu dispositivo."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "As assinaturas são renovadas automaticamente, a menos que sejam canceladas"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "O cancelamento deve ser realizado nas configurações de assinatura da respectiva loja de aplicativos"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Os preços e as condições de cobrança exibidos na Apple App Store ou no Google Play no momento da compra serão aplicáveis à sua transação."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "5.3 Cancelamento"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Você pode cancelar sua assinatura a qualquer momento por meio de:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "iOS: Ajustes → [Seu nome] → Assinaturas → Relaxess → Cancelar assinatura"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Android: Google Play → Conta → Assinaturas → Relaxess → Cancelar"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "O cancelamento geralmente entra em vigor ao final do período de cobrança atual. A elegibilidade para reembolso, se houver, é determinada de acordo com as políticas aplicáveis da Apple App Store ou do Google Play e com a legislação aplicável."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "5.4 Reembolsos"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "As solicitações de reembolso de cobranças de assinatura são tratadas de acordo com as políticas da respectiva loja de aplicativos:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "iOS: entre em contato com o Suporte da Apple por meio da App Store"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Android: entre em contato com o Suporte do Google Play"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "A disponibilidade e o processamento de reembolsos estão sujeitos às políticas aplicáveis da Apple App Store ou do Google Play e à legislação aplicável."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "6. Serviços de terceiros"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "6.1 API da OpenAI"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "O Relaxess utiliza a API da OpenAI para fornecer determinados recursos de conversação com IA."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Ao utilizar esses recursos:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Suas mensagens podem ser enviadas à OpenAI para processamento"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "As entradas de voz podem ser convertidas em texto e processadas por serviços de IA"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "O processamento de dados pela OpenAI está sujeito aos próprios termos e políticas de privacidade da OpenAI"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "O Relaxess não controla as práticas independentes da OpenAI e não é responsável por atos ou omissões da OpenAI que estejam fora do controle razoável do Relaxess."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "6.2 Serviços de hospedagem e áudio"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "O Relaxess pode utilizar serviços de infraestrutura de terceiros, incluindo a Amazon Web Services (AWS), para hospedar e transmitir conteúdo de áudio."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "O conteúdo de áudio é transmitido diretamente de servidores em nuvem e requer uma conexão ativa com a Internet."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "6.3 Apple App Store e Google Play"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Se você baixar o Aplicativo ou adquirir uma assinatura por meio da Apple App Store ou do Google Play:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Você também estará sujeito aos termos e políticas da respectiva loja"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "A Apple ou o Google, conforme aplicável, processará os pagamentos da assinatura"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "As solicitações de reembolso estarão sujeitas às políticas da respectiva loja"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "A disponibilidade e o funcionamento da loja estão fora do controle do Relaxess"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "7. Uso aceitável"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Você concorda em não utilizar o Aplicativo para:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Violar qualquer lei ou regulamentação aplicável"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Violar os direitos de qualquer pessoa ou organização"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Transmitir conteúdo ilegal, ameaçador, abusivo, assediante ou fraudulento"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Tentar obter acesso não autorizado a sistemas, redes ou dados"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Introduzir vírus, malware ou outro código prejudicial"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Interferir ou interromper o Aplicativo, seus servidores ou redes relacionadas"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Tentar contornar restrições, limites ou medidas de segurança do Aplicativo"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Utilizar o Aplicativo de maneira que possa danificar, desativar, sobrecarregar ou prejudicar o serviço"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Utilizar respostas de IA para facilitar atividades ilegais ou prejudiciais"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Podemos limitar, suspender ou encerrar o acesso ao Aplicativo quando isso for razoavelmente necessário para proteger o Aplicativo, nossos usuários ou terceiros, ou para cumprir a legislação."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "8. Propriedade intelectual"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "8.1 Propriedade do Relaxess"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "O Aplicativo, incluindo seu design, software, código, elementos gráficos, logotipos, textos, conteúdo de áudio, elementos visuais e outros materiais fornecidos pelo Relaxess, é protegido pelas leis aplicáveis de propriedade intelectual."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Salvo indicação em contrário, o Relaxess e seus licenciadores mantêm todos os direitos, títulos e interesses sobre o Aplicativo e seu conteúdo."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "8.2 Marcas comerciais"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Relaxess, seus logotipos e outras marcas relacionadas podem constituir marcas comerciais ou marcas de serviço do Relaxess."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Você não pode utilizar essas marcas sem autorização prévia por escrito, exceto quando tal utilização for permitida pela legislação aplicável."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "8.3 Conteúdo de terceiros"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Determinados conteúdos, tecnologias ou serviços disponíveis por meio do Aplicativo podem pertencer a terceiros e estar sujeitos a licenças ou termos independentes."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "9. Isenções de responsabilidade"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "9.1 Uso por sua conta e risco"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "O uso do Aplicativo é feito por sua conta e risco."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Na máxima medida permitida pela legislação aplicável, o Aplicativo é fornecido “no estado em que se encontra” e “conforme disponível”, sem garantias de qualquer tipo, expressas ou implícitas."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "9.2 Nenhuma garantia de resultados"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "O Relaxess não garante que:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "O Aplicativo atenderá a todas as suas necessidades ou expectativas"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "As respostas geradas por IA serão sempre precisas, completas ou adequadas"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "O uso do Aplicativo produzirá um resultado específico relacionado a relaxamento, bem-estar ou sono"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "O Aplicativo funcionará sem interrupções ou erros"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Todos os defeitos ou erros serão corrigidos"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "9.3 Disponibilidade do serviço"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "O Relaxess não garante que o Aplicativo estará:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Disponível em todos os momentos"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Livre de vírus ou código prejudicial"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Seguro ou protegido contra todo acesso não autorizado"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "9.4 Confiança nas informações"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Qualquer confiança depositada nas informações fornecidas pelo Aplicativo é de sua própria responsabilidade."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Você deve consultar um profissional devidamente qualificado quando precisar de aconselhamento médico, psicológico, jurídico, financeiro ou de qualquer outro tipo profissional."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "9.5 Responsabilidade do usuário"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Você é responsável por:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Seu uso do Aplicativo"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Fazer cópias de segurança de seus dados pessoais, quando necessário"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "10. Privacidade e proteção de dados"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "10.1 Política de Privacidade"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "O uso do Aplicativo também é regido por nossa Política de Privacidade, que é incorporada por referência a estes Termos de Uso."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Você pode consultar a Política de Privacidade em:"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "https://relaxess.app/privacy",
          "url": "https://relaxess.app/privacy"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "10.2 Coleta e processamento de dados"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "O Aplicativo coleta e processa dados conforme descrito na Política de Privacidade, incluindo:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Mensagens de chat processadas por meio da OpenAI"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Entradas de voz processadas por meio da OpenAI"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Preferências locais armazenadas em seu dispositivo"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Informações do dispositivo utilizadas para operação e solução de problemas"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "10.3 Direitos de privacidade"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Dependendo do seu local de residência, você pode ter determinados direitos relacionados aos seus dados pessoais de acordo com as leis de privacidade aplicáveis."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Consulte nossa Política de Privacidade para obter informações detalhadas sobre esses direitos e sobre como exercê-los."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "11. Encerramento"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "11.1 Encerramento por você"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Você pode encerrar este Acordo a qualquer momento:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Desinstalando o Aplicativo"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Deixando de utilizar o Aplicativo"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Cancelando sua assinatura, se aplicável"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "11.2 Encerramento ou suspensão por nós"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Podemos encerrar ou suspender seu acesso ao Aplicativo se você:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Violar estes Termos de Uso"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Participar de atividades ilegais"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Utilizar o Aplicativo de maneira abusiva ou prejudicial"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Tentar comprometer a segurança do Aplicativo"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Violar qualquer lei aplicável"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "O encerramento ou a suspensão poderá ocorrer sem aviso prévio quando isso for razoavelmente necessário devido a uma violação grave, por motivos de segurança ou para cumprir a legislação."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "11.3 Efeitos do encerramento"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Após o encerramento:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Sua licença para utilizar o Aplicativo será revogada"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Você deverá deixar de utilizar o Aplicativo"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "As disposições que, por sua natureza, devam permanecer em vigor após o encerramento continuarão válidas"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "12. Alterações destes Termos"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Podemos modificar estes Termos de Uso periodicamente."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Quando fizermos alterações, poderemos atualizar a data de “Última atualização” e, quando exigido pela legislação aplicável, fornecer um aviso adicional."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "A continuidade do uso do Aplicativo após a entrada em vigor das alterações constitui sua aceitação dos Termos de Uso atualizados, na medida permitida pela legislação aplicável."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Se você não concordar com os Termos atualizados, deverá deixar de utilizar o Aplicativo."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "13. Alterações no Aplicativo"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Reservamo-nos o direito de modificar, atualizar, suspender ou descontinuar qualquer parte do Aplicativo a qualquer momento, sujeito à legislação aplicável."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Podemos:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Adicionar ou remover recursos"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Modificar recursos existentes"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Alterar limites de uso"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Atualizar o design ou a funcionalidade"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Realizar manutenção"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Suspender temporariamente determinados recursos ou serviços"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Não garantimos que qualquer recurso específico permanecerá disponível permanentemente."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "14. Legislação aplicável e jurisdição"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Estes Termos de Uso serão regidos e interpretados de acordo com as leis do Estado da Flórida, Estados Unidos, sem considerar seus princípios de conflito de leis."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Exceto quanto às disputas sujeitas à arbitragem vinculante nos termos da Seção 15, você concorda em se submeter à jurisdição dos tribunais estaduais e federais localizados na Flórida, Estados Unidos, para disputas decorrentes destes Termos de Uso ou do Aplicativo."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "15. Resolução de disputas"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "15.1 Resolução informal"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Antes de iniciar qualquer processo judicial ou outro procedimento legal, você concorda em tentar resolver a disputa informalmente entrando em contato conosco pelo endereço:"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "support@relaxess.app",
          "url": "mailto:support@relaxess.app"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "15.2 Arbitragem"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Qualquer disputa que não possa ser resolvida informalmente será resolvida por arbitragem vinculante, em vez de perante um tribunal, exceto conforme previsto na Seção 15.3 e salvo disposição em contrário da legislação aplicável."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "15.3 Exceção para pequenas causas"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Não obstante a Seção 15.2, qualquer uma das partes poderá apresentar uma reclamação individual perante um tribunal competente de pequenas causas, desde que a reclamação atenda aos requisitos aplicáveis."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "15.4 Ausência de ações coletivas"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Na medida permitida pela legislação aplicável, as disputas deverão ser apresentadas exclusivamente em caráter individual, e não como autor ou membro de uma classe em qualquer ação coletiva, consolidada ou representativa."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Nada nesta seção limita direitos aos quais não seja possível renunciar de acordo com a legislação aplicável."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "16. Limitação de responsabilidade"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Na máxima medida permitida pela legislação aplicável, o Relaxess e suas afiliadas, seus diretores, funcionários, agentes, licenciadores e prestadores de serviços não serão responsáveis por danos indiretos, incidentais, especiais, consequenciais, exemplares ou punitivos decorrentes do uso ou da impossibilidade de uso do Aplicativo."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Isso inclui, quando aplicável:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Perda de dados"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Perda de lucros ou receitas"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Perda de oportunidades"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Interrupção do serviço"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Danos decorrentes da confiança depositada em respostas geradas por IA"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Nada nestes Termos exclui ou limita qualquer responsabilidade que não possa ser legalmente excluída ou limitada."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "17. Indenização"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Na medida permitida pela legislação aplicável, você concorda em indenizar e isentar de responsabilidade o Relaxess e suas afiliadas, seus diretores, funcionários e agentes em relação a reclamações, responsabilidades, danos, perdas e despesas razoáveis decorrentes de:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Seu uso indevido do Aplicativo"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Sua violação destes Termos de Uso"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Sua violação da legislação aplicável"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Sua violação dos direitos de terceiros"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Esta obrigação não se aplica na medida em que uma reclamação seja causada por atos ou omissões do Relaxess pelos quais o Relaxess seja legalmente responsável."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "18. Força maior"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "O Relaxess não será responsável por qualquer atraso ou descumprimento causado por circunstâncias que estejam fora do nosso controle razoável, incluindo:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Desastres naturais"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Falhas de Internet ou de telecomunicações"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Falhas de infraestrutura em nuvem ou de serviços de terceiros"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Atos de autoridades governamentais"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Guerra, terrorismo, distúrbios civis ou conflitos trabalhistas"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Outros acontecimentos que não possam ser razoavelmente prevenidos ou controlados"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "19. Uso internacional"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "O Relaxess pode estar disponível para usuários em diferentes países."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Você é responsável por cumprir as leis locais aplicáveis ao seu uso do Aplicativo."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Não garantimos que o Aplicativo ou todo o seu conteúdo sejam apropriados, legais ou estejam disponíveis em todas as jurisdições."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "20. Controles de exportação e sanções"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Você concorda em não utilizar, exportar ou reexportar o Aplicativo em violação das leis e regulamentações aplicáveis dos Estados Unidos relacionadas a controles de exportação e sanções."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Você declara que não está proibido de receber ou utilizar o Aplicativo de acordo com a legislação aplicável."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "21. Termos da Apple App Store"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Se você baixou o Aplicativo por meio da Apple App Store, reconhece e concorda que:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Estes Termos são celebrados entre você e o Relaxess, e não com a Apple"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "O Relaxess, e não a Apple, é responsável pelo Aplicativo e por seu conteúdo"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "A Apple não tem obrigação de fornecer serviços de manutenção ou suporte para o Aplicativo"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Caso o Aplicativo não esteja em conformidade com alguma garantia aplicável, você poderá notificar a Apple, e a Apple poderá reembolsar o preço de compra do Aplicativo quando previsto pelas regras aplicáveis"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "A Apple não é responsável pelo tratamento de reclamações relacionadas ao Aplicativo, exceto na medida exigida pela legislação aplicável"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "A Apple e suas subsidiárias são terceiros beneficiários destes Termos na medida prevista pelos termos aplicáveis da Apple"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Seu uso do Aplicativo também está sujeito aos termos aplicáveis da Apple App Store."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "22. Termos do Google Play"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Se você baixou o Aplicativo por meio do Google Play, seu uso do Aplicativo também está sujeito aos termos e políticas aplicáveis do Google Play."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Em caso de conflito entre estes Termos e quaisquer termos obrigatórios do Google Play, os termos obrigatórios do Google Play prevalecerão na medida exigida."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "23. Atualizações do Aplicativo"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Podemos fornecer periodicamente atualizações, correções de erros, patches ou novas versões do Aplicativo."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Algumas atualizações podem ser necessárias para continuar utilizando determinados recursos ou para manter a segurança e o funcionamento adequado do Aplicativo."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Você é responsável por manter uma versão compatível e razoavelmente atualizada do sistema operacional do seu dispositivo."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "24. Feedback"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Se você nos fornecer ideias, sugestões, comentários ou outro feedback sobre o Relaxess, você nos concede o direito de utilizar esse feedback para melhorar, desenvolver e operar nossos produtos e serviços sem obrigação de compensá-lo, na medida permitida pela legislação aplicável."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Você não é obrigado a nos fornecer feedback."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "25. Links e serviços de terceiros"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "O Aplicativo ou nosso site podem conter links para sites, serviços ou recursos de terceiros."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Não controlamos nem somos responsáveis pelo conteúdo, disponibilidade, segurança ou práticas de privacidade de serviços independentes de terceiros."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Seu uso de serviços de terceiros está sujeito aos termos e políticas dos respectivos terceiros."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "26. Comunicações eletrônicas"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Ao utilizar o Aplicativo ou comunicar-se conosco eletronicamente, você concorda em receber nossas comunicações em formato eletrônico quando forem necessárias para fornecer o serviço, cumprir obrigações legais ou informá-lo sobre alterações importantes."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Essas comunicações podem incluir avisos dentro do Aplicativo, publicações em nosso site ou mensagens de e-mail, caso você tenha fornecido seu endereço de e-mail."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "27. Informações de contato"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Se você tiver dúvidas, comentários ou solicitações relacionadas a estes Termos de Uso, poderá entrar em contato conosco:"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "E-mail:",
          "bold": true
        },
        {
          "text": " "
        },
        {
          "text": "support@relaxess.app",
          "url": "mailto:support@relaxess.app"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Site:",
          "bold": true
        },
        {
          "text": " "
        },
        {
          "text": "https://relaxess.app",
          "url": "https://relaxess.app"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "28. Notificações"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "As notificações exigidas ou permitidas por estes Termos podem ser fornecidas por meio de:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Publicação de um aviso dentro do Aplicativo"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Publicação de um aviso em nosso site"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "E-mail, caso você tenha fornecido um endereço de e-mail válido"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "As notificações entrarão em vigor de acordo com a legislação aplicável e com a natureza da respectiva notificação."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "29. Acordo integral"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Estes Termos de Uso, juntamente com a Política de Privacidade e quaisquer outros termos expressamente incorporados por referência, constituem o acordo integral entre você e o Relaxess em relação ao seu uso do Aplicativo e substituem quaisquer acordos ou entendimentos anteriores sobre o mesmo assunto."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "30. Cessão, separabilidade e renúncia"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Você não pode transferir ou ceder seus direitos ou obrigações decorrentes destes Termos sem nosso consentimento prévio por escrito, salvo disposição em contrário da legislação aplicável."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Podemos transferir nossos direitos e obrigações em conexão com uma fusão, aquisição, reorganização, venda de ativos ou outra operação permitida por lei."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Se qualquer disposição destes Termos for considerada inválida ou inexequível, as demais disposições permanecerão em pleno vigor e efeito na máxima medida permitida por lei."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "O fato de o Relaxess não exigir o cumprimento de qualquer disposição destes Termos não constitui renúncia ao direito de exigir posteriormente seu cumprimento."
        }
      ]
    },
    {
      "type": "end",
      "segments": [
        {
          "text": "Fim dos Termos de Uso",
          "bold": true
        }
      ]
    }
  ]
};

const JA_TERMS: TermsDocument = {
  "title": "Relaxess 利用規約",
  "effective": "2026年6月25日",
  "updated": "2026年6月25日",
  "blocks": [
    {
      "type": "note",
      "segments": [
        {
          "text": "翻訳に関する注意事項：",
          "bold": true
        },
        {
          "text": " 本利用規約は、英語の原文を翻訳したものです。英語版が正式かつ法的に優先される文書です。翻訳による相違、矛盾、解釈の違い、または不正確な点がある場合、適用法で認められる範囲において英語版が優先されます。"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "1. 利用規約への同意"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Relaxessモバイルアプリケーション（以下「本アプリ」）をダウンロード、インストール、アクセス、または使用することにより、お客様は本利用規約（以下「本契約」）に拘束されることに同意したものとみなされます。本規約に同意しない場合は、本アプリをダウンロードまたは使用しないでください。"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "本利用規約は、本アプリのすべてのユーザーに適用されます。"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "2. サービスの説明"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "2.1 概要"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Relaxessは、ウェルネスとリラクゼーションを目的としたアプリであり、以下の機能を提供します。"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "人工知能（AI）を活用したサポート会話"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "リラクゼーションおよび呼吸エクササイズ"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "リラクゼーションのためのオーディオコンテンツ"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "睡眠およびストレス軽減をサポートするツール"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "全般的なウェルビーイングをサポートするための機能"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "2.2 医療サービスではありません"
        }
      ]
    },
    {
      "type": "end",
      "segments": [
        {
          "text": "Relaxessは、医療、メンタルヘルス治療、セラピー、または緊急対応サービスではありません。",
          "bold": true
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "本アプリは以下を行いません。"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "医学的診断を提供すること"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "医学的または心理学的治療を提供すること"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "医師、セラピスト、心理士、精神科医、その他の資格を有する専門家の代わりとなること"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "疾病または障害の診断、治療、治癒、予防を目的として使用されること"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "医療上または精神的な緊急事態に対応すること"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "医療上または精神的な緊急事態に直面している可能性がある場合は、直ちに地域の緊急サービスまたは資格を有する専門家に連絡してください。"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "2.3 人工知能"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Relaxessの一部の機能では、OpenAIを含む第三者サービスが提供する人工知能技術を使用しています。"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "お客様は、以下の事項を認識し、同意するものとします。"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "AIが生成する回答には、誤り、不正確な情報、または不完全な情報が含まれる場合があります"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "AIによる回答は、医学的、心理学的、法律上、財務上、またはその他の専門的な助言として扱われるべきではありません"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "本アプリが提供する情報を評価する責任はお客様自身にあります"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "健康、安全、またはウェルビーイングに関する重要な判断を、AIが生成した回答のみに基づいて行うべきではありません"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "3. 利用資格および本アプリの使用"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "3.1 最低年齢"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Relaxessを利用するには、13歳以上である必要があります。"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "13歳以上で、お客様の国または法域における法定成人年齢に達していない場合、本アプリは親または法定保護者の同意および監督のもとでのみ利用できます。"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "3.2 適用法令の遵守"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "お客様は、本アプリを合法的な目的にのみ使用し、適用されるすべての法律および規制を遵守することに同意するものとします。"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "3.3 個人利用"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Relaxessが書面により明示的に別途許可した場合を除き、本アプリは個人的かつ非商業的な利用のみを目的として提供されます。"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "4. 使用許諾"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "4.1 限定的ライセンス"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "お客様が本利用規約を遵守することを条件として、Relaxessは、本利用規約ならびにApple App StoreまたはGoogle Playの適用される規則に従い、お客様が所有または管理する端末に本アプリをダウンロード、インストールおよび使用するための、限定的、個人的、非独占的、譲渡不能、再許諾不能かつ取消可能なライセンスをお客様に付与します。"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "4.2 制限事項"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "お客様は、以下の行為を行ってはなりません。"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "適用法で明示的に認められている場合を除き、本アプリを複製、変更、配布、販売、賃貸、または再許諾すること"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "適用法で明示的に認められている場合を除き、本アプリをリバースエンジニアリング、逆コンパイル、またはそのソースコードの抽出を試みること"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "違法、詐欺的、または不正な目的で本アプリを使用すること"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "本アプリ、そのシステム、または関連サービスへの不正アクセスを試みること"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "本アプリの正常な動作またはセキュリティを妨害すること"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "自動化されたシステム、ボット、スクリプト、その他の方法を使用して本アプリを不正利用したり、サービスに過度な負荷をかけたりすること"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "著作権、商標権、その他の所有権に関する表示を削除、変更、または隠すこと"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "5. Premiumサブスクリプションおよび支払い"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "5.1 Premiumサブスクリプション"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Relaxessは、Apple App StoreおよびGoogle Playを通じて、自動更新されるPremiumサブスクリプションを提供する場合があります。"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "利用可能なプランには、以下が含まれる場合があります。"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "月額プラン：月額2.99米ドル"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "年額プラン：年額24.99米ドル"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Premiumサブスクリプションでは、以下の機能を利用できます。"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "無制限のAI会話"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "すべてのリラクゼーションエクササイズへのアクセス"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "無制限のオーディオストリーミング"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "5.2 請求および更新"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "サブスクリプション料金は、お客様の端末に関連付けられたApple App StoreまたはGoogle Playのアカウントを通じて請求されます。"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "サブスクリプションは、解約されない限り自動的に更新されます"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "解約は、該当するアプリストアのサブスクリプション設定から行う必要があります"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "購入時にApple App StoreまたはGoogle Playに表示される価格および請求条件が、お客様の取引に適用されます。"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "5.3 解約"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "お客様は、以下の方法でいつでもサブスクリプションを解約できます。"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "iOS：設定 → [お客様の名前] → サブスクリプション → Relaxess → サブスクリプションをキャンセル"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Android：Google Play → アカウント → サブスクリプション → Relaxess → 解約"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "解約は通常、現在の請求期間の終了時に有効になります。返金の対象となるかどうかは、該当するApple App StoreまたはGoogle Playのポリシーおよび適用法に従って決定されます。"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "5.4 返金"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "サブスクリプション料金の返金申請は、該当するアプリストアのポリシーに従って処理されます。"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "iOS：App Storeを通じてAppleサポートにお問い合わせください"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Android：Google Playサポートにお問い合わせください"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "返金の可否および処理は、該当するApple App StoreまたはGoogle Playのポリシーおよび適用法に従います。"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "6. 第三者サービス"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "6.1 OpenAI API"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Relaxessは、特定のAI会話機能を提供するためにOpenAI APIを使用しています。"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "これらの機能を使用する場合："
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "お客様のメッセージが処理のためにOpenAIへ送信される場合があります"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "音声入力がテキストに変換され、AIサービスによって処理される場合があります"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "OpenAIによるデータ処理には、OpenAI独自の利用規約およびプライバシーポリシーが適用されます"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "RelaxessはOpenAIの独立した業務慣行を管理するものではなく、Relaxessの合理的な管理の範囲外にあるOpenAIの作為または不作為について責任を負いません。"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "6.2 ホスティングおよびオーディオサービス"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Relaxessは、オーディオコンテンツのホスティングおよびストリーミングのために、Amazon Web Services（AWS）を含む第三者のインフラストラクチャサービスを使用する場合があります。"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "オーディオコンテンツはクラウドサーバーから直接ストリーミングされ、利用には有効なインターネット接続が必要です。"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "6.3 Apple App StoreおよびGoogle Play"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Apple App StoreまたはGoogle Playを通じて本アプリをダウンロードした場合、またはサブスクリプションを購入した場合："
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "該当するストアの利用規約およびポリシーも適用されます"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "サブスクリプションの支払いは、該当する場合、AppleまたはGoogleによって処理されます"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "返金申請には該当するストアのポリシーが適用されます"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "ストアの利用可能性および運営はRelaxessの管理外です"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "7. 適切な利用"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "お客様は、以下の目的または方法で本アプリを使用しないことに同意するものとします。"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "適用される法律または規制に違反すること"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "個人または組織の権利を侵害すること"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "違法、脅迫的、虐待的、嫌がらせ的、または詐欺的なコンテンツを送信すること"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "システム、ネットワーク、またはデータへの不正アクセスを試みること"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "ウイルス、マルウェア、その他の有害なコードを導入すること"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "本アプリ、そのサーバー、または関連ネットワークを妨害または中断すること"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "本アプリの制限、利用上限、またはセキュリティ対策を回避しようとすること"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "サービスを損傷、無効化、過負荷、または機能低下させる可能性のある方法で本アプリを使用すること"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "違法または有害な活動を助長するためにAIの回答を使用すること"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "本アプリ、ユーザー、第三者を保護するため、または法令を遵守するために合理的に必要な場合、当社は本アプリへのアクセスを制限、一時停止、または終了することがあります。"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "8. 知的財産権"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "8.1 Relaxessの所有権"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "本アプリならびにそのデザイン、ソフトウェア、コード、グラフィック、ロゴ、テキスト、オーディオコンテンツ、視覚的要素、およびRelaxessが提供するその他の素材は、適用される知的財産法によって保護されています。"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "別段の記載がない限り、Relaxessおよびそのライセンサーは、本アプリおよびそのコンテンツに関するすべての権利、権原および利益を保持します。"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "8.2 商標"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Relaxess、そのロゴ、およびその他の関連する標章は、Relaxessの商標またはサービスマークである場合があります。"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "適用法で認められている場合を除き、事前の書面による許可なくこれらの標章を使用することはできません。"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "8.3 第三者のコンテンツ"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "本アプリを通じて利用できる一部のコンテンツ、技術、またはサービスは第三者に帰属し、別個のライセンスまたは利用条件が適用される場合があります。"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "9. 免責事項"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "9.1 自己責任による利用"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "本アプリの利用は、お客様自身の責任において行われます。"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "適用法で認められる最大限の範囲において、本アプリは「現状有姿」かつ「提供可能な範囲」で提供され、明示または黙示を問わず、いかなる種類の保証も行いません。"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "9.2 結果の保証なし"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Relaxessは、以下を保証しません。"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "本アプリがお客様のすべてのニーズまたは期待を満たすこと"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "AIが生成する回答が常に正確、完全、または適切であること"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "本アプリの利用によって、リラクゼーション、ウェルビーイング、または睡眠に関する特定の結果が得られること"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "本アプリが中断またはエラーなく動作すること"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "すべての不具合またはエラーが修正されること"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "9.3 サービスの利用可能性"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Relaxessは、本アプリが以下の状態であることを保証しません。"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "常に利用可能であること"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "ウイルスまたは有害なコードが存在しないこと"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "あらゆる不正アクセスから完全に安全または保護されていること"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "9.4 情報への依存"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "本アプリが提供する情報を信頼して行動する場合、その責任はお客様自身が負うものとします。"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "医学的、心理学的、法律上、財務上、またはその他の専門的な助言が必要な場合は、適切な資格を有する専門家に相談してください。"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "9.5 ユーザーの責任"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "お客様は以下について責任を負います。"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "お客様による本アプリの利用"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "必要に応じて、お客様の個人データのバックアップを行うこと"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "10. プライバシーおよびデータ保護"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "10.1 プライバシーポリシー"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "本アプリの利用には、本利用規約に参照により組み込まれる当社のプライバシーポリシーも適用されます。"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "プライバシーポリシーは以下で確認できます。"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "https://relaxess.app/privacy",
          "url": "https://relaxess.app/privacy"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "10.2 データの収集および処理"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "本アプリは、プライバシーポリシーに記載されているとおり、以下を含むデータを収集および処理します。"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "OpenAIを通じて処理されるチャットメッセージ"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "OpenAIを通じて処理される音声入力"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "お客様の端末に保存されるローカル設定"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "本アプリの運用およびトラブルシューティングのために使用される端末情報"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "10.3 プライバシーに関する権利"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "お客様の居住地によっては、適用されるプライバシー法に基づき、個人データに関する一定の権利を有する場合があります。"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "これらの権利およびその行使方法の詳細については、当社のプライバシーポリシーをご確認ください。"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "11. 利用の終了"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "11.1 お客様による終了"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "お客様は、以下の方法によりいつでも本契約を終了できます。"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "本アプリをアンインストールすること"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "本アプリの使用を中止すること"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "該当する場合、サブスクリプションを解約すること"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "11.2 当社による終了または一時停止"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "お客様が以下のいずれかに該当する場合、当社は本アプリへのアクセスを終了または一時停止することがあります。"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "本利用規約に違反した場合"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "違法な活動を行った場合"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "本アプリを不正または有害な方法で使用した場合"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "本アプリのセキュリティを侵害しようとした場合"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "適用法に違反した場合"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "重大な違反、セキュリティ上の理由、または法令遵守のために合理的に必要な場合、事前の通知なく利用を終了または一時停止することがあります。"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "11.3 終了の効果"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "本契約の終了後："
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "本アプリを使用するためのライセンスは取り消されます"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "お客様は本アプリの使用を中止しなければなりません"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "その性質上、終了後も存続すべき条項は引き続き有効となります"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "12. 本利用規約の変更"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "当社は、本利用規約を随時変更することがあります。"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "変更を行った場合、「最終更新日」を更新し、適用法で要求される場合には追加の通知を行うことがあります。"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "変更の発効後も本アプリの利用を継続した場合、適用法で認められる範囲において、更新された利用規約に同意したものとみなされます。"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "更新された利用規約に同意しない場合は、本アプリの使用を中止してください。"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "13. 本アプリの変更"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "当社は、適用法に従い、本アプリの全部または一部をいつでも変更、更新、一時停止、または終了する権利を留保します。"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "当社は以下を行う場合があります。"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "機能の追加または削除"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "既存機能の変更"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "利用制限の変更"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "デザインまたは機能の更新"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "メンテナンスの実施"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "特定の機能またはサービスの一時停止"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "特定の機能が恒久的に利用可能であることを保証するものではありません。"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "14. 準拠法および管轄"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "本利用規約は、法の抵触に関する原則を除き、アメリカ合衆国フロリダ州の法律に準拠し、同法に従って解釈されます。"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "第15条に基づく拘束力のある仲裁の対象となる紛争を除き、お客様は、本利用規約または本アプリに起因する紛争について、アメリカ合衆国フロリダ州に所在する州裁判所および連邦裁判所の管轄に服することに同意するものとします。"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "15. 紛争解決"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "15.1 非公式な解決"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "法的手続きを開始する前に、お客様は以下のメールアドレスに連絡し、紛争を非公式に解決するよう試みることに同意するものとします。"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "support@relaxess.app",
          "url": "mailto:support@relaxess.app"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "15.2 仲裁"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "非公式に解決できない紛争は、第15.3項に定める場合および適用法により別段の定めがある場合を除き、裁判ではなく拘束力のある仲裁によって解決されるものとします。"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "15.3 少額訴訟の例外"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "第15.2項にかかわらず、請求が適用される要件を満たす場合、いずれの当事者も管轄権を有する少額訴訟裁判所に個別の請求を申し立てることができます。"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "15.4 集団訴訟の禁止"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "適用法で認められる範囲において、紛争は個人としてのみ提起されるものとし、集団訴訟、併合訴訟または代表訴訟における原告もしくは集団の構成員として提起することはできません。"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "本項のいかなる規定も、適用法上放棄することのできない権利を制限するものではありません。"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "16. 責任の制限"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "適用法で認められる最大限の範囲において、Relaxess、その関連会社、役員、従業員、代理人、ライセンサーおよびサービス提供者は、本アプリの利用または利用不能から生じる間接的、付随的、特別、結果的、懲罰的または類似の損害について責任を負いません。"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "これには、該当する場合、以下が含まれます。"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "データの損失"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "利益または収益の損失"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "機会の損失"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "サービスの中断"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "AIが生成した回答を信頼したことにより生じた損害"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "本利用規約のいかなる規定も、法律上除外または制限することのできない責任を除外または制限するものではありません。"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "17. 補償"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "適用法で認められる範囲において、お客様は、以下に起因する請求、責任、損害、損失および合理的な費用について、Relaxessならびにその関連会社、役員、従業員および代理人を補償し、免責することに同意するものとします。"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "お客様による本アプリの不正使用"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "お客様による本利用規約への違反"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "お客様による適用法への違反"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "お客様による第三者の権利の侵害"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "この義務は、Relaxessが法的責任を負うRelaxess自身の作為または不作為によって請求が生じた範囲には適用されません。"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "18. 不可抗力"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Relaxessは、当社の合理的な管理を超える状況によって生じた遅延または義務の不履行について責任を負いません。これには以下が含まれます。"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "自然災害"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "インターネットまたは通信障害"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "クラウドインフラストラクチャまたは第三者サービスの障害"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "政府機関による措置"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "戦争、テロ行為、内乱または労働争議"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "その他、合理的に防止または管理することができない事象"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "19. 国際的な利用"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Relaxessは、さまざまな国のユーザーが利用できる場合があります。"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "お客様は、本アプリの利用に適用される現地の法律を遵守する責任を負います。"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "当社は、本アプリまたはそのすべてのコンテンツが、すべての法域において適切、合法、または利用可能であることを保証しません。"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "20. 輸出管理および制裁"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "お客様は、適用される米国の輸出管理および制裁に関する法律および規制に違反して、本アプリを使用、輸出または再輸出しないことに同意するものとします。"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "お客様は、適用法に基づき本アプリを受領または使用することを禁止されていないことを表明するものとします。"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "21. Apple App Storeに関する条件"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Apple App Storeを通じて本アプリをダウンロードした場合、お客様は以下を認識し、同意するものとします。"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "本利用規約は、お客様とRelaxessとの間で締結されるものであり、Appleとの間で締結されるものではありません"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "本アプリおよびそのコンテンツについて責任を負うのはAppleではなくRelaxessです"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Appleは、本アプリに関するメンテナンスまたはサポートサービスを提供する義務を負いません"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "本アプリが適用される保証に適合しない場合、お客様はAppleに通知することができ、適用される規則で定められている場合、Appleは本アプリの購入価格を返金することがあります"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "適用法で要求される場合を除き、Appleは本アプリに関連する請求の処理について責任を負いません"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Appleおよびその子会社は、Appleの適用される条件で定められる範囲において、本利用規約の第三者受益者となります"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "本アプリの利用には、Apple App Storeの適用される利用条件も適用されます。"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "22. Google Playに関する条件"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Google Playを通じて本アプリをダウンロードした場合、本アプリの利用にはGoogle Playの適用される利用条件およびポリシーも適用されます。"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "本利用規約とGoogle Playの強制的に適用される条件との間に矛盾がある場合、必要な範囲においてGoogle Playの強制的な条件が優先されます。"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "23. 本アプリのアップデート"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "当社は、随時、本アプリのアップデート、バグ修正、パッチまたは新しいバージョンを提供する場合があります。"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "一部のアップデートは、特定の機能を引き続き利用するため、または本アプリのセキュリティおよび適切な動作を維持するために必要となる場合があります。"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "お客様は、ご自身の端末のオペレーティングシステムを、本アプリと互換性のある合理的に最新のバージョンに維持する責任を負います。"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "24. フィードバック"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "お客様がRelaxessに関するアイデア、提案、コメント、その他のフィードバックを当社に提供した場合、お客様は、適用法で認められる範囲において、当社がお客様に対する報酬の支払い義務を負うことなく、当社の製品およびサービスの改善、開発、運営のためにそのフィードバックを使用する権利を当社に付与するものとします。"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "お客様は、当社にフィードバックを提供する義務を負いません。"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "25. 第三者のリンクおよびサービス"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "本アプリまたは当社のウェブサイトには、第三者のウェブサイト、サービスまたはリソースへのリンクが含まれる場合があります。"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "当社は、独立した第三者サービスを管理しておらず、そのコンテンツ、利用可能性、セキュリティまたはプライバシー慣行について責任を負いません。"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "第三者サービスの利用には、それぞれの第三者の利用条件およびポリシーが適用されます。"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "26. 電子的な通信"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "本アプリを利用すること、または電子的な方法で当社に連絡することにより、お客様は、サービスの提供、法的義務の履行、または重要な変更についてお知らせするために必要な場合、当社から電子的な通信を受け取ることに同意するものとします。"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "これらの通信には、本アプリ内の通知、当社ウェブサイトへの掲載、またはお客様がメールアドレスを当社に提供した場合の電子メールが含まれることがあります。"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "27. 連絡先情報"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "本利用規約に関する質問、コメントまたはお問い合わせがある場合は、以下までご連絡ください。"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "メール：",
          "bold": true
        },
        {
          "text": " "
        },
        {
          "text": "support@relaxess.app",
          "url": "mailto:support@relaxess.app"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "ウェブサイト：",
          "bold": true
        },
        {
          "text": " "
        },
        {
          "text": "https://relaxess.app",
          "url": "https://relaxess.app"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "28. 通知"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "本利用規約に基づき必要または許可される通知は、以下の方法で行われる場合があります。"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "本アプリ内への通知の掲載"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "当社ウェブサイトへの通知の掲載"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "お客様が有効なメールアドレスを当社に提供している場合、電子メールによる通知"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "通知は、適用法および該当する通知の性質に従って効力を生じます。"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "29. 完全合意"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "本利用規約は、プライバシーポリシーおよび参照により明示的に組み込まれるその他の条件とともに、本アプリの利用に関するお客様とRelaxessとの間の完全な合意を構成し、同一事項に関する従前の合意または了解に優先します。"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "30. 譲渡、分離可能性および権利放棄"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "適用法に別段の定めがある場合を除き、お客様は、当社の事前の書面による同意なく、本利用規約に基づく権利または義務を移転または譲渡することはできません。"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "当社は、合併、買収、組織再編、資産売却、または法律で認められるその他の取引に関連して、当社の権利および義務を移転することがあります。"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "本利用規約のいずれかの条項が無効または執行不能と判断された場合でも、残りの条項は、法律で認められる最大限の範囲において引き続き完全な効力を有します。"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Relaxessが本利用規約のいずれかの条項を執行しなかった場合でも、後にその条項を執行する権利を放棄したことにはなりません。"
        }
      ]
    },
    {
      "type": "end",
      "segments": [
        {
          "text": "利用規約 終了",
          "bold": true
        }
      ]
    }
  ]
};


type TermsSegment = { text: string; bold?: boolean; url?: string };
type TermsBlock = { type: "h2" | "h3" | "body" | "bullet" | "note" | "end"; segments: TermsSegment[] };
type TermsDocument = { title: string; effective: string; updated: string; blocks: TermsBlock[] };

function RichTermsText({
  segments,
  colors,
  style,
}: {
  segments: TermsSegment[];
  colors: ReturnType<typeof useColors>;
  style?: any;
}) {
  return (
    <Text style={[{ fontSize: 14, color: colors.muted, lineHeight: 22 }, style]}>
      {segments.map((segment, index) =>
        segment.url ? (
          <Text
            key={index}
            onPress={() => Linking.openURL(segment.url!)}
            style={{ color: colors.primary, textDecorationLine: "underline", fontWeight: segment.bold ? "700" : "400" }}
          >
            {segment.text}
          </Text>
        ) : (
          <Text key={index} style={{ fontWeight: segment.bold ? "700" : "400" }}>
            {segment.text}
          </Text>
        )
      )}
    </Text>
  );
}

function LocalizedTerms({
  document,
  colors,
  effectiveLabel,
  updatedLabel,
}: {
  document: TermsDocument;
  colors: ReturnType<typeof useColors>;
  effectiveLabel: string;
  updatedLabel: string;
}) {
  return (
    <>
      <Text style={{ fontSize: 22, fontWeight: "700", color: colors.foreground, marginBottom: 4, lineHeight: 30 }}>
        {document.title}
      </Text>
      <Text style={{ fontSize: 15, fontWeight: "600", color: colors.foreground, marginBottom: 8 }}>Relaxess</Text>
      <Text style={{ fontSize: 13, color: colors.muted, marginBottom: 4 }}>
        <Text style={{ fontWeight: "600" }}>{effectiveLabel} </Text>{document.effective}
      </Text>
      <Text style={{ fontSize: 13, color: colors.muted, marginBottom: 16 }}>
        <Text style={{ fontWeight: "600" }}>{updatedLabel} </Text>{document.updated}
      </Text>

      <Divider colors={colors} />

      {document.blocks.map((block, index) => {
        if (block.type === "h2") {
          return <H2 key={index} colors={colors}>{block.segments.map(s => s.text).join("")}</H2>;
        }
        if (block.type === "h3") {
          return <H3 key={index} colors={colors}>{block.segments.map(s => s.text).join("")}</H3>;
        }
        if (block.type === "bullet") {
          return (
            <View key={index} style={{ flexDirection: "row", marginBottom: 4, paddingLeft: 8 }}>
              <Text style={{ fontSize: 14, color: colors.muted, lineHeight: 22, marginRight: 6 }}>•</Text>
              <View style={{ flex: 1 }}>
                <RichTermsText segments={block.segments} colors={colors} />
              </View>
            </View>
          );
        }
        if (block.type === "note") {
          return (
            <View key={index} style={{ borderLeftWidth: 3, borderLeftColor: colors.primary, paddingLeft: 12, marginBottom: 12 }}>
              <RichTermsText segments={block.segments} colors={colors} style={{ fontStyle: "italic" }} />
            </View>
          );
        }
        if (block.type === "end") {
          return (
            <RichTermsText
              key={index}
              segments={block.segments}
              colors={colors}
              style={{ textAlign: "center", fontStyle: "italic", marginTop: 16, marginBottom: 8 }}
            />
          );
        }
        return <RichTermsText key={index} segments={block.segments} colors={colors} style={{ marginBottom: 8 }} />;
      })}
    </>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function TermsOfUseScreen() {
  const { language } = useAppContext();
  const languageCode = String(language).toLowerCase();
  const isSpanish = languageCode.startsWith("es");
  const isGerman = languageCode.startsWith("de");
  const isFrench = languageCode.startsWith("fr");
  const isPortuguese = languageCode.startsWith("pt");
  const isJapanese = languageCode.startsWith("ja");
  const isEnglish = !isSpanish && !isGerman && !isFrench && !isPortuguese && !isJapanese;
  const localizedTerms =
    isSpanish ? ES_TERMS :
    isGerman ? DE_TERMS :
    isFrench ? FR_TERMS :
    isPortuguese ? PT_TERMS :
    isJapanese ? JA_TERMS :
    null;
  const router = useRouter();
  const colors = useColors();

  const handleBack = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.back();
  };

  return (
    <ScreenContainer className="pt-14">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ paddingHorizontal: 20, paddingBottom: 60 }}>
          {/* Navigation Header */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 24,
              paddingTop: 8,
            }}
          >
            <Pressable
              onPress={handleBack}
              style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1, paddingRight: 16 })}
            >
              <Text style={{ fontSize: 16, color: colors.primary, fontWeight: "600" }}>
                {isSpanish ? "← Atrás" : isGerman ? "← Zurück" : isFrench ? "← Retour" : isPortuguese ? "← Voltar" : isJapanese ? "← 戻る" : "← Back"}
              </Text>
            </Pressable>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "700",
                color: colors.foreground,
                flex: 1,
              }}
            >
              {isSpanish ? "Términos de Uso" : isGerman ? "Nutzungsbedingungen" : isFrench ? "Conditions d’utilisation" : isPortuguese ? "Termos de Uso" : isJapanese ? "利用規約" : "Terms of Use"}
            </Text>
          </View>

          {localizedTerms ? (
            <LocalizedTerms
              document={localizedTerms}
              colors={colors}
              effectiveLabel={
                isSpanish ? "Fecha de entrada en vigor:" :
                isGerman ? "Gültig ab:" :
                isFrench ? "Date d’entrée en vigueur :" :
                isPortuguese ? "Data de entrada em vigor:" :
                "発効日："
              }
              updatedLabel={
                isSpanish ? "Última actualización:" :
                isGerman ? "Zuletzt aktualisiert:" :
                isFrench ? "Dernière mise à jour :" :
                isPortuguese ? "Última atualização:" :
                "最終更新日："
              }
            />
          ) : (
            <>
          {/* ── Title ── */}
          <Text style={{ fontSize: 22, fontWeight: "700", color: colors.foreground, marginBottom: 4, lineHeight: 30 }}>
            Terms of Use (End User License Agreement)
          </Text>
          <Text style={{ fontSize: 15, fontWeight: "600", color: colors.foreground, marginBottom: 8 }}>Relaxess</Text>
          <Text style={{ fontSize: 13, color: colors.muted, marginBottom: 4 }}>
            <Text style={{ fontWeight: "600" }}>Effective Date:</Text> June 25, 2026
          </Text>
          <Text style={{ fontSize: 13, color: colors.muted, marginBottom: 16 }}>
            <Text style={{ fontWeight: "600" }}>Last Updated:</Text> June 25, 2026
          </Text>

          <Divider colors={colors} />

          {/* ── Section 1 ── */}
          <H2 colors={colors}>1. Acceptance of Terms</H2>
          <Body colors={colors}>
            By downloading, installing, accessing, or using the Relaxess mobile application (the “Application”), you agree to be bound by these Terms of Use (the “Agreement”). If you do not agree to these terms, do not download or use the Application.
          </Body>
          <Body colors={colors}>
            These Terms of Use apply to all users of the Application.
          </Body>

          <Divider colors={colors} />

          {/* ── Section 2 ── */}
          <H2 colors={colors}>2. License Grant</H2>
          <Body colors={colors}>
            Mykola Kubryakov (“we,” “us,” “our,” or “Company”) grants you a limited, non-exclusive, non-transferable, revocable license to use the Application for personal, non-commercial purposes in accordance with these Terms of Use.
          </Body>

          <H3 colors={colors}>2.1 Permitted Use</H3>
          <Body colors={colors}>You may use the Application to:</Body>
          <BulletItem colors={colors}>Access guided relaxation exercises and meditation tools</BulletItem>
          <BulletItem colors={colors}>Engage in conversations with our AI assistant</BulletItem>
          <BulletItem colors={colors}>Stream ambient audio content</BulletItem>
          <BulletItem colors={colors}>Manage your personal wellness preferences</BulletItem>
          <BulletItem colors={colors}>Subscribe to premium features (if applicable)</BulletItem>

          <H3 colors={colors}>2.2 Prohibited Use</H3>
          <Body colors={colors}>You may NOT use the Application to:</Body>
          <BulletItem colors={colors}>Reverse engineer, decompile, or disassemble the Application</BulletItem>
          <BulletItem colors={colors}>Modify, adapt, or create derivative works based on the Application</BulletItem>
          <BulletItem colors={colors}>Remove or alter any proprietary notices, labels, or marks</BulletItem>
          <BulletItem colors={colors}>Use the Application for commercial purposes without authorization</BulletItem>
          <BulletItem colors={colors}>Attempt to gain unauthorized access to the Application or its systems</BulletItem>
          <BulletItem colors={colors}>Interfere with or disrupt the Application or its servers</BulletItem>
          <BulletItem colors={colors}>Transmit viruses, malware, or harmful code</BulletItem>
          <BulletItem colors={colors}>Harass, threaten, or abuse other users</BulletItem>
          <BulletItem colors={colors}>Violate any applicable laws or regulations</BulletItem>
          <BulletItem colors={colors}>Use the Application in any manner that violates these Terms</BulletItem>

          <Divider colors={colors} />

          {/* ── Section 3 ── */}
          <H2 colors={colors}>3. Description of Services</H2>

          <H3 colors={colors}>3.1 AI Conversations</H3>
          <Body colors={colors}>The Application provides access to an AI-powered conversation feature that allows you to:</Body>
          <BulletItem colors={colors}>Send text messages to an AI assistant</BulletItem>
          <BulletItem colors={colors}>Receive responses generated by artificial intelligence</BulletItem>
          <BulletItem colors={colors}>Engage in ongoing conversations about wellness and relaxation</BulletItem>
          <Body colors={colors}>
            Important: The AI assistant is not a licensed therapist, counselor, or medical professional. The Application does not provide medical advice, diagnosis, or treatment.
          </Body>

          <H3 colors={colors}>3.2 Relaxation Exercises</H3>
          <Body colors={colors}>The Application includes the following guided relaxation exercises:</Body>
          <BulletItem colors={colors}>Breathing Exercise: Guided breathing patterns for stress relief</BulletItem>
          <BulletItem colors={colors}>Body Scan: Progressive relaxation through body awareness</BulletItem>
          <BulletItem colors={colors}>Grounding Exercise: 5-4-3-2-1 sensory technique for anxiety relief</BulletItem>
          <BulletItem colors={colors}>Safe Place Visualization: Guided mental imagery for creating a peaceful space</BulletItem>
          <BulletItem colors={colors}>Sleep Mode: Gentle guidance designed to support better sleep</BulletItem>
          <BulletItem colors={colors}>Quiet Relaxation: Ambient sounds (Music, Forest, Rain)</BulletItem>
          <Body colors={colors}>
            Important: These exercises are for relaxation and wellness purposes only. They are not medical treatments and should not replace professional medical care.
          </Body>

          <H3 colors={colors}>3.3 Ambient Audio Streaming</H3>
          <Body colors={colors}>The Application provides access to ambient audio content including:</Body>
          <BulletItem colors={colors}>Music</BulletItem>
          <BulletItem colors={colors}>Forest sounds</BulletItem>
          <BulletItem colors={colors}>Rain sounds</BulletItem>
          <Body colors={colors}>
            Audio content is streamed directly from cloud servers and requires an active internet connection.
          </Body>

          <H3 colors={colors}>3.4 Premium Subscription</H3>
          <Body colors={colors}>The Application offers optional premium subscription plans:</Body>
          <BulletItem colors={colors}>Monthly Plan: $2.99/month</BulletItem>
          <BulletItem colors={colors}>Annual Plan: $24.99/year</BulletItem>
          <Body colors={colors}>Premium subscribers receive:</Body>
          <BulletItem colors={colors}>Unlimited AI conversations</BulletItem>
          <BulletItem colors={colors}>Access to all relaxation exercises</BulletItem>
          <BulletItem colors={colors}>Unlimited audio streaming</BulletItem>

          <Divider colors={colors} />

          {/* ── Section 4 ── */}
          <H2 colors={colors}>4. Microphone Permission</H2>
          <Body colors={colors}>
            The Application may request permission to access your device’s microphone to enable voice input features. You can:
          </Body>
          <BulletItem colors={colors}>Grant or deny microphone permission when prompted</BulletItem>
          <BulletItem colors={colors}>Revoke microphone permission at any time through your device settings</BulletItem>
          <BulletItem colors={colors}>Use the Application without granting microphone permission (some features may be unavailable)</BulletItem>
          <Body colors={colors}>
            Voice data is processed for transcription purposes only and is not stored on our servers.
          </Body>

          <Divider colors={colors} />

          {/* ── Section 5 ── */}
          <H2 colors={colors}>5. Subscription Terms</H2>

          <H3 colors={colors}>5.1 Subscription Pricing and Billing</H3>
          <BulletItem colors={colors}>Subscriptions are billed automatically on a recurring basis</BulletItem>
          <BulletItem colors={colors}>Pricing is in USD and may vary by region and currency</BulletItem>
          <BulletItem colors={colors}>Billing occurs through Apple App Store (iOS) or Google Play (Android)</BulletItem>
          <BulletItem colors={colors}>We do not process or store payment information</BulletItem>

          <H3 colors={colors}>5.2 Subscription Renewal</H3>
          <BulletItem colors={colors}>Subscriptions automatically renew unless canceled</BulletItem>
          <BulletItem colors={colors}>Cancellation must be completed through your device’s app store settings</BulletItem>

          <H3 colors={colors}>5.3 Cancellation</H3>
          <Body colors={colors}>You can cancel your subscription at any time through:</Body>
          <BulletItem colors={colors}>iOS: Settings → [Your Name] → Subscriptions → Relaxess → Cancel Subscription</BulletItem>
          <BulletItem colors={colors}>Android: Google Play → Account → Subscriptions → Relaxess → Cancel</BulletItem>
          <Body colors={colors}>
            Cancellation generally takes effect at the end of your current billing period. Refund eligibility, if any, is determined by the applicable Apple App Store or Google Play policies and applicable law.
          </Body>

          <H3 colors={colors}>5.4 Refunds</H3>
          <Body colors={colors}>Refund requests for subscription charges are handled under the policies of the applicable app store:</Body>
          <BulletItem colors={colors}>iOS: Contact Apple Support through App Store</BulletItem>
          <BulletItem colors={colors}>Android: Contact Google Play Support</BulletItem>
          <Body colors={colors}>
            Refund availability and processing are subject to the applicable Apple App Store or Google Play policies and applicable law.
          </Body>

          <Divider colors={colors} />

          {/* ── Section 6 ── */}
          <H2 colors={colors}>6. Third-Party Services</H2>

          <H3 colors={colors}>6.1 OpenAI API</H3>
          <Body colors={colors}>The Application uses OpenAI’s API to power AI conversations. By using the Application, you agree to:</Body>
          <View style={{ paddingLeft: 8, marginBottom: 4 }}>
            <Text style={{ fontSize: 14, color: colors.muted, lineHeight: 22 }}>OpenAI’s Terms of Use: </Text>
            <LinkText url="https://openai.com/terms/" label="https://openai.com/terms/" colors={colors} />
          </View>
          <View style={{ paddingLeft: 8, marginBottom: 4 }}>
            <Text style={{ fontSize: 14, color: colors.muted, lineHeight: 22 }}>OpenAI’s Privacy Policy: </Text>
            <LinkText url="https://openai.com/privacy/" label="https://openai.com/privacy/" colors={colors} />
          </View>
          <BulletItem colors={colors}>Your conversations may be processed by OpenAI servers</BulletItem>

          <H3 colors={colors}>6.2 AWS S3</H3>
          <Body colors={colors}>The Application streams audio content from Amazon Web Services (AWS) S3. By using the Application, you acknowledge:</Body>
          <View style={{ paddingLeft: 8, marginBottom: 4 }}>
            <Text style={{ fontSize: 14, color: colors.muted, lineHeight: 22 }}>AWS Privacy Policy: </Text>
            <LinkText url="https://aws.amazon.com/privacy/" label="https://aws.amazon.com/privacy/" colors={colors} />
          </View>
          <BulletItem colors={colors}>AWS may collect standard web server logs</BulletItem>
          <BulletItem colors={colors}>Your IP address may be logged during audio streaming</BulletItem>

          <H3 colors={colors}>6.3 Apple App Store and Google Play</H3>
          <Body colors={colors}>The Application is distributed through:</Body>
          <BulletItem colors={colors}>Apple App Store (iOS)</BulletItem>
          <BulletItem colors={colors}>Google Play Store (Android)</BulletItem>
          <Body colors={colors}>You agree to the respective app store’s terms of service:</Body>
          <View style={{ paddingLeft: 8, marginBottom: 4 }}>
            <Text style={{ fontSize: 14, color: colors.muted, lineHeight: 22 }}>Apple: </Text>
            <LinkText url="https://www.apple.com/legal/internet-services/itunes/" label="https://www.apple.com/legal/internet-services/itunes/" colors={colors} />
          </View>
          <View style={{ paddingLeft: 8, marginBottom: 8 }}>
            <Text style={{ fontSize: 14, color: colors.muted, lineHeight: 22 }}>Google: </Text>
            <LinkText url="https://play.google.com/about/play-terms/" label="https://play.google.com/about/play-terms/" colors={colors} />
          </View>

          <Divider colors={colors} />

          {/* ── Section 7 ── */}
          <H2 colors={colors}>7. User Content and Submissions</H2>

          <H3 colors={colors}>7.1 Your Conversations</H3>
          <Body colors={colors}>Any text or voice input you provide to the Application (“User Content”) is:</Body>
          <BulletItem colors={colors}>Sent to OpenAI for processing</BulletItem>
          <BulletItem colors={colors}>Used to generate responses</BulletItem>
          <BulletItem colors={colors}>Subject to OpenAI’s privacy policy</BulletItem>
          <BulletItem colors={colors}>Not stored on our servers after processing</BulletItem>

          <H3 colors={colors}>7.2 Ownership</H3>
          <Body colors={colors}>
            You retain ownership of any User Content you create. However, by using the Application, you grant us a license to:
          </Body>
          <BulletItem colors={colors}>Process your User Content</BulletItem>
          <BulletItem colors={colors}>Use it to improve the Application (only in anonymized form)</BulletItem>
          <BulletItem colors={colors}>Share it with third-party services as necessary for functionality</BulletItem>

          <H3 colors={colors}>7.3 Prohibited Content</H3>
          <Body colors={colors}>You agree not to submit:</Body>
          <BulletItem colors={colors}>Illegal content</BulletItem>
          <BulletItem colors={colors}>Hateful or discriminatory content</BulletItem>
          <BulletItem colors={colors}>Sexually explicit content</BulletItem>
          <BulletItem colors={colors}>Violent or threatening content</BulletItem>
          <BulletItem colors={colors}>Content that violates others’ rights</BulletItem>
          <BulletItem colors={colors}>Spam or misleading content</BulletItem>

          <Divider colors={colors} />

          {/* ── Section 8 ── */}
          <H2 colors={colors}>8. Intellectual Property Rights</H2>

          <H3 colors={colors}>8.1 Application Ownership</H3>
          <Body colors={colors}>
            The Application, including all content, features, and functionality, is owned by Mykola Kubryakov and is protected by copyright, trademark, and other intellectual property laws.
          </Body>

          <H3 colors={colors}>8.2 Limited License</H3>
          <Body colors={colors}>
            We grant you a limited license to use the Application for personal, non-commercial purposes. All other rights are reserved.
          </Body>

          <H3 colors={colors}>8.3 Trademarks</H3>
          <Body colors={colors}>
            “Relaxess” and related logos are trademarks of Mykola Kubryakov. You may not use these trademarks without permission.
          </Body>

          <Divider colors={colors} />

          {/* ── Section 9 ── */}
          <H2 colors={colors}>9. Disclaimers and Limitations of Liability</H2>

          <H3 colors={colors}>9.1 Medical Disclaimer</H3>
          <Body colors={colors}>
            IMPORTANT: The Application is not a medical service and does not provide medical advice, diagnosis, treatment, or cure for any disease or condition.
          </Body>
          <BulletItem colors={colors}>The Application is for informational and wellness purposes only</BulletItem>
          <BulletItem colors={colors}>The AI assistant is not a licensed therapist, counselor, or medical professional</BulletItem>
          <BulletItem colors={colors}>Relaxation exercises are not medical treatments</BulletItem>
          <BulletItem colors={colors}>If you have a medical condition, mental health concern, or are in crisis, please contact a healthcare professional immediately</BulletItem>

          <H3 colors={colors}>9.2 No Warranty</H3>
          <Body colors={colors}>
            The Application is provided “AS IS” without warranty of any kind, express or implied, including but not limited to:
          </Body>
          <BulletItem colors={colors}>Warranties of merchantability</BulletItem>
          <BulletItem colors={colors}>Warranties of fitness for a particular purpose</BulletItem>
          <BulletItem colors={colors}>Warranties of non-infringement</BulletItem>
          <BulletItem colors={colors}>Warranties of accuracy or reliability</BulletItem>

          <H3 colors={colors}>9.3 Limitation of Liability</H3>
          <Body colors={colors}>To the maximum extent permitted by law, Mykola Kubryakov shall not be liable for:</Body>
          <BulletItem colors={colors}>Any indirect, incidental, special, consequential, or punitive damages</BulletItem>
          <BulletItem colors={colors}>Loss of data, revenue, or profits</BulletItem>
          <BulletItem colors={colors}>Interruption of service</BulletItem>
          <BulletItem colors={colors}>Errors or omissions in the Application</BulletItem>
          <BulletItem colors={colors}>Third-party content or services</BulletItem>
          <BulletItem colors={colors}>Your use or inability to use the Application</BulletItem>

          <H3 colors={colors}>9.4 Service Interruptions</H3>
          <Body colors={colors}>We do not guarantee that the Application will be:</Body>
          <BulletItem colors={colors}>Uninterrupted or error-free</BulletItem>
          <BulletItem colors={colors}>Available at all times</BulletItem>
          <BulletItem colors={colors}>Free from viruses or harmful code</BulletItem>
          <BulletItem colors={colors}>Secure or protected from unauthorized access</BulletItem>

          <H3 colors={colors}>9.5 User Responsibility</H3>
          <Body colors={colors}>You are responsible for:</Body>
          <BulletItem colors={colors}>Your use of the Application</BulletItem>
          <BulletItem colors={colors}>Backing up your personal data</BulletItem>

          <Divider colors={colors} />

          {/* ── Section 10 ── */}
          <H2 colors={colors}>10. Privacy and Data Protection</H2>

          <H3 colors={colors}>10.1 Privacy Policy</H3>
          <Body colors={colors}>
            Your use of the Application is governed by our Privacy Policy, which is incorporated by reference into these Terms of Use. Please review the Privacy Policy at:
          </Body>
          <View style={{ paddingLeft: 8, marginBottom: 8 }}>
            <LinkText url="https://relaxess.app/privacy" label="https://relaxess.app/privacy" colors={colors} />
          </View>

          <H3 colors={colors}>10.2 Data Collection</H3>
          <Body colors={colors}>The Application collects and processes data as described in the Privacy Policy, including:</Body>
          <BulletItem colors={colors}>Chat messages (processed by OpenAI)</BulletItem>
          <BulletItem colors={colors}>Voice input (processed by OpenAI)</BulletItem>
          <BulletItem colors={colors}>Local preferences (stored on your device)</BulletItem>
          <BulletItem colors={colors}>Device information (for troubleshooting)</BulletItem>

          <H3 colors={colors}>10.3 GDPR and CCPA Compliance</H3>
          <Body colors={colors}>
            If you are located in the European Union or California, you have additional rights regarding your data. Please refer to the Privacy Policy for details on exercising these rights.
          </Body>

          <Divider colors={colors} />

          {/* ── Section 11 ── */}
          <H2 colors={colors}>11. Termination</H2>

          <H3 colors={colors}>11.1 Termination by You</H3>
          <Body colors={colors}>You may terminate this Agreement at any time by:</Body>
          <BulletItem colors={colors}>Uninstalling the Application</BulletItem>
          <BulletItem colors={colors}>Discontinuing use of the Application</BulletItem>
          <BulletItem colors={colors}>Canceling your subscription (if applicable)</BulletItem>

          <H3 colors={colors}>11.2 Termination by Us</H3>
          <Body colors={colors}>We may terminate or suspend your access to the Application if you:</Body>
          <BulletItem colors={colors}>Violate these Terms of Use</BulletItem>
          <BulletItem colors={colors}>Engage in illegal activity</BulletItem>
          <BulletItem colors={colors}>Harass or abuse other users</BulletItem>
          <BulletItem colors={colors}>Attempt to compromise the Application’s security</BulletItem>
          <BulletItem colors={colors}>Violate any applicable laws</BulletItem>
          <Body colors={colors}>Termination may occur without notice in cases of serious violations.</Body>

          <H3 colors={colors}>11.3 Effect of Termination</H3>
          <Body colors={colors}>Upon termination:</Body>
          <BulletItem colors={colors}>Your license to use the Application is revoked</BulletItem>
          <BulletItem colors={colors}>You must stop using the Application immediately</BulletItem>
          <BulletItem colors={colors}>Provisions that survive termination remain in effect</BulletItem>

          <Divider colors={colors} />

          {/* ── Section 12 ── */}
          <H2 colors={colors}>12. Modifications to Terms</H2>
          <Body colors={colors}>
            We may modify these Terms of Use at any time. Changes will be effective immediately upon posting to the Application or our website.
          </Body>
          <Body colors={colors}>
            Your continued use of the Application after any changes constitutes your acceptance of the updated Terms of Use.
          </Body>

          <Divider colors={colors} />

          {/* ── Section 13 ── */}
          <H2 colors={colors}>13. Modifications to Application</H2>
          <Body colors={colors}>We reserve the right to:</Body>
          <BulletItem colors={colors}>Modify or discontinue the Application or any feature</BulletItem>
          <BulletItem colors={colors}>Change pricing or subscription terms</BulletItem>
          <BulletItem colors={colors}>Remove or add features</BulletItem>
          <BulletItem colors={colors}>Restrict access to certain features</BulletItem>
          <Body colors={colors}>
            We will attempt to provide notice of significant changes, but are not obligated to do so.
          </Body>

          <Divider colors={colors} />

          {/* ── Section 14 ── */}
          <H2 colors={colors}>14. Governing Law and Jurisdiction</H2>
          <Body colors={colors}>
            These Terms of Use are governed by and construed in accordance with the laws of the State of Florida, United States, without regard to its conflict of law principles.
          </Body>
          <Body colors={colors}>
            Except for disputes subject to binding arbitration under Section 15, you agree to submit to the jurisdiction of the state and federal courts located in Florida, United States, for disputes arising from these Terms of Use or the Application.
          </Body>

          <Divider colors={colors} />

          {/* ── Section 15 ── */}
          <H2 colors={colors}>15. Dispute Resolution</H2>

          <H3 colors={colors}>15.1 Informal Resolution</H3>
          <View style={{ marginBottom: 8 }}>
            <Text style={{ fontSize: 14, color: colors.muted, lineHeight: 22 }}>
              Before initiating any legal proceedings, you agree to attempt to resolve disputes informally by contacting us at{" "}
            </Text>
            <LinkText url="mailto:support@relaxess.app" label="support@relaxess.app" colors={colors} />
          </View>

          <H3 colors={colors}>15.2 Arbitration</H3>
          <Body colors={colors}>
            Any dispute that cannot be resolved informally shall be resolved through binding arbitration rather than in court, except as provided in Section 15.3.
          </Body>

          <H3 colors={colors}>15.3 Small Claims Exception</H3>
          <Body colors={colors}>
            You may bring claims in small claims court if the dispute qualifies for small claims jurisdiction.
          </Body>

          <Divider colors={colors} />

          {/* ── Section 16 ── */}
          <H2 colors={colors}>16. Severability</H2>
          <Body colors={colors}>
            If any provision of these Terms of Use is found to be invalid or unenforceable, that provision shall be severed, and the remaining provisions shall continue in full force and effect.
          </Body>

          <Divider colors={colors} />

          {/* ── Section 17 ── */}
          <H2 colors={colors}>17. Entire Agreement</H2>
          <Body colors={colors}>
            These Terms of Use, together with the Privacy Policy, constitute the entire agreement between you and Mykola Kubryakov regarding the Application and supersede all prior agreements and understandings.
          </Body>

          <Divider colors={colors} />

          {/* ── Section 18 ── */}
          <H2 colors={colors}>18. Contact Information</H2>
          <Body colors={colors}>
            If you have questions about these Terms of Use or the Application, please contact us at:
          </Body>
          <View style={{ marginBottom: 4 }}>
            <Text style={{ fontSize: 14, color: colors.muted, lineHeight: 22, fontWeight: "600" }}>Email: </Text>
            <LinkText url="mailto:support@relaxess.app" label="support@relaxess.app" colors={colors} />
          </View>
          <View style={{ marginBottom: 4 }}>
            <Text style={{ fontSize: 14, color: colors.muted, lineHeight: 22, fontWeight: "600" }}>Website: </Text>
            <LinkText url="https://relaxess.app" label="https://relaxess.app" colors={colors} />
          </View>
          <Body colors={colors}>We will respond to your inquiry within 30 days.</Body>

          <Divider colors={colors} />

          {/* ── Section 19 ── */}
          <H2 colors={colors}>19. Children’s Privacy</H2>
          <Body colors={colors}>
            The Application is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13.
          </Body>
          <Body colors={colors}>
            If we become aware that a child under 13 has provided information to the Application, we will delete such information immediately.
          </Body>
          <View style={{ marginBottom: 8 }}>
            <Text style={{ fontSize: 14, color: colors.muted, lineHeight: 22 }}>
              Parents or guardians who believe their child has provided information should contact us immediately at{" "}
            </Text>
            <LinkText url="mailto:support@relaxess.app" label="support@relaxess.app" colors={colors} />
          </View>

          <Divider colors={colors} />

          {/* ── Section 20 ── */}
          <H2 colors={colors}>20. Compliance with Laws</H2>
          <Body colors={colors}>
            You agree to comply with all applicable laws, rules, and regulations when using the Application. You are responsible for ensuring your use of the Application complies with local, state, national, and international laws.
          </Body>

          <Divider colors={colors} />

          {/* ── Section 21 ── */}
          <H2 colors={colors}>21. Accessibility</H2>
          <View style={{ marginBottom: 8 }}>
            <Text style={{ fontSize: 14, color: colors.muted, lineHeight: 22 }}>
              We are committed to making the Application accessible to all users. If you experience accessibility issues, please contact us at{" "}
            </Text>
            <LinkText url="mailto:support@relaxess.app" label="support@relaxess.app" colors={colors} />
          </View>

          <Divider colors={colors} />

          {/* ── Section 22 ── */}
          <H2 colors={colors}>22. Export Compliance</H2>
          <Body colors={colors}>
            The Application may be subject to export control laws, including the U.S. Export Administration Regulations (EAR) and the International Traffic in Arms Regulations (ITAR).
          </Body>
          <Body colors={colors}>
            You agree not to export or re-export the Application to any country or entity prohibited by U.S. law or to any person or entity on any U.S. government list of prohibited parties.
          </Body>

          <Divider colors={colors} />

          {/* ── Section 23 ── */}
          <H2 colors={colors}>23. Feedback and Suggestions</H2>
          <Body colors={colors}>
            Any feedback, suggestions, or ideas you provide regarding the Application may be used by us without compensation or attribution. You grant us a perpetual, irrevocable, worldwide, royalty-free license to use such feedback.
          </Body>

          <Divider colors={colors} />

          {/* ── Section 24 ── */}
          <H2 colors={colors}>24. Third-Party Links</H2>
          <Body colors={colors}>The Application may contain links to third-party websites and services. We are not responsible for:</Body>
          <BulletItem colors={colors}>The content of third-party sites</BulletItem>
          <BulletItem colors={colors}>The accuracy of third-party information</BulletItem>
          <BulletItem colors={colors}>Third-party privacy practices</BulletItem>
          <BulletItem colors={colors}>Third-party terms of service</BulletItem>
          <Body colors={colors}>Your use of third-party sites is governed by their terms and policies.</Body>

          <Divider colors={colors} />

          {/* ── Section 25 ── */}
          <H2 colors={colors}>25. Indemnification</H2>
          <Body colors={colors}>
            You agree to indemnify and hold harmless Mykola Kubryakov and its officers, directors, employees, and agents from any claims, damages, losses, or expenses (including legal fees) arising from:
          </Body>
          <BulletItem colors={colors}>Your use of the Application</BulletItem>
          <BulletItem colors={colors}>Your violation of these Terms of Use</BulletItem>
          <BulletItem colors={colors}>Your violation of any applicable laws</BulletItem>
          <BulletItem colors={colors}>Your infringement of any third-party rights</BulletItem>
          <BulletItem colors={colors}>Your User Content</BulletItem>

          <Divider colors={colors} />

          {/* ── Section 26 ── */}
          <H2 colors={colors}>26. Waiver</H2>
          <Body colors={colors}>
            The failure of Mykola Kubryakov to enforce any provision of these Terms of Use does not constitute a waiver of that provision or any other provision.
          </Body>

          <Divider colors={colors} />

          {/* ── Section 27 ── */}
          <H2 colors={colors}>27. Survival</H2>
          <Body colors={colors}>The following provisions survive termination of this Agreement:</Body>
          <BulletItem colors={colors}>Intellectual Property Rights (Section 8)</BulletItem>
          <BulletItem colors={colors}>Disclaimers and Limitations of Liability (Section 9)</BulletItem>
          <BulletItem colors={colors}>Privacy and Data Protection (Section 10)</BulletItem>
          <BulletItem colors={colors}>Governing Law and Jurisdiction (Section 14)</BulletItem>
          <BulletItem colors={colors}>Indemnification (Section 25)</BulletItem>

          <Divider colors={colors} />

          {/* ── Section 28 ── */}
          <H2 colors={colors}>28. Notices</H2>
          <Body colors={colors}>Any notices required by these Terms of Use shall be provided by:</Body>
          <BulletItem colors={colors}>Posting to the Application</BulletItem>
          <BulletItem colors={colors}>Posting to our website</BulletItem>
          <Body colors={colors}>Notices are effective upon receipt or posting.</Body>

          <Divider colors={colors} />

          {/* ── Section 29 ── */}
          <H2 colors={colors}>29. Assignment</H2>
          <Body colors={colors}>
            You may not assign or transfer your rights under this Agreement. We may assign our rights to a successor or affiliate.
          </Body>

          <Divider colors={colors} />

          {/* ── Section 30 ── */}
          <H2 colors={colors}>30. Severability and Waiver</H2>
          <Body colors={colors}>
            If any provision is found invalid, the remaining provisions continue in effect. The failure to enforce any right does not constitute a waiver of that right.
          </Body>

          <Divider colors={colors} />

          <Text
            style={{
              fontSize: 13,
              color: colors.muted,
              textAlign: "center",
              fontStyle: "italic",
              marginBottom: 8,
            }}
          >
            End of Terms of Use
          </Text>
            </>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
