/* global angular */
(function() {
  
  'use strict';

  var app = angular.module('formlyExample', ['formly', 'formlyBootstrap']);
  

  app.controller('MainCtrl', function MainCtrl(formlyVersion, $http) {
    var vm = this;
    // funcation assignment
    vm.onSubmit = onSubmit;

    // variable assignment
    vm.author = { // optionally fill in your info below :-)
      name: 'Kent C. Dodds',
      url: 'https://twitter.com'
    };
    vm.title = 'SPR'; // add this
    vm.env = {
      angularVersion: angular.version.full,
      formlyVersion: formlyVersion
    };

    vm.model = {};
    vm.options = {};
		
		$http.get('https://appsdev1istore.clopay.com/OA_HTML/erpintegra/cz2.jsp?model=SPR&resp=IBE_CUSTOMER').then(
			function(resp) {
				var nodes = resp.data.nodes.filter(function(entry){
					return entry.type == 8;
				});
				var fields = nodes.map(function(entry, index) {
					return {
						key: index,
						type: 'select',
						templateOptions: {
							required: entry.minSel > 0,
							label: entry.desc,
							options: entry.options.map(function(opt) {
								return {
									name: opt.desc,
									value: opt.name
								}
							})
						}
					}
				});
				
				vm.fields = fields;
				vm.originalFields = angular.copy(vm.fields);
			},
			function(err) {
				console.error(err);
			}
		);
		
    
    /*vm.fields = [
      {
        key: 'marvel1',
        type: 'select',
        templateOptions: {
          label: 'Normal Select',
          options: [
            {name: 'Iron Man', value: 'iron_man'},
            {name: 'Captain America', value: 'captain_america'},
            {name: 'Black Widow', value: 'black_widow'},
            {name: 'Hulk', value: 'hulk'},
            {name: 'Captain Marvel', value: 'captain_marvel'}
          ]
        }
      },
      {
        key: 'marvel2',
        type: 'select',
        templateOptions: {
          label: 'Grouped Select',
          options: [
            {name: 'Iron Man', value: 'iron_man', group: 'Male'},
            {name: 'Captain America', value: 'captain_america', group: 'Male'},
            {name: 'Black Widow', value: 'black_widow', group: 'Female'},
            {name: 'Hulk', value: 'hulk', group: 'Male'},
            {name: 'Captain Marvel', value: 'captain_marvel', group: 'Female'}
          ]
        }
      },
      {
        key: 'marvel3',
        type: 'select',
        templateOptions: {
          label: 'Select with custom name/value/group',
          options: [
            {label: 'Iron Man', id: 'iron_man', gender: 'Male'},
            {label: 'Captain America', id: 'captain_america', gender: 'Male'},
            {label: 'Black Widow', id: 'black_widow', gender: 'Female'},
            {label: 'Hulk', id: 'hulk', gender: 'Male'},
            {label: 'Captain Marvel', id: 'captain_marvel', gender: 'Female'}
          ],
          groupProp: 'gender',
          valueProp: 'id',
          labelProp: 'label'
        }
      },
      {
        key: 'marvel3',
        type: 'select',
        templateOptions: {
          label: 'Custom ng-options',
          options: [
            {label: 'Iron Man', id: 'iron_man', gender: 'Male'},
            {label: 'Captain America', id: 'captain_america', gender: 'Male'},
            {label: 'Black Widow', id: 'black_widow', gender: 'Female'},
            {label: 'Hulk', id: 'hulk', gender: 'Male'},
            {label: 'Captain Marvel', id: 'captain_marvel', gender: 'Female'}
          ],
          ngOptions: 'option as option.label group by option.gender for option in to.options'
        }
      }
    ];
    
    vm.originalFields = angular.copy(vm.fields);*/
    
    // function definition
    function onSubmit() {
      vm.options.updateInitialValue();
      alert(JSON.stringify(vm.model), null, 2);
    }
  });

})();