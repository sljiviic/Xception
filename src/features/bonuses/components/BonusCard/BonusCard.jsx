import Card from '@/components/ui/Card/Card'
import Button from '@/components/ui/Button/Button'

const BonusCard = ({
  variant,
  title,
  image,
  text,
  href }) => {
  return (
    <Card
      variant={variant}
      title={title}
      image={image}
      footer={
        <Button
          as='a'
          href={href}
          variant='primary'
          size='medium'
          className='width-full'
        >
          CLAIM BONUS
        </Button>
      }
    >
      {text}
    </Card>
  )
}

export default BonusCard