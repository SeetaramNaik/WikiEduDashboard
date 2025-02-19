import { debounce } from 'lodash';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AsyncSelect from 'react-select/async';
import API from '../../../utils/api';

const TemplatesAutoCompleteInput = ({ label, actionType, initial }) => {
  const dispatch = useDispatch();
  const home_wiki = useSelector(state => state.course.home_wiki);

  const search = async (query) => {
    const data = await API.getTemplatesWithPrefix(home_wiki, query);
    return data;
  };

  const _loadOptions = (query, callback) => {
    search(query).then(resp => callback(resp));
  };


  const loadOptions = debounce(_loadOptions, 300);

  const updateTemplates = (templates) => {
    dispatch({
      type: actionType,
      templates,
    });
  };

  return (
    <>
      <label htmlFor="templates">{label}</label>
      <AsyncSelect
        loadOptions={loadOptions}
        placeholder={I18n.t('courses_generic.creator.scoping_methods.start_typing_to_search')}
        isMulti
        id="templates"
        onChange={updateTemplates}
        noOptionsMessage={() => 'No Templates found'}
        defaultValue={initial}
      />
    </>
  );
};

export default TemplatesAutoCompleteInput;
