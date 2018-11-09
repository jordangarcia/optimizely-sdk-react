import React, { Component } from 'react';
import { FeatureVariable } from './react-sdk';

export default function example({ title='', children }) {
  return <div class="example">
    <h5 class="example-title">{title}</h5>
    {children}
  </div>
}
