import React, { Component } from 'react';
import PropTypes from 'prop-types';
import elephant from '../../img/elephant.jpg';
import isEmpty from '../../validation/is-empty';

class PersonaHeader extends Component {
  render () {
    const { persona } = this.props;

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-card text-white mb-3">
            <div className="row">
              <div className="col-4 col-md-3 m-auto">
                <img src={ elephant } alt="" className="rounded-circle" />
              </div>
            </div>
            <div className="text-center">
              <h1 className="display-4 text-center">{ persona.name }</h1>
              <p>Goodness:{' '}{ persona.gRating }</p>
              <p>Agreement:{' '}{ persona.cRating }</p>
              <p>
                {isEmpty(persona.social && persona.social.twitter) ? null : (
                  <a className="text-white p-2" href={persona.social.twitter} target="_blank">
                    <i className="fab fa-twitter"></i>
                  </a>
                )}

                {isEmpty(persona.social && persona.social.instagram) ? null : (
                  <a className="text-white p-2" href={persona.social.instagram}>
                    <i className="fab fa-instagram"></i>
                  </a>
                )}

                {isEmpty(persona.social && persona.social.facebook) ? null : (
                  <a className="text-white p-2" href={persona.social.facebook}>
                    <i className="fab fa-facebook"></i>
                  </a>
                )}

                {isEmpty(persona.social && persona.social.youtube) ? null : (
                  <a className="text-white p-2" href={persona.social.youtube}>
                    <i className="fab fa-youtube"></i>
                  </a>
                )}

                {isEmpty(persona.social && persona.social.email) ? null : (
                  <a className="text-white p-2" href={persona.social.email}>
                    <i className="fas fa-at"></i>
                  </a>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PersonaHeader;