import React from "react";

export default function CatalogueGrid({children, columns = 4}: { children: React.ReactNode, columns?: number }) {
    return (
        <div style={{
            width: '100%',
            display: 'grid',
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            rowGap: '1em',
            columnGap: '0.25em',
        }}>
            {children}
        </div>
    )
}