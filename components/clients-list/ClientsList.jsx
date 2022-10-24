import React from 'react'
import SectionWrapper from '../wrappers/SectionWrapper'

const ClientsList = ({ categories }) => {
  return (
    <section className="clientsList">
      <SectionWrapper>
        {categories.map(({ category, clients }) => {
          if (category === null) return null
          return (
            <ul className="clientsList-list" key={category.title}>
              <li>
                <h3 className="clientsList-title">{category.title}</h3>
                {clients.map(client => {
                  return (
                    <p className="clientsList-item" key={client.name}>
                      {client.name}
                    </p>
                  )
                })}
              </li>
            </ul>
          )
        })}
      </SectionWrapper>
    </section>
  )
}

export default ClientsList
