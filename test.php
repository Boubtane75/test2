
<?php
$personnes = [
  'personne_1' =>[
  'nom'=> 'tanti',
  'prenom'=> 'julio',
  'age'=> '10'
],
  'personne_2' =>[
  'nom'=> 'lotus',
  'prenom'=> 'phil',
  'age'=> '18'
],
  'personne_3' =>[
  'nom'=> 'lala',
  'prenom'=> 'laura',
  'age'=> '25'
],
  'personne_4' =>[
  'nom'=> 'fat',
  'prenom'=> 'cali',
  'age'=> '40'
  ]
];

foreach ($personnes as $personne) {
  if ($personne['age']>=18) {
    echo $personne['nom'].' '.$personne['age']."\n";
  }
}
?>
