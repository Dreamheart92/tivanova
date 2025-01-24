import {cva} from "class-variance-authority";

type ProductsGridProps = {
    children: React.ReactNode;
    cols?: 2 | 3 | 4;
}

const gridStyles = cva(
    'grid gap-4', {
        variants: {
            cols: {
                2: 'grid-cols-2',
                3: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-3',
                4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
            }
        },
        defaultVariants: {
            cols: 4,
        }
    }
)

export default function ProductsGrid({cols = 4, children}: ProductsGridProps) {
    return (
        <div className={gridStyles({cols})}>
            {children}
        </div>
    )
}