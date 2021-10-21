
var array=[[new Incident_Particle(14,14,14,14000),new Material(13,26.98,2.7,166e-6)],
[ new Incident_Particle(1,0,0,25),composite_material.water],
[new Incident_Particle(6,6,6,1200),composite_material.concrete],
[new Incident_Particle(2,0,2,10),composite_material.air],
[new Incident_Particle(26,26,30,330*56),new Material(82,207.2,11.29,823e-6)]];
for (i in array){
  console.log(stopping_power(array[i][0],array[i][1]));
}
var array_q2=[[new Incident_Particle(1,0,0,45),composite_material.water],
[new Incident_Particle(6.0000,6.000,6.0000,600.000),
  new Material(82,207.2,11.35,823.0e-6)],
[new Incident_Particle(18.00,18.000,22.000,500*40),composite_material.concrete],
[new Incident_Particle(1,0,0,20),composite_material.air],
[new Incident_Particle(10,10,10,4000),
  new Material(13,26.98,2.7,166e-6)],
]
for (i in array_q2){
  console.log(range(array_q2[i][0],array_q2[i][1],0.005));
}

var array_q3a=[[new Incident_Particle(8,8,8,9600),new Material(13,26.98,2.7,166e-6),1],
[new Incident_Particle(1,0,0,500),new Material(82,207.2,11.29,823e-6),0.8]
]
for (i in array_q3a){
  var inc_part= array_q3a[i][0]
  var mat=array_q3a[i][1]
  console.log(exit_energy(array_q3a[i][0],array_q3a[i][1],0.003,array_q3a[i][2]))
//  console.log(calculate_fraction(1.4e-13,array_q3a[i][0].z+array_q3a[i][0].n,[array_q3a[i][1].get_atomic_p()],[array_q3a[i][1].m_m],array_q3a[i][2]))
  console.log(calculate_fraction(1.4e-13,array_q3a[i][0].z+array_q3a[i][0].n,[array_q3a[i][1].get_atomic_p()],[array_q3a[i][1].m_m],array_q3a[i][2]))
  console.log(calculate_fraction(1.2e-13,array_q3a[i][0].z+array_q3a[i][0].n,[array_q3a[i][1].get_atomic_p()],[array_q3a[i][1].m_m],array_q3a[i][2]))
}

var array_q3b=[[new Incident_Particle(7,7,7,6020),composite_ns.concrete,2,composite_material.concrete],
[new Incident_Particle(2,0,2,1040),composite_ns.water,4,composite_material.water],
[new Incident_Particle(1,0,0,800),composite_ns.air,100000,composite_material.air]]
for (i in array_q3b){
  console.log(exit_energy(array_q3b[i][0],array_q3b[i][3],0.003,array_q3b[i][2]));
  console.log(calculate_fraction(1.4e-13,array_q3b[i][0].z+array_q3b[i][0].n,array_q3b[i][1][0],array_q3b[i][1][1],array_q3b[i][2]));
  console.log(calculate_fraction(1.2e-13,array_q3b[i][0].z+array_q3b[i][0].n,array_q3b[i][1][0],array_q3b[i][1][1],array_q3b[i][2]));
}

console.log(stopping_power(new Incident_Particle(1,0,0,150),composite_material.adipose)/composite_material.adipose.p);
console.log(stopping_power(new Incident_Particle(6,6,6,340*12),composite_material.adipose)/composite_material.adipose.p);
console.log(range(new Incident_Particle(1.000,0.0000,0.000,200.000),composite_material.adipose,0.03)*composite_material.adipose.p)
console.log(range(new Incident_Particle(8.0,8.0,8.0,16*160),composite_material.adipose,0.05)*composite_material.adipose.p)
console.log(exit_energy(new Incident_Particle(1,0,0,250),composite_material.adipose,0.03,10));
console.log(exit_energy(new Incident_Particle(14,14,14,600*28),composite_material.adipose,0.03,10));
console.log(calculate_fraction(1.2e-13,(new Incident_Particle(1,0,0,333)).z+(new Incident_Particle(1,0,0,333)).n,composite_ns.adipose[0],composite_ns.adipose[1],5))
console.log(calculate_fraction(1.2e-13,(new Incident_Particle(2,2,2,333*4)).z+(new Incident_Particle(2,2,2,333*4)).n,composite_ns.adipose[0],composite_ns.adipose[1],5))
