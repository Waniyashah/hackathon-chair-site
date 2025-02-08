import { type SchemaTypeDefinition } from 'sanity'
import { productSchema } from './product'
import { categorySchema } from './categories'
import { HeroSchema } from './Hero'
import { LogosSchema } from './logos'
import { OrderSchema } from './Order'
import { contactSchema } from './Contact'
import { userSchema } from './User'
import { WishlistSchema } from './Wishlist'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [productSchema, categorySchema, HeroSchema, LogosSchema, OrderSchema, contactSchema , userSchema, WishlistSchema],
}
