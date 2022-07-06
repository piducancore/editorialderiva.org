/** @jsx jsx */
import { Link } from "gatsby"
import React from "react"
import { jsx, Themed, Flex } from "theme-ui"

import Layout from "../../components/layout"

export default function Resultado({ params }) {
  const data = JSON.parse(atob(params.encoded))
  const authorized = data.response_code === 0 && data.status === "AUTHORIZED"
  return (
    <Layout>
      {authorized ? (
        <React.Fragment>
          <Themed.h1 sx={{ textAlign: "center" }}>🥳 Pago exitoso</Themed.h1>
          <Themed.p sx={{ textAlign: "center" }}>
            Hemos recibido tu pago exitosamente.
            <br />
            Nos pondremos en contacto a la brevedad para coordinar los detalles de tu envío 📦
          </Themed.p>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Themed.h1 sx={{ textAlign: "center" }}>😢 Algo falló</Themed.h1>
          <Themed.p sx={{ textAlign: "center" }}>
            Hubo un problema al procesar tu pago.
            <br />
            No te preocupes, no se hizo ningún recargo.
            <br />
            Si gustas puedes intentarlo nuevamente, tus compras están en el{" "}
            <Link to="/carrito" sx={t => t.styles.a}>
              carrito
            </Link>
            .
          </Themed.p>
        </React.Fragment>
      )}
      <Flex sx={{ flexDirection: "column", maxWidth: "blog", mx: "auto" }}>
        <TransactionDetails {...data} />
      </Flex>
    </Layout>
  )
}

function TransactionDetails(props) {
  const dateString = new Date(props.transaction_date).toLocaleDateString("es", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
  return (
    <React.Fragment>
      <Themed.h4 sx={{ mt: 0, textAlign: "center" }}>Detalles de la transacción</Themed.h4>
      {[
        { key: "Número de orden", value: props.buy_order },
        { key: "Monto", value: "CLP$" + props.amount },
        { key: "Código de autorización", value: props.authorization_code },
        { key: "Fecha", value: dateString },
        { key: "Tipo de pago", value: payment_type_codes[props.payment_type_code] },
        // Tipo de cuota
        props.installments_number ? { key: "Cantidad de cuotas", value: props.installments_number } : null,
        props.installments_amount ? { key: "Monto de cuota", value: "CLP$" + props.installments_amount } : null,
        { key: "Tarjeta bancaria terminada en", value: "***" + props.card_detail?.card_number },
        props.product ? { key: "Detalle", value: props.product } : null,
      ]
        .filter(el => el)
        .map(({ key, value }) => (
          <Flex key={key} sx={{ justifyContent: "space-between" }}>
            <Themed.p sx={{ fontSize: 1, my: 1 }}>{key}</Themed.p>
            <Themed.p sx={{ fontSize: 1, my: 1 }}>
              <strong>{value}</strong>
            </Themed.p>
          </Flex>
        ))}
    </React.Fragment>
  )
}

const payment_type_codes = {
  VD: "Venta Débito",
  VN: "Venta Normal",
  VC: "Venta en cuotas",
  SI: "3 cuotas sin interés",
  S2: "2 cuotas sin interés",
  NC: "N Cuotas sin interés",
  VP: "Venta Prepago",
}
