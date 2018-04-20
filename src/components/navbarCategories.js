import React from 'react'
import { capitalize } from '../utils/helpers'

export default function Categories ( categories ){
    return (
        <div>
                { categories.length > 0 && (
                    <ul class="navbar-nav">
                        { categories.map( category => (
                            <li key={category.name} className="nav-item">
                                <a className="nav-link" href={category.path}>{capitalize(category.name)}</a>
                            </li>                        
                        ))}
                    </ul>
                )}
        </div>
    )
}