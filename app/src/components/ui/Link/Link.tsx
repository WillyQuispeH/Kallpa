import styles from "./Link.module.scss"

interface IntLink{
    valor:string
}

const Link = ({valor}:IntLink) => {
  return (
    <div className={styles.link}>
        <a >{valor}</a>
    </div>
  )
}

export default Link