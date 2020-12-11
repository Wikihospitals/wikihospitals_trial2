import { graphql } from "gatsby"
//import Img from "gatsby-image"
import React from "react"
import { Feature } from "../components"
import { useModal } from "../context"
import { Layout } from "../layouts/Layout"

export default (props) => {
  
  const { data, location } = props

  const {
    country,
    description,
    youtube,
    name,
    tags,
    url,
    image,
    Diseases,
    Technology,
    Products,
    Place_of_use,
    Customer_link,
    Favourites
  } = data.item.data

  const navigation = location.state ? location.state.navigation : null

  const { modal } = useModal()
  
  return (
    <Layout navigation={navigation}>
     {/* <SiteMetadata title={name} description={summary} image={cover.url} /> */}
      <article className={modal && "max-h-80vh md:max-h-90vh overflow-auto"}>
        <div className={modal ? "p-4 lg:p-8" : "container py-8"}>

          <h1 className="pb-4 text-center text-2xl lg:text-3xl text-blue-500 dark:text-blue-400 font-bold leading-tight">
            <a href={url} target="_blank">{name}</a>
          </h1>

          <div className="mb-10 flex flex-wrap">
            <img className="c-img mx-auto" src={image[0].url} alt={name} />
          </div>

          <p className="mb-10 whitespace-pre-line text-sm lg:text-base leading-normal text-blue-900 dark:text-blue-600">
            {description}
          </p>

          { youtube && 
            <div className="mb-20 flex flex-wrap">
              
                <a href={youtube} target="_blank" className="mx-auto"><img className="c-img" src={`https://img.youtube.com/vi/${youtube.replace("https://youtu.be/","")}/0.jpg`} alt={name} /></a>
              
            </div>
          }
          
          <div className="flex flex-wrap">

            <div className="w-full lg:w-1/4 lg:pl-4 pb-4">
              <Feature label="Medical specialties" value={tags} />
            </div>
            <div className="w-full lg:w-1/4 lg:pl-4 pb-4">
              <Feature label="Diseases" value={Diseases} />
            </div>
            <div className="w-full lg:w-1/4 lg:pl-4 pb-4">
              <Feature label="Technology" value={Technology} />
            </div>
            <div className="w-full lg:w-1/4 lg:pl-4 pb-4">
              <Feature label="Country of origin" value={country} />
            </div>

            <div className="w-full lg:w-1/4 lg:pl-4 pb-4">
              <Feature label="Products" value={Products} />
            </div>
            <div className="w-full lg:w-1/4 lg:pl-4 pb-4">
              <Feature label="Place of use" value={Place_of_use} />
            </div>
            <div className="w-full lg:w-1/4 lg:pl-4 pb-4">
              <Feature label="Customer" value={Customer_link} />
            </div>
            <div className="w-full lg:w-1/4 lg:pl-4 pb-4">
              <Feature label="Favourites" value={Favourites} />
            </div>

          </div>

        </div>
      </article>
    </Layout>
  )
}

export const query = graphql`
  query SingleItemQuery($slug: String!) {
    item: airtable(data: { Company_title: { eq: $slug } }) {
      data {
        slug : Company_title
        name : Company_title
        url : Website
        image {
          url
        }
        description : Description
        youtube: Video
        tags : Medical_specialties
        Diseases
        Technology
        country : Country_of_origin
        Products
        Place_of_use
        Customer_link
        Favourites
      }
    }
  }
`
