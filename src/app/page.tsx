import { SubscribeButton } from '@/components/SubscribeButton'
import styles from './home.module.scss'
import { Metadata } from "next"
import { stripe } from '@/services/stripe'


export const metadata: Metadata = {
  title: 'ig.news | Home',
}

export default async function Home() {

  const price = await stripe.prices.retrieve('price_1NbT0yAGY9OYkasHGDayCxR0' , {
    expand:['product']
  })

  const product = {
    priceId : price.id,
    amount : new Intl.NumberFormat('en-US' , {
      style: 'currency',
      currency: 'USD'
    }).format(price.unit_amount! / 100),
  };


  return (
    <main className={styles.contentContainer}>
      <section className={styles.hero}>
          <span>👏 Hey , welcome</span>
          <h1>News about the <span>React</span> world</h1>
          <p>
            Get access to all the publications <br/>
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.priceId}/>
      </section>
      <img src="/images/avatar.svg" alt="girl coding" />
    </main>
  )
}
