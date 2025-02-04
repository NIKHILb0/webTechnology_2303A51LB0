var app = angular.module('financeApp', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
    .when('/dashboard', {
        templateUrl: 'dashboard.html',
        controller: 'DashboardController'
    })
    .when('/expenses', {
        templateUrl: 'expenses.html',
        controller: 'ExpensesController'
    })
    .when('/income', {
        templateUrl: 'income.html',
        controller: 'IncomeController'
    })
    .otherwise({
        redirectTo: '/'
    });
});

// Dashboard Controller
app.controller('DashboardController', function($scope) {
    $scope.totalIncome = 0;
    $scope.totalExpenses = 0;

    $scope.$on('incomeAdded', function(event, income) {
        $scope.totalIncome += income.amount;
    });

    $scope.$on('expenseAdded', function(event, expense) {
        $scope.totalExpenses += expense.amount;
    });

    $scope.$on('expenseRemoved', function(event, expense) {
        $scope.totalExpenses -= expense.amount;
    });

    $scope.$on('incomeRemoved', function(event, income) {
        $scope.totalIncome -= income.amount;
    });
});

// Expenses Controller
app.controller('ExpensesController', function($scope, $rootScope) {
    $scope.expenses = [];
    $scope.expense = { description: '', amount: 0 };

    // Add expense
    $scope.addExpense = function() {
        if ($scope.expense.description && $scope.expense.amount) {
            var newExpense = { description: $scope.expense.description, amount: $scope.expense.amount };
            $scope.expenses.push(newExpense);
            $scope.expense = { description: '', amount: 0 };
            // Broadcast event to update Dashboard
            $rootScope.$broadcast('expenseAdded', newExpense);
        }
    };

    // Remove expense
    $scope.removeExpense = function(index) {
        var removedExpense = $scope.expenses.splice(index, 1)[0];
        $rootScope.$broadcast('expenseRemoved', removedExpense);
    };
});

// Income Controller
app.controller('IncomeController', function($scope, $rootScope) {
    $scope.incomeEntries = [];
    $scope.income = { description: '', amount: 0 };

    // Add income
    $scope.addIncome = function() {
        if ($scope.income.description && $scope.income.amount) {
            var newIncome = { description: $scope.income.description, amount: $scope.income.amount };
            $scope.incomeEntries.push(newIncome);
            $scope.income = { description: '', amount: 0 };
            // Broadcast event to update Dashboard
            $rootScope.$broadcast('incomeAdded', newIncome);
        }
    };

    // Remove income
    $scope.removeIncome = function(index) {
        var removedIncome = $scope.incomeEntries.splice(index, 1)[0];
        $rootScope.$broadcast('incomeRemoved', removedIncome);
    };
});
